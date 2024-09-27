/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useTheme, styled } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';
import SkeletonTotalOrderCard from 'ui-component/cards/Skeleton/EarningCard';
import timeIcon from 'assets/images/icons/time.svg';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
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
    background: theme.palette.primary[800],
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
    background: theme.palette.primary[800],
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

const StageEnCours = ({ isLoading }) => {
  const theme = useTheme();
  const [StageEnCours, setStageEnCours] = useState(null);
  const fetchStage = async () => {
    try {
      const token = sessionStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api/demandes/getDemandes', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch demandes data');
      }

      const data = await response.json();

      const currentDate = new Date();
      console.log("mee",data)
      const accepteDemandes = data.filter((demande) => {
        return demande.etatDemande === 'Accepter' && new Date(demande.dureefin) > currentDate;
      });
      console.log("mee",accepteDemandes)
   
      // Compte le nombre de demandes acceptées et expirées
      setStageEnCours(accepteDemandes.length);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    
  
    fetchStage();
  }, []);
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
                        backgroundColor: theme.palette.primary.dark,
                        mt: 1,
                        width: '48px' // Adjust the height for zooming
                      }}
                    >
                      <img src={timeIcon} alt="Notification" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '2.125rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
                      {StageEnCours !== null ? StageEnCours : 'Loading...'}
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
                  Stage En Cours
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

StageEnCours.propTypes = {
  isLoading: PropTypes.bool
};

export default StageEnCours;
