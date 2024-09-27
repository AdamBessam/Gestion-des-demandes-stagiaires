import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTheme } from '@mui/material/styles';
import { useNavigate, Outlet,useLocation} from 'react-router-dom';
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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';

import Header from './Headerem/header'; // Ensure this path is correct
import Profil from './Headerem/EmployeProfile'; // Add your profile component here

const Espaceemploye = () => {
  const theme = useTheme();
  const leftDrawerOpened = useSelector((state) => state.customization.opened);
  const userId = sessionStorage.getItem('USER_ID');
  const location=useLocation();
  const navigate = useNavigate();
  const [showAddForm, setShowAddForm] = useState(false);
  const [demandes, setDemandes] = useState([]);
  const [demandeToDelete, setDemandeToDelete] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [version, setVersion] = useState(0);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);

  // Function to fetch user demands
  const fetchDemandes = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/demandes/getDemandes');
      const data = await response.json();
      const userDemandes = data.filter((demande) => demande.user._id === userId);
      console.log(userDemandes)
      setDemandes(userDemandes);
    } catch (error) {
      console.error('Erreur lors de la récupération des demandes:', error);
    }
  };

  // Use useEffect to fetch demands when the version changes
  useEffect(() => {
    fetchDemandes();
  }, [version]);
  useEffect(() => {
    setShowEditForm(location.pathname.includes(`/${userId}/Ajouter`));
    setShowProfile(location.pathname.includes('/profile'));
    if (location.pathname === '/Employee') {
      setShowProfile(false);
      setShowEditForm(false);
      setShowAddForm(false);
    }
  }, [location, userId]);
  useEffect(() => {
    
  }, [fetchDemandes()]);

  const showEditFormHandler = (demande) => {
    navigate(`/Employee/${userId}/Ajouter`, { state: { demande } }); // Redirect to the request form page with the request data to edit
    setShowEditForm(true);
    setShowProfile(false);
    setShowAddForm(false);
  };

  const confirmDeleteDemande = (demandeId) => {
    setDemandeToDelete(demandeId);
    setConfirmationDialogOpen(true);
  };

  const handleProfileClick = () => {
    setShowProfile(true);
    setShowAddForm(false);
    setShowEditForm(false);
  };

  const handleRetourClick = () => {
    setShowProfile(false);
    setShowAddForm(false);
    setShowEditForm(false);
    navigate('/Employee');

  };

  const handleAddClick = () => {
    setShowAddForm(true);
    setShowProfile(false);
    setShowEditForm(false);
    navigate(`/Employee/${userId}/Ajouter`);
  };

  const handleDeleteDemande = async () => {
    try {
      const token = sessionStorage.getItem('TOKEN');
      const response = await fetch(`http://localhost:3001/api/demandes/deleteDemande/${demandeToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la demande');
      }
      console.log('Demande supprimée avec succès');
      setVersion(version + 1);
    } catch (error) {
      console.error('Erreur lors de la suppression de la demande:', error);
    }
    setConfirmationDialogOpen(false);
    setDemandeToDelete(null);
  };

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
            <Profil />
          </>
        ) : showAddForm || showEditForm ? (
          <Outlet />
        ) : (
          <>
            <Typography variant="h2" gutterBottom>
              Liste de vos demandes
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Etat</TableCell>
                    <TableCell>Message</TableCell> {/* Add column for message */}
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
                        {demande.etatDemande === 'Accepter' && demande.message ? demande.message : '-'}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => showEditFormHandler(demande)} className="text-blue-600 hover:underline">
                          Modifier
                        </Button>
                        <Button onClick={() => confirmDeleteDemande(demande._id)} className="text-red-600 hover:underline ml-4">
                          Supprimer
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button variant="contained" color="primary" onClick={handleAddClick}>
                Ajouter Demande
              </Button>
            </Box>
          </>
        )}
      </Box>

      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Confirmer la suppression</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Êtes-vous sûr de vouloir supprimer cette demande ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteDemande} color="primary" autoFocus>
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Espaceemploye;
