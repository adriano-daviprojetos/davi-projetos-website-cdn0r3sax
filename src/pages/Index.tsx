import { Link } from 'react-router-dom'
import { ArrowRight, Shield, Award, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { servicesList } from '@/data/services'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Index() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://img.usecurling.com/p/1920/1080?q=industrial%20crane&color=blue"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-primary/85 mix-blend-multiply" />
        </div>
        <div className="relative z-10 text-white space-y-8 max-w-4xl px-4 animate-fade-in-up mt-12">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Engenharia de Rigging com Precisão e Segurança
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto">
            Soluções completas em planejamento de içamento de carga e consultoria técnica
            especializada para projetos de alta complexidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              asChild
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white shadow-lg text-md h-14 px-8"
            >
              <Link to="/contato">Solicitar Proposta Comercial</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-primary bg-white hover:bg-gray-100 border-none shadow-lg text-md h-14 px-8"
            >
              <Link to="/servicos">Serviços de Engenharia</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-4">
              Por que escolher a DAVI Projetos?
            </h2>
            <p className="text-slate-600">
              Nosso compromisso é entregar excelência técnica mitigando riscos em todas as etapas da
              operação.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-elevation hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Award className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Experiência Comprovada</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600">
                Anos de atuação no mercado desenvolvendo soluções para os mais desafiadores cenários
                industriais e de infraestrutura.
              </CardContent>
            </Card>
            <Card className="border-none shadow-elevation hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-secondary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle>Segurança em 1º Lugar</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600">
                Rigidez absoluta no cumprimento das normas regulamentadoras (NR) e standards
                internacionais de elevação de carga.
              </CardContent>
            </Card>
            <Card className="border-none shadow-elevation hover:-translate-y-1 transition-transform duration-300">
              <CardHeader className="text-center pb-2">
                <div className="mx-auto bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                  <Settings className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>Tecnologia Aplicada</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-slate-600">
                Uso de softwares de última geração para simulações 3D e cálculos precisos de
                estabilidade e distribuição de cargas.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-bold text-primary mb-4">Soluções em Engenharia</h2>
              <p className="text-slate-600">
                Conheça nossos principais serviços para garantir o sucesso da sua operação.
              </p>
            </div>
            <Button
              asChild
              variant="ghost"
              className="text-secondary hover:text-secondary/80 hover:bg-secondary/10 mt-4 md:mt-0"
            >
              <Link to="/servicos" className="flex items-center">
                Ver todos os serviços <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {servicesList.slice(0, 3).map((service) => (
              <Card
                key={service.id}
                className="group cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col"
              >
                <CardHeader>
                  <service.icon className="w-10 h-10 text-secondary mb-3 group-hover:scale-110 transition-transform duration-300" />
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <CardDescription className="text-base text-slate-600">
                    {service.description}
                  </CardDescription>
                </CardContent>
                <div className="p-6 pt-0 mt-auto">
                  <Link
                    to="/servicos"
                    className="text-sm font-semibold text-primary group-hover:text-secondary transition-colors inline-flex items-center"
                  >
                    Saiba Mais{' '}
                    <ArrowRight className="ml-1 w-4 h-4 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter */}
      <section className="py-20 bg-primary text-white">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="pt-8 md:pt-0">
            <h3 className="text-5xl font-bold text-secondary mb-3">10+</h3>
            <p className="text-xl text-gray-300 font-medium">Anos de Experiência</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-5xl font-bold text-secondary mb-3">8000+</h3>
            <p className="text-xl text-gray-300 font-medium">Projetos Realizados</p>
          </div>
          <div className="pt-8 md:pt-0">
            <h3 className="text-5xl font-bold text-secondary mb-3">1000+</h3>
            <p className="text-xl text-gray-300 font-medium">Equipamentos Inspecionados</p>
          </div>
        </div>
      </section>
    </div>
  )
}
