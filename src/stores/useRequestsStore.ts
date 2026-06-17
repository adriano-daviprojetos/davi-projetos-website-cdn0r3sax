import { useState, useEffect, useCallback } from 'react'

export type RequestStatus = 'Pending' | 'Reviewed' | 'Finalizado'
export type RequestType = 'proposal' | 'service'

export interface RequestEntry {
  id: string
  type: RequestType
  name: string
  company?: string
  email: string
  phone: string
  location?: string
  description?: string
  services?: string[]
  status: RequestStatus
  createdAt: string
}

const mockInitial: RequestEntry[] = [
  {
    id: '1a2b3c',
    type: 'proposal',
    name: 'Carlos Silva',
    company: 'Construtora Alpha',
    email: 'carlos@alpha.com',
    phone: '11999999999',
    location: 'São Paulo, SP',
    description: 'Içamento de vigas de 50 toneladas.',
    status: 'Pending',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  },
]

export default function useRequestsStore() {
  const [requests, setRequests] = useState<RequestEntry[]>([])

  useEffect(() => {
    const data = localStorage.getItem('davi_requests')
    if (data) {
      setRequests(JSON.parse(data))
    } else {
      setRequests(mockInitial)
      localStorage.setItem('davi_requests', JSON.stringify(mockInitial))
    }
  }, [])

  const addRequest = useCallback(
    async (entry: Omit<RequestEntry, 'id' | 'status' | 'createdAt'>) => {
      await new Promise((resolve) => setTimeout(resolve, 800))
      const newEntry: RequestEntry = {
        ...entry,
        id: Math.random().toString(36).substring(2, 9),
        status: 'Pending',
        createdAt: new Date().toISOString(),
      }
      setRequests((prev) => {
        const updated = [newEntry, ...prev]
        localStorage.setItem('davi_requests', JSON.stringify(updated))
        return updated
      })
    },
    [],
  )

  const updateStatus = useCallback(async (id: string, status: RequestStatus) => {
    await new Promise((resolve) => setTimeout(resolve, 400))
    setRequests((prev) => {
      const updated = prev.map((r) => (r.id === id ? { ...r, status } : r))
      localStorage.setItem('davi_requests', JSON.stringify(updated))
      return updated
    })
  }, [])

  return { requests, addRequest, updateStatus }
}
