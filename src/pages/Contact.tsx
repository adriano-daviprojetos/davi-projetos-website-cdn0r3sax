import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
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
import useRequestsStore from '@/stores/useRequestsStore'
import { toast } from 'sonner'
import { servicesList } from '@/data/services'

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
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  services: z.array(z.string()).min(1, 'Selecione pelo menos um serviço'),
  description: z.string().optional(),
})

function ProposalForm() {
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: { name: '', company: '', email: '', phone: '', location: '', description: '' },
  })
  const { addRequest } = useRequestsStore()

  const onSubmit = async (data: z.infer<typeof proposalSchema>) => {
    try {
      await addRequest({ type: 'proposal', ...data })
      toast.success('Proposta solicitada com sucesso! Entraremos em contato em breve.')
      form.reset()
    } catch (e) {
      toast.error('Erro ao salvar no banco de dados. Tente novamente.')
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

function ServicesForm() {
  const form = useForm<z.infer<typeof servicesSchema>>({
    resolver: zodResolver(servicesSchema),
    defaultValues: { name: '', email: '', phone: '', services: [], description: '' },
  })
  const { addRequest } = useRequestsStore()

  const onSubmit = async (data: z.infer<typeof servicesSchema>) => {
    try {
      await addRequest({ type: 'service', ...data })
      toast.success('Serviços solicitados com sucesso! Analisaremos sua requisição.')
      form.reset()
    } catch (e) {
      toast.error('Erro ao salvar no banco de dados. Tente novamente.')
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
                  <Input placeholder="Seu nome" {...field} />
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
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="seu@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Telefone</FormLabel>
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
                {servicesList.map((item) => (
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
