import {
  ClipboardList,
  FileCheck,
  ShieldCheck,
  TowerControl,
  Map,
  Users,
  LinkIcon,
} from 'lucide-react'

export const servicesList = [
  {
    id: 'plano-rigging',
    title: 'Plano de Rigging',
    description:
      'Planejamento detalhado para içamentos complexos, garantindo máxima segurança e precisão operacional.',
    icon: ClipboardList,
  },
  {
    id: 'plano-gruas',
    title: 'Plano de Carga para Gruas',
    description:
      'Estudo específico de layout e planejamento para operações seguras com gruas torre em obras.',
    icon: TowerControl,
  },
  {
    id: 'laudo-equipamentos',
    title: 'Laudo de Inspeção',
    description:
      'Certificação técnica completa de guindastes e maquinários pesados conforme normas vigentes.',
    icon: FileCheck,
  },
  {
    id: 'laudo-materiais',
    title: 'Inspeção de Materiais',
    description:
      'Avaliação rigorosa e certificação para lingas, manilhas e diversos acessórios de amarração.',
    icon: LinkIcon,
  },
  {
    id: 'visita-tecnica',
    title: 'Visita Técnica',
    description:
      'Avaliação profissional em campo para a elaboração de estudos de viabilidade técnica sólidos.',
    icon: Map,
  },
  {
    id: 'supervisao',
    title: 'Supervisão de Rigging',
    description:
      'Acompanhamento in loco realizado por especialistas experientes durante a execução de toda a operação.',
    icon: Users,
  },
  {
    id: 'fiscalizacao',
    title: 'Aprovação de Operações',
    description:
      'Auditoria especializada de terceira parte para verificação minuciosa e liberação de içamentos.',
    icon: ShieldCheck,
  },
]
