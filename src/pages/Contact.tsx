import React, { useState, useRef, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { UploadCloud, X, File as FileIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { servicesList } from '@/data/services'
import pb from '@/lib/pocketbase/client'
import { getErrorMessage } from '@/lib/pocketbase/errors'

const proposalSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  company: z.string().min(2, 'Empresa é obrigatória'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  location: z.string().min(2, 'Local da obra é obrigatório'),
  description: z.string().min(10, 'Descreva a necessidade com mais detalhes'),
})

const servicesSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  company: z.string().min(2, 'Empresa é obrigatória'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  services: z.array(z.string()).min(1, 'Selecione pelo menos um serviço'),
  description: z.string().optional(),
  files: z
    .array(z.instanceof(File))
    .optional()
    .superRefine((files, ctx) => {
      if (files) {
        files.forEach((file) => {
          if (file.size > 20 * 1024 * 1024) {
            ctx.addIssue({
              code: z.ZodIssueCode.custom,
              message: `O arquivo ${file.name} excede o limite de 20MB`,
            })
          }
        })
      }
    }),
})

function ProposalForm() {
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: { name: '', company: '', email: '', phone: '', location: '', description: '' },
  })

  const onSubmit = async (data: z.infer<typeof proposalSchema>) => {
    try {
      const formData = new FormData()
      formData.append('request_type', 'proposta')
      formData.append('status', 'Pending')
      formData.append('name', data.name)
      formData.append('company', data.company)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('location', data.location)
      formData.append('description', data.description)

      await pb.collection('service_requests').create(formData)
      toast.success('Proposta solicitada com sucesso! Entraremos em contato em breve.')
      form.reset()
    } catch (e) {
      toast.error(getErrorMessage(e))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-6 bg-white p-6 md:p-8 rounded-xl shadow-subtle border"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="João da Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Construtora Exemplo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Corporativo</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="joao@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone / WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Local da Obra (Cidade/Estado)</FormLabel>
              <FormControl>
                <Input placeholder="São Paulo - SP" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do Projeto</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Detalhe os equipamentos e as cargas a serem içadas..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full bg-secondary hover:bg-secondary/90 text-white"
        >
          {form.formState.isSubmitting ? 'Enviando...' : 'Enviar Solicitação de Proposta'}
        </Button>
      </form>
    </Form>
  )
}

