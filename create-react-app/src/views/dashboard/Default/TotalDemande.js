import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import EarningIcon from 'assets/images/icons/envelop.svg';

// Define custom blue shades
const blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1'
};

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: blue[800], // Set default background color
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&>div': {
    position: 'relative',
    zIndex: 5
  },
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: blue[900],
    borderRadius: '50%',
    zIndex: 1,
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    zIndex: 1,
    width: 210,
    height: 210,
    background: blue[900],
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const TotaleDemande = ({ isLoading }) => {
  const [DemandeCount, setDemandeCount] = useState(null);
  const fetchDemandecount = async () => {
    try {
      const token = sessionStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api/demandes/getDemandes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();

      // Calculer le nombre de demandes
      const count = data.length; // par exemple, si `data` est un tableau de demandes

      // Mettre à jour l'état avec le nombre de demandes
      setDemandeCount(count);
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes :', error);
    }
  };
  useEffect(() => {
    fetchDemandecount({ isLoading });
  }, []);

 useEffect(() => {
    fetchDemandecount(); // Fetch data initially
    const intervalId = setInterval(fetchDemandecount, 1000); // Fetch data every 5 seconds

    return () => clearInterval(intervalId); // Cleanup interval on unmount
  }, []);
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.35 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        backgroundColor: blue[800],
                        mt: 1,
                        width: '50px'
                      }}
                    >
                      <img className="my-20" src={EarningIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      {DemandeCount ?? 'Loading...'}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 500,
                    color: 'white'
                  }}
                >
                  Total Demandes
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

TotaleDemande.propTypes = {
  isLoading: PropTypes.bool
};

export default TotaleDemande;
