import { useState, useMemo } from 'react'
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
import { FileText, Clock, CheckCircle2, ListFilter } from 'lucide-react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

const getStatusColor = (status: string) => {
  if (status === 'Pending') return 'bg-blue-500 hover:bg-blue-600'
  if (status === 'Reviewed') return 'bg-yellow-500 hover:bg-yellow-600'
  return 'bg-green-500 hover:bg-green-600'
}

const getTypeLabel = (type: string) => {
  return type === 'proposta' ? 'Proposta' : 'Atendimento'
}

export default function Dashboard() {
  const { requests, updateStatus } = useRequestsStore()
  const [selectedRequest, setSelectedRequest] = useState<RequestEntry | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredRequests = useMemo(() => {
    if (filter === 'all') return requests
    return requests.filter((r) => r.status === filter)
  }, [requests, filter])

  const total = requests.length
  const pending = requests.filter((r) => r.status === 'Pending').length
  const inProgress = requests.filter((r) => r.status === 'Reviewed').length

  return (
    <div className="space-y-6">
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
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Últimas Entradas</CardTitle>
          <div className="flex items-center gap-2">
            <ListFilter className="w-4 h-4 text-slate-500" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="Pending">Pendentes</SelectItem>
                <SelectItem value="Reviewed">Em Análise</SelectItem>
                <SelectItem value="Finalizado">Finalizados</SelectItem>
              </SelectContent>
            </Select>
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
                {filteredRequests.length === 0 ? (
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg">
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
                  {selectedRequest.email}
                </div>
                <div>
                  <span className="block text-xs font-semibold text-slate-500 uppercase mb-1">
                    Telefone
                  </span>
                  {selectedRequest.phone}
                </div>
                {selectedRequest.location && (
                  <div className="col-span-2">
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
                    {selectedRequest.files.map((file) => (
                      <a
                        key={file}
                        href={`${import.meta.env.VITE_POCKETBASE_URL}/api/files/service_requests/${selectedRequest.id}/${file}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-500 hover:underline flex items-center gap-1"
                      >
                        <FileText className="w-4 h-4" />
                        {file}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 flex items-center justify-between border-t border-slate-100">
                <span className="text-sm font-semibold text-slate-600">Alterar Status:</span>
                <Select
                  value={selectedRequest.status}
                  onValueChange={async (val: any) => {
                    await updateStatus(selectedRequest.id, val)
                    setSelectedRequest({ ...selectedRequest, status: val })
                  }}
                >
                  <SelectTrigger className="w-[180px]">
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