function FileUploader({
  value,
  onChange,
}: {
  value: File[] | undefined
  onChange: (files: File[] | undefined) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        const newFiles = Array.from(e.dataTransfer.files)
        onChange([...(value || []), ...newFiles])
      }
    },
    [value, onChange],
  )

  const handleRemoveFile = (indexToRemove: number) => {
    if (value) {
      const newFiles = value.filter((_, idx) => idx !== indexToRemove)
      onChange(newFiles.length > 0 ? newFiles : undefined)
    }
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={cn(
          'mt-2 flex flex-col items-center justify-center rounded-lg border-2 border-dashed p-6 cursor-pointer transition-colors',
          isDragging
            ? 'border-primary bg-primary/5'
            : 'border-muted-foreground/25 hover:bg-slate-50',
        )}
      >
        <UploadCloud
          className={cn('h-10 w-10 mb-2', isDragging ? 'text-primary' : 'text-muted-foreground')}
        />
        <p className="text-sm font-medium text-center">
          {isDragging ? 'Solte os arquivos aqui' : 'Clique ou arraste arquivos para cá'}
        </p>
        <p className="text-xs text-muted-foreground mt-1 text-center">Suporta múltiplos arquivos</p>
        <input
          type="file"
          multiple
          className="hidden"
          ref={inputRef}
          onChange={(e) => {
            if (e.target.files && e.target.files.length > 0) {
              onChange([...(value || []), ...Array.from(e.target.files)])
            }
            if (inputRef.current) inputRef.current.value = ''
          }}
        />
      </div>
      {value && value.length > 0 && (
        <div className="mt-4 space-y-2">
          {value.map((f: File, idx: number) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-50 border rounded-md"
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <FileIcon className="h-5 w-5 text-muted-foreground flex-shrink-0" />
                <div className="truncate">
                  <p className="text-sm font-medium truncate">{f.name}</p>
                  <p
                    className={cn(
                      'text-xs',
                      f.size > 20 * 1024 * 1024 ? 'text-destructive' : 'text-muted-foreground',
                    )}
                  >
                    {formatFileSize(f.size)} {f.size > 20 * 1024 * 1024 && '- Excede 20MB'}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-muted-foreground hover:text-destructive shrink-0"
                onClick={(e) => {
                  e.stopPropagation()
                  handleRemoveFile(idx)
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function ServicesForm() {
  const form = useForm<z.infer<typeof servicesSchema>>({
    resolver: zodResolver(servicesSchema),
    defaultValues: {
      name: '',
      company: '',
      email: '',
      phone: '',
      services: [],
      description: '',
      files: [],
    },
  })

  const onSubmit = async (data: z.infer<typeof servicesSchema>) => {
    try {
      const formData = new FormData()
      formData.append('request_type', 'atendimento')
      formData.append('status', 'Pending')
      formData.append('name', data.name)
      formData.append('company', data.company)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('services', JSON.stringify(data.services))

      if (data.description) {
        formData.append('description', data.description)
      }

      if (data.files && data.files.length > 0) {
        for (const file of data.files) {
          formData.append('files', file)
        }
      }

      await pb.collection('service_requests').create(formData)
      toast.success('Serviços solicitados com sucesso! Analisaremos sua requisição.')
      form.reset()
    } catch (e) {
      toast.error(getErrorMessage(e))
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 mt-6 bg-white p-6 md:p-8 rounded-xl shadow-subtle border"
      >
        <div className="grid md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="João da Silva" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Empresa</FormLabel>
                <FormControl>
                  <Input placeholder="Construtora Exemplo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email Corporativo</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="joao@empresa.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone / WhatsApp</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="services"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Serviços de Interesse</FormLabel>
                <FormDescription>Selecione um ou mais serviços que você precisa.</FormDescription>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                {servicesList.map((item: any) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm bg-slate-50"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item.title)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.title])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== item.title),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-medium cursor-pointer text-sm">
                            {item.title}
                          </FormLabel>
                        </FormItem>
                      )
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações Adicionais (Opcional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Alguma especificidade técnica?" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="files"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Upload de Arquivos (Opcional)</FormLabel>
              <FormDescription>
                Selecione um ou mais arquivos. (Máx: 20MB por arquivo)
              </FormDescription>
              <FormControl>
                <FileUploader value={value} onChange={onChange} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="w-full bg-primary hover:bg-primary/90 text-white"
        >
          {form.formState.isSubmitting ? 'Enviando...' : 'Solicitar Atendimento Técnico'}
        </Button>
      </form>
    </Form>
  )
}

export default function Contact() {
  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl animate-fade-in">
      <h1 className="text-4xl font-bold mb-4 text-center">Contato & Orçamentos</h1>
      <p className="text-muted-foreground text-center mb-8">
        Escolha uma das opções abaixo para entrar em contato com nossa equipe técnica.
      </p>

      <div className="flex justify-center mb-12">
        <a
          href="https://wa.me/5511966162222"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#25D366] hover:bg-[#128C7E] text-white px-6 py-3 rounded-full font-medium transition-all duration-200 shadow-md hover:shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
          </svg>
          <span>Fale conosco pelo WhatsApp (+55 11 96616-2222)</span>
        </a>
      </div>

      <Tabs defaultValue="proposal" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="proposal">Solicitar Proposta</TabsTrigger>
          <TabsTrigger value="services">Solicitar Atendimento</TabsTrigger>
        </TabsList>
        <TabsContent value="proposal">
          <ProposalForm />
        </TabsContent>
        <TabsContent value="services">
          <ServicesForm />
        </TabsContent>
      </Tabs>
    </div>
  )
}
