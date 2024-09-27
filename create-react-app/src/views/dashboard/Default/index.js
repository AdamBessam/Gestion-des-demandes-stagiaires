/* eslint-disable prettier/prettier */
import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project imports
import TotaleDemande from './TotalDemande';
//import PopularCard from './PopularCard';
import StageEnCours from './StageEncours';
//import TotalIncomeDarkCard from './TotalIncomeDarkCard';
import StageRefuser from './StageRefuser';
import { gridSpacing } from 'store/constant';
import Department from './Department';
import BarChart from './chats';

// ==============================|| DEFAULT DASHBOARD ||============================== //

const Dashboard = () => {
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <TotaleDemande isLoading={isLoading} />
          </Grid>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <StageEnCours isLoading={isLoading} />
          </Grid>
         
<Grid item lg={4} md={6} sm={6} xs={12}>
            
              
              
                <StageRefuser isLoading={isLoading} />
              
            
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        
          <Grid item xs={12} md={12}>
            <BarChart/>
          
        </Grid>
      </Grid>
      <Grid item xs={12}>
        
          <Grid item xs={12} md={12}>
            <Department/>
          
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
