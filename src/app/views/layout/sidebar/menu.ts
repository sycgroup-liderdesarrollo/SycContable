import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Home',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'box',
    link: '/dashboard'
  },
  {
    label: 'Administrativos',
    isTitle: true
  },
  {
    label: 'Colaboradores',
    icon: 'users',
    subItems: [
      {
        label: 'Gestionar Colaboradores',
        link: 'administrative/employees',
      },
      {
        label: 'Gestionar Vacaciones',
        link: 'administrative/manage-vacations'
      }
    ]
  },
  {
    label: 'Convenios',
    icon: 'slack',
    subItems: [
      {
        label: 'Gestionar convenios',
        link: '/',
      },
      {
        label: 'Asignar Convenio',
        link: '/',
      }
    ]
  },
  {
    label: 'Proveedores',
    icon: 'truck',
    link: '/'
  },
  {
    label: 'Nómina',
    isTitle: true
  },
  {
    label: 'Cargar Conceptos',
    icon: 'credit-card',
    link: '/'
  },
  {
    label: 'Deducciones por Convenios',
    icon: 'dollar-sign',
    link: '/'
  },
  {
    label: 'Seguridad',
    isTitle: true
  },
  {
    label: 'Autorización',
    icon: 'shield',
    subItems: [
      {
        label: 'Roles',
        link: '/',
      },
      {
        label: 'Permisos',
        link: '/',
      }
    ]
  }
];
