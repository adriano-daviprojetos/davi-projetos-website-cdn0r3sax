import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAuthStore from '@/stores/useAuthStore'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import logoUrl from '@/assets/logonovo-74529.png'

export default function Login() {
  const [pwd, setPwd] = useState('')
  const { login } = useAuthStore()
  const navigate = useNavigate()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (pwd === 'admin123') {
      // Mock password
      login()
      toast.success('Login realizado com sucesso!')
      navigate('/admin')
    } else {
      toast.error('Senha incorreta (Dica: use admin123)')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <Card className="w-full max-w-md shadow-elevation border-none">
        <CardHeader className="text-center space-y-4 pt-8">
          <div className="mx-auto flex items-center justify-center bg-black p-4 rounded-md">
            <img
              src={logoUrl}
              alt="DAVI Projetos de Rigging"
              className="h-12 w-auto object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-primary">Acesso Restrito</CardTitle>
            <CardDescription>Painel Administrativo DAVI Projetos</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="pb-8">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                placeholder="Insira sua senha de administrador"
                className="h-12"
              />
            </div>
            <Button
              type="submit"
              size="lg"
              className="w-full h-12 bg-primary hover:bg-primary/90 text-white"
            >
              Acessar Sistema
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
