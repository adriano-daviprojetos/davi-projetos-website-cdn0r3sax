import { Link, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { Menu, Instagram, Linkedin } from 'lucide-react'
import { useState, useEffect } from 'react'
import logoUrl from '@/assets/logonovo-74529.png'

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre a Empresa', path: '/sobre' },
    { name: 'Serviços de Engenharia de Rigging', path: '/servicos' },
    { name: 'Contato', path: '/contato' },
    { name: 'Site Davi Projetos Oficial', path: 'https://daviprojetos.com.br', external: true },
  ]

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false
    return location.pathname.startsWith(path)
  }

  const isHome = location.pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 border-b',
        isScrolled
          ? 'bg-primary text-white shadow-lg border-primary-foreground/10'
          : isHome
            ? 'bg-background/10 backdrop-blur-md text-white border-white/20'
            : 'bg-background/90 backdrop-blur-md text-foreground border-border',
      )}
    >
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img
            src={logoUrl}
            alt="DAVI Projetos de Rigging"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium transition-colors hover:text-accent relative"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-accent relative',
                  isActive(link.path) &&
                    "text-accent after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-full after:h-0.5 after:bg-accent",
                )}
              >
                {link.name}
              </Link>
            ),
          )}
          <div className="flex items-center gap-3 ml-2 mr-2">
            <a
              href="https://www.linkedin.com/company/davi-projetos-e-consultoria/?viewAsMember=true"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent hover:scale-110 transition-all duration-200"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://www.instagram.com/davi_projetos/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent hover:scale-110 transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
          </div>
          <Button className="bg-accent hover:bg-accent/90 text-white" asChild>
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-primary text-primary-foreground border-r-primary-foreground/10"
          >
            <SheetTitle className="sr-only">Menu de Navegação</SheetTitle>
            <div className="flex flex-col gap-6 mt-8">
              {navLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.path}
                    href={link.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium border-b border-white/10 pb-3 text-white/90"
                  >
                    {link.name}
                  </a>
                ) : (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      'text-lg font-medium border-b border-white/10 pb-3',
                      isActive(link.path) ? 'text-accent border-accent' : 'text-white/90',
                    )}
                  >
                    {link.name}
                  </Link>
                ),
              )}
              <div className="flex items-center gap-4 py-2 mt-2">
                <a
                  href="https://www.linkedin.com/company/davi-projetos-e-consultoria/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent hover:scale-110 transition-all duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/davi_projetos/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent hover:scale-110 transition-all duration-200"
                  aria-label="Instagram"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
              <Button
                className="bg-accent hover:bg-accent/90 text-white w-full mt-2"
                onClick={() => setMobileMenuOpen(false)}
                asChild
              >
                <Link to="/contato">Solicitar Orçamento</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
