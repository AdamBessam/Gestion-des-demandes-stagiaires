// assets
import { IconPhone, IconHelp } from '@tabler/icons-react';
import MailIcon from '@mui/icons-material/Mail';


// constant
const icons = { IconPhone, IconHelp };

// ==============================|| SAMPLE PAGE & DOCUMENTATION MENU ITEMS ||============================== //

const other = {
  id: 'sample-docs-roadmap',
  type: 'group',
  children: [
    {
      id: 'Contact',
      title: 'Demande',
      type: 'item',
      url: '/admin/Demandes',
      icon: MailIcon,
      breadcrumbs: false
    },
    {
      id: 'About Us',
      title: 'About Us',
      type: 'item',
      url: '/admin/About',
      icon: icons.IconHelp
    }
  ]
};

export default other;
