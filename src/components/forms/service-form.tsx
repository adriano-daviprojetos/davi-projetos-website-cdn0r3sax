import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useToast } from '@/hooks/use-toast'
import { db } from '@/lib/db'

const SERVICES_LIST = [
  'Plano de Rigging',
  'Plano de Carga para Gruas',
  'Laudo de Inspeção de Equipamentos',
  'Laudo de Inspeção de Materiais de Içamento',
  'Visita Técnica',
  'Acompanhamento/Supervisão de Rigging',
  'Fiscalização/Aprovação de operações de içamento',
]

const serviceSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  services: z.array(z.string()).min(1, 'Selecione pelo menos um serviço'),
  description: z.string().min(10, 'Detalhes são obrigatórios'),
})

export function ServiceForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof serviceSchema>>({
    resolver: zodResolver(serviceSchema),
    defaultValues: { name: '', email: '', phone: '', services: [], description: '' },
  })

  const onSubmit = (data: z.infer<typeof serviceSchema>) => {
    db.saveRequest({ ...data, type: 'servico' })
    toast({
      title: 'Solicitação enviada!',
      description: 'Nossa equipe técnica entrará em contato em breve.',
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Maria Souza" {...field} />
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
                  <Input placeholder="maria@email.com" {...field} />
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
                <FormLabel>Serviços Desejados</FormLabel>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES_LIST.map((service) => (
                  <FormField
                    key={service}
                    control={form.control}
                    name="services"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={service}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(service)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, service])
                                  : field.onChange(
                                      field.value?.filter((value) => value !== service),
                                    )
                              }}
                            />
                          </FormControl>
                          <FormLabel className="font-normal">{service}</FormLabel>
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
              <FormLabel>Detalhes do Projeto / Necessidade</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os equipamentos ou serviços específicos..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white h-12 px-8"
        >
          Solicitar Serviços
        </Button>
      </form>
    </Form>
  )
}
