import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifySession } from './lib/auth/session'
import { authRoutes, privateRoutes, DEFAULT_REDIECT, DEFAULT_PROTECT_REDIRECT } from './routes'

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const method = request.method  
  if (method !== 'GET') return

  const path = request.nextUrl.pathname
  const user = await verifySession()

  const isPrivateRoute = privateRoutes.includes(path)
  const isAuthRoute = authRoutes.includes(path)

  if (isAuthRoute) {
    if (user) {
      return NextResponse.redirect(new URL(DEFAULT_REDIECT, request.url))
    }
    return
  }
  
  if (isPrivateRoute) {
    if (!user) {
      return NextResponse.redirect(new URL(DEFAULT_PROTECT_REDIRECT, request.url))
    }
    return
  }

  return
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}

