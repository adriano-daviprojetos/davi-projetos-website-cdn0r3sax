import { useEffect, useState } from 'react'
import { db, AppRequest, RequestStatus } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { FileText, Briefcase, Activity, CheckCircle, Search } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default function AdminPage() {
  const [requests, setRequests] = useState<AppRequest[]>([])
  const [selectedReq, setSelectedReq] = useState<AppRequest | null>(null)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const loadData = () => setRequests(db.getRequests())

  useEffect(() => {
    loadData()
  }, [])

  const handleStatusChange = (id: string, newStatus: RequestStatus) => {
    db.updateRequestStatus(id, newStatus)
    loadData()
    if (selectedReq?.id === id) {
      setSelectedReq((prev) => (prev ? { ...prev, status: newStatus } : null))
    }
  }

  const stats = {
    total: requests.length,
    proposals: requests.filter((r) => r.type === 'proposta').length,
    pending: requests.filter((r) => r.status === 'Novo' || r.status === 'Em Análise').length,
    completed: requests.filter((r) => r.status === 'Finalizado').length,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Novo':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'Em Análise':
        return 'bg-amber-100 text-amber-800 border-amber-200'
      case 'Finalizado':
        return 'bg-green-100 text-green-800 border-green-200'
      default:
        return 'bg-slate-100 text-slate-800 border-slate-200'
    }
  }

  const filteredRequests = requests
    .filter((r) => (filter === 'all' ? true : r.type === filter))
    .filter((r) =>
      searchTerm === ''
        ? true
        : r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (r.company && r.company.toLowerCase().includes(searchTerm.toLowerCase())),
    )
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  return (
    <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold text-primary tracking-tight">
          Dashboard de Leads Comerciais
        </h1>
        <p className="text-muted-foreground mt-2 text-lg">
          Visão geral e gerenciamento das solicitações de propostas e serviços técnicos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border-none shadow-elevation bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Total de Solicitações
            </CardTitle>
            <Activity className="h-5 w-5 text-slate-400" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">{stats.total}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-elevation bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Propostas
            </CardTitle>
            <FileText className="h-5 w-5 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">{stats.proposals}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-elevation bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Abertos / Análise
            </CardTitle>
            <Briefcase className="h-5 w-5 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">{stats.pending}</div>
          </CardContent>
        </Card>
        <Card className="border-none shadow-elevation bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">
              Finalizados
            </CardTitle>
            <CheckCircle className="h-5 w-5 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-black text-primary">{stats.completed}</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-none shadow-elevation bg-white overflow-hidden">
        <CardHeader className="border-b border-slate-100 bg-slate-50/50 pb-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="text-xl text-primary font-bold">
              Listagem de Solicitações
            </CardTitle>
            <div className="flex items-center gap-3">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nome ou empresa..."
                  className="pl-9 h-10 bg-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger className="w-[180px] h-10 bg-white">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="proposta">Apenas Propostas</SelectItem>
                  <SelectItem value="servico">Apenas Serviços</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="font-semibold text-slate-600">Data e Hora</TableHead>
                <TableHead className="font-semibold text-slate-600">Tipo</TableHead>
                <TableHead className="font-semibold text-slate-600">Cliente / Empresa</TableHead>
                <TableHead className="font-semibold text-slate-600">Status</TableHead>
                <TableHead className="text-right font-semibold text-slate-600">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.map((req) => (
                <TableRow
                  key={req.id}
                  className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                  onClick={() => setSelectedReq(req)}
                >
                  <TableCell className="text-slate-600 font-medium">
                    {format(new Date(req.createdAt), 'dd/MM/yyyy • HH:mm', { locale: ptBR })}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={`font-semibold tracking-wide ${req.type === 'proposta' ? 'bg-primary/10 text-primary border-primary/20' : 'bg-secondary/10 text-secondary border-secondary/20'}`}
                    >
                      {req.type === 'proposta' ? 'PROPOSTA' : 'SERVIÇO'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-primary">{req.name}</div>
                    <div className="text-sm text-slate-500">{req.company || req.email}</div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(req.status)}`}
                    >
                      {req.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="font-semibold text-primary hover:bg-primary/10"
                      onClick={(e) => {
                        e.stopPropagation()
                        setSelectedReq(req)
                      }}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
              {filteredRequests.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-12 text-slate-500 text-lg">
                    Nenhuma solicitação encontrada com os filtros atuais.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={!!selectedReq} onOpenChange={(open) => !open && setSelectedReq(null)}>
        <DialogContent className="max-w-3xl p-0 overflow-hidden border-none shadow-2xl">
          <DialogHeader className="bg-primary p-6 text-white">
            <div className="flex items-center justify-between">
              <DialogTitle className="text-2xl font-bold flex items-center gap-3">
                {selectedReq?.type === 'proposta' ? <FileText /> : <Briefcase />}
                Detalhes da{' '}
                {selectedReq?.type === 'proposta' ? 'Proposta Comercial' : 'Solicitação de Serviço'}
              </DialogTitle>
              {selectedReq && (
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border uppercase tracking-wider ${getStatusColor(selectedReq.status)}`}
                >
                  {selectedReq.status}
                </span>
              )}
            </div>
          </DialogHeader>
          {selectedReq && (
            <div className="p-8">
              <div className="grid grid-cols-2 gap-y-6 gap-x-12">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Nome do Solicitante
                  </span>
                  <div className="text-lg font-medium text-primary">{selectedReq.name}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Empresa
                  </span>
                  <div className="text-lg font-medium text-primary">
                    {selectedReq.company || '-'}
                  </div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Email de Contato
                  </span>
                  <div className="text-lg font-medium text-primary">{selectedReq.email}</div>
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                    Telefone
                  </span>
                  <div className="text-lg font-medium text-primary">{selectedReq.phone}</div>
                </div>
                {selectedReq.location && (
                  <div className="col-span-2 space-y-1">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block">
                      Local da Obra
                    </span>
                    <div className="text-lg font-medium text-primary">{selectedReq.location}</div>
                  </div>
                )}

                {selectedReq.services && selectedReq.services.length > 0 && (
                  <div className="col-span-2 space-y-2 mt-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                      Serviços Solicitados
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {selectedReq.services.map((s) => (
                        <Badge
                          key={s}
                          variant="secondary"
                          className="bg-slate-100 text-slate-700 hover:bg-slate-200 px-3 py-1 text-sm font-medium border-slate-200"
                        >
                          {s}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="col-span-2 mt-4">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">
                    Descrição / Detalhes do Projeto
                  </span>
                  <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 text-slate-700 leading-relaxed whitespace-pre-wrap text-[15px]">
                    {selectedReq.description}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 mt-10 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="font-bold text-slate-700">Atualizar Status do Lead:</span>
                <Select
                  value={selectedReq.status}
                  onValueChange={(val) => handleStatusChange(selectedReq.id, val as RequestStatus)}
                >
                  <SelectTrigger className="w-[200px] h-11 bg-white font-semibold">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Novo" className="font-medium">
                      Novo Lead
                    </SelectItem>
                    <SelectItem value="Em Análise" className="font-medium">
                      Em Análise Técnica
                    </SelectItem>
                    <SelectItem value="Finalizado" className="font-medium">
                      Finalizado / Resolvido
                    </SelectItem>
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
