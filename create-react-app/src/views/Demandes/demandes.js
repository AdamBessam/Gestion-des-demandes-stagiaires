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
  CircularProgress
} from '@mui/material';

const Demandes = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [demandes, setDemandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDemandes = async () => {
    try {
      const demandesResponse = await fetch('http://localhost:3001/api/demandes/getDemandes');
      if (!demandesResponse.ok) {
        throw new Error('Erreur lors de la récupération des demandes');
      }
      const demandesData = await demandesResponse.json();
      setDemandes(demandesData);
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
              Liste des demandes
            </Typography>
            <TableContainer component={Paper} sx={{ mt: 3 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nom</TableCell>
                    <TableCell>Prénom</TableCell>
                    <TableCell>Email</TableCell>
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

export default Demandes;
