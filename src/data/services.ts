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
    title: 'Laudo de Inspeção de Equipamentos',
    description:
      'Certificação técnica completa de guindastes e maquinários pesados conforme normas vigentes.',
    icon: FileCheck,
  },
  {
    id: 'laudo-materiais',
    title: 'Laudo de Inspeção de Materiais de Içamento',
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
    title: 'Acompanhamento/Supervisão de Rigging',
    description:
      'Acompanhamento in loco realizado por especialistas experientes durante a execução de toda a operação.',
    icon: Users,
  },
  {
    id: 'fiscalizacao',
    title: 'Fiscalização/Aprovação de operações de içamento',
    description:
      'Auditoria especializada para análise e aprovação de projetos de rigging e liberação de operações de içamentos.',
    icon: ShieldCheck,
  },
]
