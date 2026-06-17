import { Card, CardContent } from '@/components/ui/card'
import { Target, Eye, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export default function About() {
  return (
    <div className="w-full">
      <div className="bg-primary/5 py-16">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="text-4xl font-bold text-primary mb-6">Nossa História</h1>
          <p className="text-lg text-slate-700 leading-relaxed">
            A <strong>Davi Projetos e Consultoria de Rigging</strong> nasceu da necessidade do
            mercado industrial e da construção civil por operações de içamento mais seguras,
            eficientes e tecnicamente embasadas. Com mais de uma década de expertise, nos
            consolidamos como parceiros estratégicos nas maiores obras do país, garantindo que cada
            tonelada elevada obedeça aos mais rigorosos padrões de engenharia.
          </p>
        </div>
      </div>

      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center shadow-subtle border-none">
            <CardContent className="pt-8">
              <div className="mx-auto bg-blue-100 text-blue-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Missão</h3>
              <p className="text-slate-600">
                Fornecer soluções de engenharia de rigging de excelência, assegurando a integridade
                de pessoas, equipamentos e instalações através de planejamento minucioso e
                supervisão qualificada.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-subtle border-none">
            <CardContent className="pt-8">
              <div className="mx-auto bg-indigo-100 text-indigo-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Eye size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Visão</h3>
              <p className="text-slate-600">
                Ser reconhecida nacionalmente como a principal referência técnica em consultoria de
                içamento e movimentação de cargas complexas até 2030.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center shadow-subtle border-none">
            <CardContent className="pt-8">
              <div className="mx-auto bg-red-100 text-red-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Heart size={32} />
              </div>
              <h3 className="text-xl font-bold text-primary mb-4">Valores</h3>
              <ul className="text-slate-600 space-y-2 text-left w-max mx-auto">
                <li>• Segurança inegociável</li>
                <li>• Excelência técnica</li>
                <li>• Ética e transparência</li>
                <li>• Inovação contínua</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="py-16 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h2 className="text-3xl font-bold mb-6">Nossa Galeria de Operações</h2>
          <p className="text-slate-400 mb-12">
            Confira a magnitude e o rigor técnico aplicados nos projetos que gerenciamos.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <img
              src="https://img.usecurling.com/p/400/400?q=crane%20lift"
              alt="Operação"
              className="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform"
            />
            <img
              src="https://img.usecurling.com/p/400/400?q=construction%20site"
              alt="Operação"
              className="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform"
            />
            <img
              src="https://img.usecurling.com/p/400/400?q=steel%20beams"
              alt="Operação"
              className="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform"
            />
            <img
              src="https://img.usecurling.com/p/400/400?q=engineer"
              alt="Operação"
              className="rounded-lg object-cover w-full h-48 hover:scale-105 transition-transform"
            />
          </div>
        </div>
      </section>

      <section className="py-20 text-center container mx-auto px-4">
        <h2 className="text-3xl font-bold text-primary mb-6">
          Pronto para elevar seu projeto com segurança?
        </h2>
        <Button
          asChild
          size="lg"
          className="bg-secondary hover:bg-secondary/90 text-white px-8 h-14 text-lg"
        >
          <Link to="/contato">Fale com um Especialista</Link>
        </Button>
      </section>
    </div>
  )
}
