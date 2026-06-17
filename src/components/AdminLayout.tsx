import { Navigate, Outlet, Link } from 'react-router-dom'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'

export function AdminLayout() {
  const { isAuthenticated, loading, signOut } = useAuth()

  if (loading) {
    return <div className="flex h-screen items-center justify-center">Carregando...</div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b px-6 py-4 flex items-center justify-between">
        <Link to="/admin/dashboard" className="font-bold text-lg text-primary">
          Davi Projetos Admin
        </Link>
        <div className="flex items-center gap-4">
          <Link to="/" className="text-sm text-slate-500 hover:text-slate-900">
            Ver Site
          </Link>
          <Button variant="outline" size="sm" onClick={signOut}>
            Sair
          </Button>
        </div>
      </header>
      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto w-full">
        <Outlet />
      </main>
    </div>
  )
}
