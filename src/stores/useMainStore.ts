import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type RequestStatus = 'Novo' | 'Em Análise' | 'Finalizado'
export type RequestType = 'Proposta' | 'Serviço'

export interface ServiceRequest {
  id: string
  type: RequestType
  name: string
  company?: string
  email: string
  phone: string
  location?: string
  description: string
  services?: string[]
  status: RequestStatus
  createdAt: string
}

interface MainStore {
  isAuthenticated: boolean
  requests: ServiceRequest[]
  login: () => void
  logout: () => void
  addRequest: (req: Omit<ServiceRequest, 'id' | 'status' | 'createdAt'>) => void
  updateRequestStatus: (id: string, status: RequestStatus) => void
}

const mockRequests: ServiceRequest[] = [
  {
    id: 'req-1',
    type: 'Proposta',
    name: 'Carlos Mendes',
    company: 'Construtora Horizonte',
    email: 'carlos@horizonte.com.br',
    phone: '(11) 98888-7777',
    location: 'São Paulo, SP',
    description:
      'Necessitamos de plano de rigging para içamento de vigas pré-moldadas em obra rodoviária. Içamento duplo com guindastes de 200t.',
    status: 'Novo',
    createdAt: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: 'req-2',
    type: 'Serviço',
    name: 'Ana Paula Souza',
    company: 'Logística Total S.A.',
    email: 'ana.souza@logtotal.com.br',
    phone: '(21) 97777-6666',
    services: ['Laudo de Inspeção de Equipamentos', 'Visita Técnica'],
    description:
      'Solicito agendamento para inspeção anual de nossos guindastes móveis e cintas de elevação (aprox. 50 itens).',
    status: 'Em Análise',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: 'req-3',
    type: 'Proposta',
    name: 'Roberto Dias',
    company: 'Indústria Metalúrgica Brasil',
    email: 'roberto@indbrasil.com',
    phone: '(31) 96666-5555',
    location: 'Belo Horizonte, MG',
    description: 'Substituição de moinho industrial. Espaço confinado e restrições de patolamento.',
    status: 'Finalizado',
    createdAt: new Date(Date.now() - 604800000).toISOString(),
  },
]

const useMainStore = create<MainStore>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      requests: mockRequests,
      login: () => set({ isAuthenticated: true }),
      logout: () => set({ isAuthenticated: false }),
      addRequest: (req) =>
        set((state) => ({
          requests: [
            {
              ...req,
              id: `req-${Math.random().toString(36).substring(2, 9)}`,
              status: 'Novo',
              createdAt: new Date().toISOString(),
            },
            ...state.requests,
          ],
        })),
      updateRequestStatus: (id, status) =>
        set((state) => ({
          requests: state.requests.map((r) => (r.id === id ? { ...r, status } : r)),
        })),
    }),
    {
      name: 'davi-projetos-storage',
    },
  ),
)

export default useMainStore
