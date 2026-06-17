import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, Linkedin } from 'lucide-react'
import logoUrl from '@/assets/logonovo-74529.png'

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-16 border-t border-primary-foreground/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 bg-white w-max p-2 rounded-md">
              <img
                src={logoUrl}
                alt="DAVI Projetos de Rigging"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-sm text-primary-foreground/80 leading-relaxed">
              Especialistas em engenharia de rigging, garantindo segurança e precisão em operações
              complexas de içamento de carga.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="bg-white/10 p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Links Rápidos</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <Link to="/" className="hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-accent transition-colors">
                  Sobre a Empresa
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-accent transition-colors">
                  Serviços de Engenharia de Rigging
                </Link>
              </li>
              <li>
                <Link to="/contato" className="hover:text-accent transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-accent transition-colors">
                  Área Restrita
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Serviços</h4>
            <ul className="space-y-3 text-sm text-primary-foreground/80">
              <li>
                <Link to="/servicos" className="hover:text-accent transition-colors">
                  Plano de Rigging
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-accent transition-colors">
                  Laudo de Inspeção
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-accent transition-colors">
                  Visita Técnica
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="hover:text-accent transition-colors">
                  Supervisão de Operações
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-6 text-lg">Contato</h4>
            <ul className="space-y-4 text-sm text-primary-foreground/80">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>
                  Av. Engenharia Moderna, 1000
                  <br />
                  São Paulo - SP
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+55 (11) 98888-7777</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>contato@daviprojetos.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60 flex flex-col md:flex-row justify-between items-center">
          <p>
            &copy; {new Date().getFullYear()} Davi Projetos e Consultoria de Rigging. Todos os
            direitos reservados.
          </p>
          <p className="mt-2 md:mt-0">Desenvolvido com excelência técnica.</p>
        </div>
      </div>
    </footer>
  )
}
