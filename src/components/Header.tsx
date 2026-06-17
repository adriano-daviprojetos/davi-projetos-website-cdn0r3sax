import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import logoUrl from '@/assets/logonovo-74529.png'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location.pathname])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Sobre a Empresa', path: '/sobre' },
    { name: 'Serviços de Engenharia de Rigging', path: '/servicos' },
    { name: 'Contato', path: '/contato' },
  ]

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled
          ? 'bg-primary text-primary-foreground shadow-elevation py-3'
          : 'bg-white/90 backdrop-blur-md text-primary py-4',
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoUrl}
            alt="DAVI Projetos de Rigging"
            className="h-12 w-auto object-contain bg-white rounded px-2 py-1"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                'hover:text-secondary transition-colors',
                location.pathname === link.path && 'text-secondary font-semibold',
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button
            asChild
            className="bg-secondary hover:bg-secondary/90 text-white rounded-md shadow-sm"
          >
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-t shadow-lg py-4 px-4 flex flex-col gap-4 md:hidden animate-fade-in-down text-primary">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="text-lg font-medium py-2 border-b border-gray-100 last:border-0"
            >
              {link.name}
            </Link>
          ))}
          <Button asChild className="bg-secondary text-white mt-2 w-full">
            <Link to="/contato">Solicitar Orçamento</Link>
          </Button>
        </div>
      )}
    </header>
  )
}
