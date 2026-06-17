import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
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

const proposalSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  company: z.string().min(2, 'Empresa é obrigatória'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  location: z.string().min(2, 'Local da obra é obrigatório'),
  description: z.string().min(10, 'Descrição detalhada é obrigatória'),
})

export function ProposalForm() {
  const { toast } = useToast()
  const form = useForm<z.infer<typeof proposalSchema>>({
    resolver: zodResolver(proposalSchema),
    defaultValues: { name: '', company: '', email: '', phone: '', location: '', description: '' },
  })

  const onSubmit = (data: z.infer<typeof proposalSchema>) => {
    db.saveRequest({ ...data, type: 'proposta' })
    toast({
      title: 'Proposta enviada com sucesso!',
      description: 'Nossa equipe de engenharia entrará em contato em breve.',
    })
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: João Silva" {...field} />
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
                  <Input placeholder="Ex: Construtora Alfa" {...field} />
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
                  <Input placeholder="joao@alfa.com" {...field} />
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
                <FormLabel>Telefone</FormLabel>
                <FormControl>
                  <Input placeholder="(11) 99999-9999" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Local da Obra</FormLabel>
                <FormControl>
                  <Input placeholder="Cidade, Estado" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Descrição do Projeto</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Descreva os detalhes da operação de içamento..."
                    className="min-h-[120px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button
          type="submit"
          className="w-full md:w-auto bg-secondary hover:bg-secondary/90 text-white h-12 px-8"
        >
          Solicitar Proposta
        </Button>
      </form>
    </Form>
  )
}
