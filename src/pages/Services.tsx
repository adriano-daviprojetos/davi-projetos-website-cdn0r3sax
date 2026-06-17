import { servicesList } from '@/data/services'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function Services() {
  return (
    <div className="w-full">
      <div className="bg-primary text-white py-20 text-center">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Soluções em Engenharia de Rigging</h1>
          <p className="text-lg md:text-xl text-gray-300 font-light">
            Catálogo completo de serviços especializados para garantir total segurança, conformidade
            e eficiência nas suas operações de içamento de carga.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-20 max-w-6xl">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesList.map((service, index) => (
            <Card
              key={service.id}
              className="group border shadow-sm hover:shadow-elevation transition-all duration-300 flex flex-col animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="bg-primary/5 w-14 h-14 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-7 h-7 text-primary group-hover:text-white" />
                </div>
                <CardTitle className="text-xl text-primary leading-snug">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <p className="text-slate-600 leading-relaxed mb-6 flex-1">{service.description}</p>
                <Button
                  asChild
                  variant="outline"
                  className="w-full group-hover:border-primary group-hover:bg-primary/5 transition-colors"
                >
                  <Link to={`/contato?service=${service.id}`}>Solicitar este serviço</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 py-16 border-t">
        <div className="container mx-auto px-4 text-center max-w-2xl">
          <h2 className="text-2xl font-bold text-primary mb-4">
            Precisa de uma solução customizada?
          </h2>
          <p className="text-slate-600 mb-8">
            Nossa equipe de engenharia está pronta para analisar os desafios específicos do seu
            canteiro de obras e desenvolver um planejamento exclusivo.
          </p>
          <Button asChild size="lg" className="bg-secondary hover:bg-secondary/90 text-white">
            <Link to="/contato">Agendar Visita Técnica</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
