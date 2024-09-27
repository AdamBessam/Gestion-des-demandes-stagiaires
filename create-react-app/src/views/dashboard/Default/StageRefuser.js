import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import MainCard from 'ui-component/cards/MainCard';
import PerIcon from 'assets/images/icons/refuse.svg';
import React, { useState, useEffect } from 'react';

const lightBlue = {
  50: '#BBDEFB', // Light blue shade
  100: '#90CAF9', // Original light blue shade
  200: '#64B5F6' // Original light blue shade
};

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: lightBlue[50], // Lightest shade of blue
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
    backgroundColor: lightBlue[100], // Original light blue shade
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
    backgroundColor: lightBlue[100], // Original light blue shade
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

const StageRefuser = ({ isLoading }) => {
  const theme = useTheme();
  const [demandesRefusees, setDemandesRefusees] = useState([]);
  const [error, setError] = useState(null);
  const fetchStage = async () => {
    try {
      const token = sessionStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api/demandes/getDemandes', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch demandes data');
      }

      const data = await response.json();

      // Filtrer les demandes refusées
      const refuseDemande = data.filter((demande) => {
        return demande.etatDemande === 'Refuser';
      });

      // Mettre à jour l'état avec les demandes refusées
      setDemandesRefusees(refuseDemande);
    } catch (error) {
      setError(error.message);
    }
  };
  useEffect(() => {
    

    fetchStage();
  }, []);

  const nombreDemandesRefusees = demandesRefusees.length;
  useEffect(() => {
    
  }, [fetchStage()]);
  return (
    <>
      {isLoading ? (
        <SkeletonTotalOrderCard />
      ) : (
        <CardWrapper border={false} content={false}>
          <Box sx={{ p: 2.25 }}>
            <Grid container direction="column">
              <Grid item>
                <Grid container justifyContent="space-between">
                  <Grid item>
                    <Avatar
                      variant="rounded"
                      sx={{
                        ...theme.typography.commonAvatar,
                        ...theme.typography.largeAvatar,
                        backgroundColor: lightBlue[50],
                        mt: 1,
                        width: '45px'
                      }}
                    >
                      <img src={PerIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      {error ? `Error: ${error}` : nombreDemandesRefusees}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 1.25 }}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 500, color: 'white' }}>Stage Refuser</Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

StageRefuser.propTypes = {
  isLoading: PropTypes.bool
};

export default StageRefuser;
