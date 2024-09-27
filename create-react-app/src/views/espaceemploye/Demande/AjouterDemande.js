import React, { useState, useEffect } from 'react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Container, Typography, Grid, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

const FormDemande = () => {
  const userID = sessionStorage.getItem('USER_ID');
  const location = useLocation();
  const demandeToEdit = location.state?.demande || null;
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    email: '',
    dureedebut: '',
    dureefin: '',
    responsabiliteStagiaire: false,
    etatDemande: 'en attente',
    departement: '',
    user: userID || '',
    fichiers: [] // Ensure files is always an array
  });

  const [departments, setDepartments] = useState([]);
  const [newFiles, setNewFiles] = useState([]);
  const [filesToDelete, setFilesToDelete] = useState([]);

  // Fetch departments from the API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/department/getDepartements');
        const data = await response.json();
        setDepartments(data);
      } catch (error) {
        console.error('Erreur lors de la récupération des départements:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Initialize form data for editing a demande
  useEffect(() => {
    if (demandeToEdit) {
      setFormData({
        nom: demandeToEdit.nom || '',
        prenom: demandeToEdit.prenom || '',
        email: demandeToEdit.email || '',
        dureedebut: demandeToEdit.dureedebut ? demandeToEdit.dureedebut.split('T')[0] : '',
        dureefin: demandeToEdit.dureefin ? demandeToEdit.dureefin.split('T')[0] : '',
        responsabiliteStagiaire: demandeToEdit.responsabiliteStagiaire || false,
        etatDemande: demandeToEdit.etatDemande || 'en attente',
        departement: demandeToEdit.departement.nomDepartement || '',
        user: demandeToEdit.user?._id || userID,
        fichiers: demandeToEdit.fichiers || [] // Ensure fichiers is an array
      });
      setNewFiles([]); // Clear new files when editing existing demande
      setFilesToDelete([]); // Clear files to delete list when editing
    }
  }, [demandeToEdit, userID]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle file input changes
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setNewFiles([...newFiles, ...files]);
  };

  // Remove file from new files list
  const handleRemoveFile = (file) => {
    setNewFiles(newFiles.filter((f) => f !== file));
  };

  // Remove existing file and mark it for deletion
  const handleRemoveExistingFile = (fileURL) => {
    setFilesToDelete([...filesToDelete, fileURL]);
    setFormData({
      ...formData,
      fichiers: formData.fichiers.filter((file) => file !== fileURL)
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem('TOKEN');
    const formDataToSend = new FormData();
    
    Object.keys(formData).forEach(key => {
      formDataToSend.append(key, formData[key]);
    });

    newFiles.forEach(file => formDataToSend.append('fichiers', file));
    
    // Append files to delete
    filesToDelete.forEach(file => formDataToSend.append('filesToDelete', file));

    const requestOptions = {
      method: demandeToEdit ? 'PUT' : 'POST',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formDataToSend
    };

    const url = demandeToEdit
      ? `http://localhost:3001/api/demandes/updateDemande/${demandeToEdit._id}`
      : 'http://localhost:3001/api/demandes/createDemande';

    try {
      const response = await fetch(url, requestOptions);
      const data = await response.json();
      console.log('Réponse du serveur:', data);
       handleRetourClick();
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande:', error);
    }
  };

  // Handle the "Retour" button click
  const handleRetourClick = () => {
    navigate('/Employee');
    // setTimeout(() => {
    //   window.location.reload();
    // }, 100);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleRetourClick}>
          Retour
        </Button>
        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h2" sx={{ textAlign: 'center' }}>
            {demandeToEdit ? 'Modifier Demande' : 'Ajouter Demande'}
          </Typography>
        </Box>
      </Box>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField label="Nom" name="nom" value={formData.nom} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField label="Prénom" name="prenom" value={formData.prenom} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Email" name="email" value={formData.email} onChange={handleChange} fullWidth required />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date de début"
              name="dureedebut"
              type="date"
              value={formData.dureedebut}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Date de fin"
              name="dureefin"
              type="date"
              value={formData.dureefin}
              onChange={handleChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Département</InputLabel>
              <Select name="departement" value={formData.departement} onChange={handleChange} required>
                {departments.map((department) => (
                  <MenuItem key={department._id} value={department.nomDepartement}>
                    {department.nomDepartement}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel>Responsabilité Stagiaire</InputLabel>
              <Select name="responsabiliteStagiaire" value={formData.responsabiliteStagiaire} onChange={handleChange} required>
                <MenuItem value={true}>Oui</MenuItem>
                <MenuItem value={false}>Non</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <input accept="application/pdf" name="fichiers" type="file" multiple onChange={handleFileChange} />
            <Box mt={2}>
              {formData.fichiers.length > 0 && (
                <Box mb={2}>
                  <Typography variant="h6">Fichiers existants:</Typography>
                  <ul>
                    {formData.fichiers.map((file, index) => (
                      <li key={index}>
                        <a href={`http://localhost:3001/fichiers/${file}`}  target="_blank" rel="noopener noreferrer">{file}</a>
                        <Button variant="outlined" color="error" onClick={() => handleRemoveExistingFile(file)}>
                          Supprimer
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
              {newFiles.length > 0 && (
                <Box>
                  <Typography variant="h6">Fichiers à ajouter:</Typography>
                  <ul>
                    {newFiles.map((file, index) => (
                      <li key={index}>
                        {file.name}
                        <Button variant="outlined" color="error" onClick={() => handleRemoveFile(file)}>
                          Supprimer
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Box>
              )}
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button variant="contained" color="primary" type="submit">
                {demandeToEdit ? 'Modifier' : 'Ajouter'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default FormDemande;
