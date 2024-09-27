import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Outlet, useLocation} from 'react-router-dom';
import {
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';

import Header from './HeaderMode/headerM';
import ModerateurProfil from './HeaderMode/ModerateurProfil';

const EspaceModerateur = () => {
  const theme = useTheme();
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const navigate = useNavigate();
  const location = useLocation();
  const [demandes, setDemandes] = useState([]);

  const [showProfile, setShowProfile] = useState(false);
  const [showDemande, setShowDemande] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const userId = sessionStorage.getItem('USER_ID');
  // Function to fetch user data and demandes
  const fetchUserAndDemandes = async () => {
    try {
      // const userId = sessionStorage.getItem('USER_ID');
      console.log("ad",userId)
      if (!userId) {
        throw new Error('Aucun ID utilisateur trouvé dans le sessionStorage');
      }

      // Fetch user data
      const userResponse = await fetch(`http://localhost:3001/api/users/getUser/${userId}`);
      if (!userResponse.ok) {
        throw new Error('Erreur lors de la récupération des données utilisateur');
      }
      
      const userData = await userResponse.json();
      console.log('User Data:', userData);
      console.log(userData.user.email)

      // Ensure department exists and log the department
      if (!userData.user.departement || !userData.user.departement._id) {
        throw new Error('Département utilisateur non trouvé ou ID manquant');
      }
      console.log("Département ID:", userData.user.departement._id);

  

      // Fetch demandes
      const demandesResponse = await fetch('http://localhost:3001/api/demandes/getDemandes');
      if (!demandesResponse.ok) {
        throw new Error('Erreur lors de la récupération des demandes');
      }
      
      const demandesData = await demandesResponse.json();
      console.log('Demandes Data:', demandesData);

      // Filter demandes based on department ID
      const filteredDemandes = demandesData.filter(demande => {
        return demande.departement && demande.departement._id === userData.user.departement._id;
      });
      setDemandes(filteredDemandes);
    } catch (error) {
      console.error('Erreur:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    
  }, [fetchUserAndDemandes()]);

  useEffect(() => {
    fetchUserAndDemandes();
  }, []);
  useEffect(() => {
    setShowProfile(location.pathname.includes('/profile'));
    setShowDemande(location.pathname.includes('/DemandeInfo'));
    if (location.pathname === '/Moderateur') {
      setShowProfile(false);
      setShowDemande(false);
    }
  }, [location]);

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowDemande(false);
  
  };

  const handleRetourClick = () => {
    setShowProfile(false);
    setShowDemande(false);
    navigate('/Employee');
  };

  const handleDemande = (demandeId) => {
    setShowProfile(false);
    setShowDemande(true);
    navigate(`/Moderateur/DemandeInfo/${demandeId}`);
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error" variant="h6">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{
          bgcolor: theme.palette.background.default,
          transition: leftDrawerOpened ? theme.transitions.create('width') : 'none'
        }}
      >
        <Toolbar sx={{ minHeight: '48px' }}>
          <Header onProfileClick={handleProfileClick} />
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 10
        }}
      >
        {showProfile ? (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Button variant="contained" color="primary" onClick={handleRetourClick}>
                Retour
              </Button>
              <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
                <Typography variant="h2" sx={{ textAlign: 'center' }}>
                  Votre Profil
                </Typography>
              </Box>
            </Box>
            <ModerateurProfil />
          </>
        ) : showDemande ? (
          <Outlet />
        ) : (
          <>
            <Typography variant="h2" gutterBottom>
              Liste des demandes
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Etat</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {demandes.map((demande) => (
                    <TableRow key={demande._id}>
                      <TableCell>{demande.nom}</TableCell>
                      <TableCell>{demande.prenom}</TableCell>
                      <TableCell>{demande.email}</TableCell>
                      <TableCell
                        sx={{
                          color:
                            (demande.etatDemande === 'Accepter' && 'green') ||
                            (demande.etatDemande === 'Refuser' && 'red') ||
                            (demande.etatDemande === 'en attente' && 'blue'),
                          fontWeight: 'bold'
                        }}
                      >
                        {demande.etatDemande}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDemande(demande._id)} className="text-blue-600 hover:underline">
                          Détails
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>
    </Box>
  );
};

export default EspaceModerateur;
