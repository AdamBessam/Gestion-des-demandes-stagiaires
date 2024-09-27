// assets
import { IconUser, IconPencil, IconShadow, IconWindmill } from '@tabler/icons-react';

// constant
const icons = {
  IconUser,
  IconPencil,
  IconShadow,
  IconWindmill
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const employeStagaire = {
  id: 'Collaboration Employée-Stagiaire',
  title: 'Collaboration Employée-Stagiaire',
  type: 'group',
  children: [
    {
      id: 'Employé',
      title: 'Employés',
      type: 'item',
      url: '/admin/Employé',
      icon: icons.IconUser,
      breadcrumbs: false
    },
    {
      id: 'Stagaire',
      title: 'Stagaires',
      type: 'item',
      url: '/admin/stagiaire',
      icon: icons.IconPencil,
      breadcrumbs: false
    }]
};

export default employeStagaire;
