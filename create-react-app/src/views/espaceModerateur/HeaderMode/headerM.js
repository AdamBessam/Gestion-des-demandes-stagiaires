import PropTypes from 'prop-types';

// material-ui
import { useTheme } from '@mui/material/styles';
import { Box} from '@mui/material';

// project imports
import LogoSection from '../../../layout/MainLayout/LogoSection';


import PorifileModerateur from './headermoderateur';

// assets

// ==============================|| MAIN NAVBAR / HEADER ||============================== //

const Header = ({ onProfileClick }) => {
  const theme = useTheme();

  return (
    <>
      {/* logo & toggler button */}
      <Box
        sx={{
          width: 228,
          display: 'flex',
          height: 50, // Vous pouvez ajuster cette valeur pour diminuer la hauteur
          [theme.breakpoints.down('md')]: {
            width: 'auto'
          }
        }}
      >
        <Box component="span" sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}>
          <LogoSection />
        </Box>

        
      </Box>

   
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ flexGrow: 1 }} />


      <PorifileModerateur onProfileClick={onProfileClick} />
    </>
  );
};

Header.propTypes = {
  handleLeftDrawerToggle: PropTypes.func
};

export default Header;
