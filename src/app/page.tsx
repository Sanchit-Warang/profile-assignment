import FetchProductsList from '@/components/Products/FetchProductsList'

export default function ProductPage() {
  return (
    <main className="space-y-4">
      <h1 className="transition-all text-3xl font-semibold">Products Page</h1>
      <FetchProductsList />
    </main>
  )
}
