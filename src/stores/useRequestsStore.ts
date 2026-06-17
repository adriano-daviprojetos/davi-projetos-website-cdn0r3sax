import { useState, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'

export interface RequestEntry {
  id: string
  name: string
  company: string
  email: string
  phone: string
  request_type: 'atendimento' | 'proposta'
  location?: string
  description?: string
  services?: string[]
  status: 'Pending' | 'Reviewed' | 'Finalizado'
  files?: string[]
  created: string
  updated: string
}

export default function useRequestsStore() {
  const [requests, setRequests] = useState<RequestEntry[]>([])
  const [loading, setLoading] = useState(false)

  const fetchRequests = useCallback(async () => {
    setLoading(true)
    try {
      const records = await pb.collection('service_requests').getFullList<RequestEntry>({
        sort: '-created',
      })
      setRequests(records)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  const updateStatus = async (id: string, status: string) => {
    try {
      await pb.collection('service_requests').update(id, { status })
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status: status as any } : r)))
    } catch (e) {
      console.error(e)
    }
  }

  return { requests, loading, fetchRequests, updateStatus }
}
