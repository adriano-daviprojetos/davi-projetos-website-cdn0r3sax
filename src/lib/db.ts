export type RequestStatus = 'Novo' | 'Em Análise' | 'Finalizado'

export interface AppRequest {
  id: string
  type: 'proposta' | 'servico'
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

const STORAGE_KEY = 'davi_projetos_requests'

export const db = {
  getRequests: (): AppRequest[] => {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) {
      const mock: AppRequest[] = [
        {
          id: '1',
          type: 'proposta',
          name: 'João Silva',
          company: 'Construtora Alfa',
          email: 'joao@alfa.com.br',
          phone: '11999999999',
          location: 'São Paulo, SP',
          description: 'Içamento de vigas pré-moldadas para viaduto.',
          status: 'Novo',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: '2',
          type: 'servico',
          name: 'Maria Souza',
          email: 'maria@engenharia.com',
          phone: '21988888888',
          description: 'Necessitamos de vistoria nos equipamentos da obra.',
          services: ['Laudo de Inspeção de Equipamentos', 'Visita Técnica'],
          status: 'Em Análise',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
        },
      ]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mock))
      return mock
    }
    return JSON.parse(data)
  },
  saveRequest: (req: Omit<AppRequest, 'id' | 'createdAt' | 'status'>) => {
    const requests = db.getRequests()
    const newReq: AppRequest = {
      ...req,
      id: Math.random().toString(36).substring(2, 9),
      status: 'Novo',
      createdAt: new Date().toISOString(),
    }
    requests.push(newReq)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    return newReq
  },
  updateRequestStatus: (id: string, status: RequestStatus) => {
    const requests = db.getRequests()
    const index = requests.findIndex((r) => r.id === id)
    if (index > -1) {
      requests[index].status = status
      localStorage.setItem(STORAGE_KEY, JSON.stringify(requests))
    }
  },
}
