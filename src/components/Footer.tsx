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
                href="https://www.linkedin.com/company/davi-projetos-e-consultoria/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://www.instagram.com/davi_projetos/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/5511966162222"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 p-2 rounded-full hover:bg-accent hover:scale-110 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
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
                  Rua Voluntários da Pátria, 3744&nbsp;
                  <br />
                  Conj 86 - Santana
                  <br />
                  São Paulo - SP - CEP 02402-400
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span>+55 (11) 96616-2222</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span>comercial@daviprojetos.com.br</span>
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
