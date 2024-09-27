// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';
// import { useSelector } from 'react-redux';

// // material-ui
// import { useTheme } from '@mui/material/styles';
// import { Grid, MenuItem, TextField, Typography } from '@mui/material';

// // third-party
// import ApexCharts from 'apexcharts';
// import Chart from 'react-apexcharts';

// // project imports
// import SkeletonTotalGrowthBarChart from 'ui-component/cards/Skeleton/TotalGrowthBarChart';
// import MainCard from 'ui-component/cards/MainCard';
// import { gridSpacing } from 'store/constant';

// // chart data
// import chartData from './chart-data/total-growth-bar-chart';





// const status = [
//   {
//     value: 'today',
//     label: 'Today'
//   },
//   {
//     value: 'month',
//     label: 'This Month'
//   },
//   {
//     value: 'year',
//     label: 'This Year'
//   }
// ];

// // ==============================|| DASHBOARD DEFAULT - TOTAL GROWTH BAR CHART ||============================== //
// const TotalGrowthBarChart = ({ isLoading }) => {
//   const [value, setValue] = useState('today');
//   const theme = useTheme();
//   const customization = useSelector((state) => state.customization);

//   const { navType } = customization;
//   const { primary } = theme.palette.text;
//   const darkLight = theme.palette.dark.light;
//   const grey200 = theme.palette.grey[200];
//   const grey500 = theme.palette.grey[500];

//   const primary200 = theme.palette.primary[200];
//   const primaryDark = theme.palette.primary.dark;
//   const secondaryMain = theme.palette.secondary.main;
//   const secondaryLight = theme.palette.secondary.light;
//   const customColors = {
//     50: '#009688',  // New teal shade
//     100: '#FFC107', // New yellow shade
//     200: '#E91E63', // New pink shade
//     300: '#4CAF50', // New green shade
//     400: '#FF5722', // New red shade
//     500: '#9C27B0', // New purple shade
//     600: '#FF9800', // New orange shade
//     700: '#00BCD4', // New aqua green shade
// };


// const IITE = customColors[50]; // Vibrant teal shade
// const GC = customColors[100];   // Vibrant yellow shade
// const ISIC = customColors[200];  // Vibrant pink shade
// const CCN = customColors[300];  // Vibrant green shade
// const CP1 = customColors[400];   // Vibrant red shade
// const G2E = customColors[500]; // Deep purple shade
// const GI = customColors[600];  // Deep orange shade
// const CP2 = customColors[700];  // Aqua green shade


//   useEffect(() => {
//     const newColors = [IITE, GC, GI, ISIC, G2E, CCN, CP1, CP2];

//     const newChartData = {
//       ...chartData.options,
//       colors: newColors,

//       xaxis: {
       
//         labels: {
//           style: {
//             colors: [primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary, primary]
//           }
//         }
//       },
//       yaxis: {
//         labels: {
//           style: {
//             colors: [primary]
//           }
//         }
//       },
//       grid: {
//         borderColor: grey200
//       },
//       tooltip: {
//         theme: 'light'
//       },
//       legend: {
//         labels: {
//           colors: grey500
//         }
//       }
//     };

//     // do not load chart when loading
//     if (!isLoading) {
//       ApexCharts.exec(`bar-chart`, 'updateOptions', newChartData);
//     }
//   }, [navType, primary200, primaryDark, secondaryMain, secondaryLight, primary, darkLight,'purple', 'orange', 'cyan', 'lime', grey200, isLoading, grey500]);
//   return (
//     <>
//       {isLoading ? (
//         <SkeletonTotalGrowthBarChart />
//       ) : (
//         <MainCard>
//           <Grid container spacing={gridSpacing}>
//             <Grid item xs={12}>
//               <Grid container alignItems="center" justifyContent="space-between">
//                 <Grid item>
//                   <Grid container direction="column" spacing={1}>
//                     <Grid item>
//                       <Typography variant="subtitle2">Abscenses overview</Typography>
//                     </Grid>
//                     <Grid item>
                      
//                     </Grid>
//                   </Grid>
//                 </Grid>
//                 <Grid item>
//                   <TextField id="standard-select-currency" select value={value} onChange={(e) => setValue(e.target.value)}>
//                     {status.map((option) => (
//                       <MenuItem key={option.value} value={option.value}>
//                         {option.label}
//                       </MenuItem>
//                     ))}
//                   </TextField>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Grid item xs={12}>
//               <Chart {...chartData} />
//             </Grid>
//           </Grid>
//         </MainCard>
//       )}
//     </>
//   );
// };

// TotalGrowthBarChart.propTypes = {
//   isLoading: PropTypes.bool
// };

// export default TotalGrowthBarChart;