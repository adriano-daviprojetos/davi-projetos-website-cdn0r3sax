import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/auth-context'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card'
import { Label } from '@/components/ui/label'

export default function LoginPage() {
  const { isAuthenticated, login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login()
      navigate('/admin')
    }, 800)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1/2 bg-primary z-0 rounded-b-[100px] shadow-xl"></div>
      <Card className="w-full max-w-md shadow-elevation border-none z-10 animate-fade-in-up">
        <CardHeader className="space-y-2 text-center pb-8 pt-8">
          <div className="flex justify-center mb-6">
            <div className="text-4xl font-bold tracking-tighter">
              <span className="text-primary font-black">DAVI</span>{' '}
              <span className="text-secondary">Admin</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-primary font-bold">Acesso Restrito</CardTitle>
          <CardDescription className="text-base">
            Faça login para gerenciar as solicitações de propostas e serviços do site.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-semibold text-slate-700">
                Email Corporativo
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@daviprojetos.com.br"
                required
                defaultValue="admin@daviprojetos.com.br"
                className="h-12 bg-slate-50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-semibold text-slate-700">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                required
                defaultValue="password"
                className="h-12 bg-slate-50"
              />
            </div>
          </CardContent>
          <CardFooter className="pt-6 pb-8">
            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg font-semibold shadow-md"
              disabled={loading}
            >
              {loading ? 'Autenticando...' : 'Entrar no Painel'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
