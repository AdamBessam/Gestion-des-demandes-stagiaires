import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Stagiaire = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDemandeId, setSelectedDemandeId] = useState(null);

  const fetchDemandes = async () => {
    try {
      const demandesResponse = await fetch('http://localhost:3001/api/demandes/getDemandes');
      if (!demandesResponse.ok) {
        throw new Error('Erreur lors de la récupération des demandes');
      }
      const demandesData = await demandesResponse.json();
      // Filter demandes to only include those with etatDemande = 'Accepter'
      const filteredDemandes = demandesData.filter(demande => demande.etatDemande === 'Accepter');
      setDemandes(filteredDemandes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemandes();
  }, []);

  const handleDemande = (demandeId) => {
    navigate(`/admin/Demandes/${demandeId}`);
  };

  const handleDeleteClick = (demandeId) => {
    setSelectedDemandeId(demandeId);
    setOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/demandes/deleteDemande/${selectedDemandeId}`, {
        method: 'DELETE'
      });
      if (!response.ok) {
        throw new Error('Erreur lors de la suppression de la demande');
      }
      // Refresh the list after deletion
      fetchDemandes();
    } catch (error) {
      setError(error.message);
    } finally {
      setOpen(false);
      setSelectedDemandeId(null);
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedDemandeId(null);
  };

  const isDetailPage = location.pathname.includes('/admin/Demandes/');

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error" variant="h6">{error}</Typography>;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 3 }}>
        <Outlet />
        {!isDetailPage && (
          <>
            <Typography variant="h2" gutterBottom>
              Liste des Stagiaires
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Duree Début</TableCell>
                    <TableCell>Duree Fin</TableCell>
                    <TableCell>État</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {demandes.map((demande) => (
                    <TableRow key={demande._id}>
                      <TableCell>{demande.nom}</TableCell>
                      <TableCell>{demande.prenom}</TableCell>
                      <TableCell>{demande.email}</TableCell>
                      <TableCell>{new Date(demande.dureedebut).toLocaleDateString()}</TableCell>
                      <TableCell>{new Date(demande.dureefin).toLocaleDateString()}</TableCell>
                      <TableCell sx={{
                        color: 
                          demande.etatDemande === 'Accepter' ? 'green' : 
                          demande.etatDemande === 'Refuser' ? 'red' : 
                          demande.etatDemande === 'en attente' ? 'blue' : 'black',
                        fontWeight: 'bold'
                      }}>
                        {demande.etatDemande}
                      </TableCell>
                      <TableCell>
                        <Button onClick={() => handleDemande(demande._id)} className="text-blue-600 hover:underline">
                          Détails
                        </Button>
                        <IconButton onClick={() => handleDeleteClick(demande._id)} color="error">
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      {/* Confirmation dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography>Êtes-vous sûr de vouloir supprimer ce stagaire ?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Annuler</Button>
          <Button onClick={handleConfirmDelete} color="error">Supprimer</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Stagiaire;
