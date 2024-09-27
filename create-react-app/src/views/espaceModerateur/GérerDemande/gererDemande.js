import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Paper,
  Divider,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from '@mui/material';

const styles = {
  container: {
    p: 3
  },
  paper: {
    p: 3,
    borderRadius: 2,
    boxShadow: 3
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 3
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: '2rem'
  },
  fieldWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 2,
    mb: 2
  },
  field: {
    flex: '1 1 calc(50% - 16px)',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '8px',
    boxSizing: 'border-box'
  },
  fieldLabel: {
    fontWeight: 'bold',
    fontSize: '1.1rem'
  },
  fieldValue: {
    fontSize: '1rem',
    mb: 2
  },
  fileList: {
    mb: 2
  },
  buttonContainer: {
    mt: 3,
    display: 'flex',
    justifyContent: 'space-between'
  },
  statusColor: (status) => {
    switch (status) {
      case 'Accepter':
        return 'green';
      case 'Refuser':
        return 'red';
      case 'en attente':
        return 'blue';
      default:
        return 'inherit';
    }
  }
};

const DemandeInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [demande, setDemande] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(null); // 'accept' or 'reject'
  const [message, setMessage] = useState(''); // Message field
  const [user, setUser] = useState(null);
  const fetchDemande = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/demandes/getDemande/${id}`);
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération de la demande');
      }
      const data = await response.json();
      setDemande(data);
      if (data.user._id) {
        const userResponse = await fetch(`http://localhost:3001/api/users/getUser/${data.user._id}`);
        if (!userResponse.ok) {
          throw new Error('Erreur lors de la récupération de l\'utilisateur');
        }
        const userData = await userResponse.json();
        setUser(userData);
        console.log("adam",user)
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDemande();
  }, [id]);

  const handleAction = async (action) => {
    try {
      const response = await fetch(`http://localhost:3001/api/demandes/gererEtat/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ etatDemande: action, message: dialogType === 'Accepter' ? message : '' }),
      });

      if (!response.ok) {
        throw new Error(`Erreur lors de ${action === 'Accepter' ? 'l\'acceptation' : 'du refus'} de la demande`);
      }

      fetchDemande();
      setOpenDialog(false);
      setMessage('');
      handleRetourClick(); // Clear message field
    } catch (error) {
      setError(error.message);
    }
  };
  const handleRetourClick = () => {
    navigate('/Moderateur');
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
  };
  const handleOpenDialog = (type) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setMessage(''); 
  };

  const handleFileClick = (file) => {
    const formattedFilePath = file.replace(/\\/g, '/');
    const fileUrl = `http://localhost:3001/fichiers/${encodeURIComponent(formattedFilePath)}`;
    window.open(fileUrl, '_blank');
  };
  

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error" variant="h6">{error}</Typography>;

  return (
    <Box sx={styles.container}>
      <Paper sx={styles.paper}>
        <Box sx={styles.header}>
          <Button variant="outlined" color="primary" onClick={() => navigate('/Employee')}>
            Retour
          </Button>
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            <Typography variant="h4" sx={styles.title}>
              Détails de la demande
            </Typography>
          </Box>
        </Box>
        <Divider sx={{ mb: 3 }} />
        {demande && (
          <Box>
            <Box sx={styles.fieldWrapper}>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Nom:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{demande.nom}</Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Prénom:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{demande.prenom}</Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Email:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{demande.email}</Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Responsabilité Stagiaire:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{demande.responsabiliteStagiaire ? 'Oui' : 'Non'}</Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Durée de début:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{new Date(demande.dureedebut).toLocaleDateString()}</Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Durée de fin:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{new Date(demande.dureefin).toLocaleDateString()}</Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Etat de la Demande:</Typography>
                <Typography variant="body1" sx={{ ...styles.fieldValue, color: styles.statusColor(demande.etatDemande) }}>
                  {demande.etatDemande}
                </Typography>
              </Box>
              <Box sx={styles.field}>
                <Typography variant="h6" sx={styles.fieldLabel}>Département:</Typography>
                <Typography variant="body1" sx={styles.fieldValue}>{demande.departement?.nomDepartement || 'N/A'}</Typography>
              </Box>
              {user && (
                <Box sx={styles.field}>
                  <Typography variant="h6" sx={styles.fieldLabel}>Demandé par:</Typography>
                  <Typography variant="body1" sx={styles.fieldValue}>
                    {user.user.nom} {user.user.prenom}
                  </Typography>
                </Box>
              )}
              <Box sx={styles.field}>
              
                <Typography variant="h6" sx={styles.fieldLabel}>Fichiers:</Typography>
                <List sx={styles.fileList}>
                  {demande.fichiers?.map((fichier, index) => (
                    <ListItem key={index} sx={{ p: 0 }} button onClick={() => handleFileClick(fichier)}>
                      <ListItemText>
                        <Typography color="primary" sx={{ cursor: 'pointer' }}>
                          {fichier.split('/').pop()}
                        </Typography>
                      </ListItemText>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
            <Box sx={styles.buttonContainer}>
              <Button variant="contained" color="success" onClick={() => handleOpenDialog('Accepter')}>
                Accepter
              </Button>
              <Button variant="contained" color="error" onClick={() => handleOpenDialog('Refuser')}>
                Refuser
              </Button>
            </Box>
          </Box>
        )}
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>{`Confirmer ${dialogType === 'Accepter' ? 'l\'acceptation' : 'le refus'} de la demande`}</DialogTitle>
        <DialogContent>
          <Typography>
            Êtes-vous sûr de vouloir {dialogType === 'Accepter' ? 'accepter' : 'refuser'} cette demande ?
          </Typography>
          {dialogType === 'Accepter' && (
            <TextField
              margin="dense"
              label="Message"
              type="text"
              fullWidth
              variant="outlined"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Annuler
          </Button>
          <Button
            onClick={() => handleAction(dialogType)}
            color={dialogType === 'Accepter' ? 'success' : 'error'}
          >
            {dialogType === 'Accepter' ? 'Accepter' : 'Refuser'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default DemandeInfo;
