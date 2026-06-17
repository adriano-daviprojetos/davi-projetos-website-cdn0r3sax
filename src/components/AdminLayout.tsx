import { Navigate, Outlet } from 'react-router-dom'
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar'
import useAuthStore from '@/stores/useAuthStore'
import { LayoutDashboard, LogOut, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function AdminLayout() {
  const { isAuthenticated, logout } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
        <Sidebar>
          <SidebarHeader className="p-4 flex items-center gap-2 font-bold text-lg bg-primary text-white">
            <Shield size={20} />
            DAVI Admin
          </SidebarHeader>
          <SidebarContent className="p-2">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild className="mb-2">
                  <a href="/admin">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>Dashboard</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={logout}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair do Sistema</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarContent>
        </Sidebar>
        <main className="flex-1 p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </SidebarProvider>
  )
}
