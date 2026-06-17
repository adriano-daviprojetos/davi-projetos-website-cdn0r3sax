import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useRequestsStore, { RequestEntry } from '@/stores/useRequestsStore'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Clock, CheckCircle2, ListFilter, Search, Download } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useRealtime } from '@/hooks/use-realtime'
import { Button } from '@/components/ui/button'

const getStatusColor = (status: string) => {
  if (status === 'Pending') return 'bg-blue-500 hover:bg-blue-600'
  if (status === 'Reviewed') return 'bg-yellow-500 hover:bg-yellow-600'
  return 'bg-green-500 hover:bg-green-600'
}

const getTypeLabel = (type: string) => {
  return type === 'proposta' ? 'Proposta' : 'Atendimento'
}

export default function Dashboard() {
  const { requests, loading, fetchRequests, updateStatus } = useRequestsStore()
  const [selectedRequest, setSelectedRequest] = useState<RequestEntry | null>(null)

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')

  useEffect(() => {
    fetchRequests()
  }, [fetchRequests])

  useRealtime('service_requests', () => {
    fetchRequests()
  })

  const filteredRequests = useMemo(() => {
    return requests.filter((r) => {
      const matchSearch =
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.email.toLowerCase().includes(search.toLowerCase())
      const matchStatus = statusFilter === 'all' || r.status === statusFilter
      const matchType = typeFilter === 'all' || r.request_type === typeFilter
      return matchSearch && matchStatus && matchType
    })
  }, [requests, search, statusFilter, typeFilter])

  const total = requests.length
  const pending = requests.filter((r) => r.status === 'Pending').length
  const inProgress = requests.filter((r) => r.status === 'Reviewed').length

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary tracking-tight">Painel de Solicitações</h1>
          <p className="text-slate-500">Gerencie orçamentos e requisições de serviço do site.</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Total de Solicitações
            </CardTitle>
            <FileText className="h-4 w-4 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{total}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Pendentes (Pending)
            </CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pending}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-600">
              Em Análise (Reviewed)
            </CardTitle>
            <CheckCircle2 className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{inProgress}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-sm">
        <CardHeader className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <CardTitle>Últimas Entradas</CardTitle>
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-500" />
              <Input
                placeholder="Buscar por nome ou email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8"
              />
            </div>

            <Tabs value={typeFilter} onValueChange={setTypeFilter} className="w-full md:w-auto">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="atendimento">Atendimento</TabsTrigger>
                <TabsTrigger value="proposta">Proposta</TabsTrigger>
              </TabsList>
            </Tabs>

            <div className="flex items-center gap-2 w-full md:w-auto">
              <ListFilter className="w-4 h-4 text-slate-500" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Status</SelectItem>
                  <SelectItem value="Pending">Pendentes</SelectItem>
                  <SelectItem value="Reviewed">Em Análise</SelectItem>
                  <SelectItem value="Finalizado">Finalizados</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader className="bg-slate-50">
                <TableRow>
                  <TableHead>Data</TableHead>
                  <TableHead>Cliente / Empresa</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading && requests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      Carregando...
                    </TableCell>
                  </TableRow>
                ) : filteredRequests.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-slate-500">
                      Nenhuma solicitação encontrada.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredRequests.map((req) => (
                    <TableRow
                      key={req.id}
                      className="cursor-pointer hover:bg-slate-50 transition-colors"
                      onClick={() => setSelectedRequest(req)}
                    >
                      <TableCell className="font-medium text-slate-600">
                        {format(new Date(req.created), 'dd/MM/yyyy HH:mm', { locale: ptBR })}
                      </TableCell>
                      <TableCell>
                        <div className="font-semibold text-primary">{req.name}</div>
                        {req.company && <div className="text-xs text-slate-500">{req.company}</div>}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getTypeLabel(req.request_type)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(req.status)} text-white border-none`}>
                          {req.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                        <Select
                          value={req.status}
                          onValueChange={async (val: any) => {
                            await updateStatus(req.id, val)
                            if (selectedRequest?.id === req.id) {
                              setSelectedRequest({ ...req, status: val })
                            }
                          }}
                        >
                          <SelectTrigger className="w-[140px] ml-auto h-8 text-xs">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">Pendente</SelectItem>
                            <SelectItem value="Reviewed">Em Análise</SelectItem>
                            <SelectItem value="Finalizado">Finalizado</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={!!selectedRequest} onOpenChange={(o) => !o && setSelectedRequest(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl text-primary flex items-center gap-2">
              Detalhes da Solicitação
              <Badge className={selectedRequest ? getStatusColor(selectedRequest.status) : ''}>
                {selectedRequest?.status}
              </Badge>
            </DialogTitle>
            <DialogDescription>
              ID: {selectedRequest?.id} • Criado em{' '}
              {selectedRequest &&
                format(new Date(selectedRequest.created), "dd/MM/yyyy 'às' HH:mm")}
            </DialogDescription>
          </DialogHeader>
          {selectedRequest && (
            <div className="space-y-6 mt-4 text-slate-700">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Nome
                  </span>
                  {selectedRequest.name}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Empresa
                  </span>
                  {selectedRequest.company || '-'}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${selectedRequest.email}`}
                    className="text-blue-500 hover:underline"
                  >
                    {selectedRequest.email}
                  </a>
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Telefone
                  </span>
                  {selectedRequest.phone}
                </div>
                {selectedRequest.location && (
                  <div className="col-span-1 sm:col-span-2">
                    <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                      Local da Obra
                    </span>
                    {selectedRequest.location}
                  </div>
                )}
              </div>

              {selectedRequest.services && selectedRequest.services.length > 0 && (
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                    Serviços Solicitados
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedRequest.services.map((s) => (
                      <Badge key={s} variant="secondary">
                        {s}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {selectedRequest.description && (
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                    Descrição / Detalhes
                  </span>
                  <div className="bg-white border rounded-md p-3 text-sm whitespace-pre-wrap">
                    {selectedRequest.description}
                  </div>
                </div>
              )}

              {selectedRequest.files && selectedRequest.files.length > 0 && (
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-2">
                    Arquivos Anexos
                  </span>
                  <div className="flex flex-col gap-2">
                    {selectedRequest.files.map((file) => {
                      const fileUrl = `${import.meta.env.VITE_POCKETBASE_URL}/api/files/service_requests/${selectedRequest.id}/${file}?download=1`
                      return (
                        <div
                          key={file}
                          className="flex items-center justify-between bg-white border p-2 rounded-md"
                        >
                          <div className="flex items-center gap-2 overflow-hidden">
                            <FileText className="w-4 h-4 text-blue-500 shrink-0" />
                            <span className="text-sm truncate" title={file}>
                              {file}
                            </span>
                          </div>
                          <Button variant="outline" size="sm" asChild className="shrink-0 ml-4">
                            <a href={fileUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-3 h-3 mr-2" /> Download
                            </a>
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="pt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between border-t border-slate-100 gap-3">
                <span className="text-sm font-semibold text-slate-600">
                  Alterar Status da Solicitação:
                </span>
                <Select
                  value={selectedRequest.status}
                  onValueChange={async (val: any) => {
                    await updateStatus(selectedRequest.id, val)
                    setSelectedRequest({ ...selectedRequest, status: val })
                  }}
                >
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pending">Pendente</SelectItem>
                    <SelectItem value="Reviewed">Em Análise</SelectItem>
                    <SelectItem value="Finalizado">Finalizado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
