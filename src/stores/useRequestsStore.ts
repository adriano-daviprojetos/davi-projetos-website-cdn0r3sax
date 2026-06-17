import { useState, useEffect, useCallback } from 'react'
import pb from '@/lib/pocketbase/client'
import { useRealtime } from '@/hooks/use-realtime'

export type RequestStatus = 'Pending' | 'Reviewed' | 'Finalizado'
export type RequestType = 'proposta' | 'atendimento'

export interface RequestEntry {
  id: string
  request_type: RequestType
  name: string
  company: string
  email: string
  phone: string
  location?: string
  description?: string
  services?: string[]
  status: RequestStatus
  created: string
  files?: string[]
}

export default function useRequestsStore() {
  const [requests, setRequests] = useState<RequestEntry[]>([])

  const loadData = useCallback(async () => {
    if (!pb.authStore.isValid) return
    try {
      const records = await pb.collection('service_requests').getFullList<RequestEntry>({
        sort: '-created',
      })
      setRequests(records)
    } catch (e) {
      console.error('Error fetching requests', e)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  useRealtime(
    'service_requests',
    () => {
      loadData()
    },
    pb.authStore.isValid,
  )

  const updateStatus = useCallback(async (id: string, status: RequestStatus) => {
    try {
      await pb.collection('service_requests').update(id, { status })
      // Optimitistic update
      setRequests((prev) => prev.map((r) => (r.id === id ? { ...r, status } : r)))
    } catch (e) {
      console.error('Error updating status', e)
    }
  }, [])

  return { requests, updateStatus }
}
