/**
 * Private routes that need authentication
 */
export const privateRoutes = ['/cart', '/checkout']

/**
 * Routes that user uses to get authenticates so authenticated users cannot acess
 */
export const authRoutes = ['/login', '/register']


/**
 *  default ridect
 */
export const DEFAULT_REDIECT = '/'

/**
 * default rediect for protected routes
 */
export const DEFAULT_PROTECT_REDIRECT = '/login'