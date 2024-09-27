import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Alert from '@mui/material/Alert';

function ChangePasswordForm({ open, onClose, userId }) {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    try {
      // Vérifier l'ancien mot de passe en utilisant l'API getUser
      const verifyResponse = await fetch(`http://localhost:3001/api/users/getUser/${userId}`);
      const user = await verifyResponse.json();
      console.log('User data:', user);

      if (verifyResponse.ok) {
        console.log('Old password:', oldPassword);
        console.log('Stored password:', user.user.password);

        if (user.user.password !== oldPassword) {
          setError('Ancien mot de passe incorrect');
          return;
        }
        console.log('New password to be sent:', newPassword);

        // Procéder à la mise à jour du mot de passe
        const response = await fetch(`http://localhost:3001/api/users/update-password/${userId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ password: newPassword })
        });

        const result = await response.json();
        console.log('Update password response:', result);

        if (response.ok) {
          setSuccess('Mot de passe changé avec succès');
          setError('');

          // Réinitialiser les champs du formulaire
          setOldPassword('');
          setNewPassword('');
          setConfirmPassword('');
        } else {
          setError(result.message || 'Erreur lors du changement de mot de passe');
        }
      } else {
        setError('Erreur lors de la récupération des informations utilisateur');
      }
    } catch (err) {
      setError('Erreur lors du changement de mot de passe');
      console.error('Error during password change:', err);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Changer le mot de passe</DialogTitle>
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <form onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Ancien mot de passe"
            type="password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Nouveau mot de passe"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Confirmer le mot de passe"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <DialogActions>
            <Button onClick={onClose}>Annuler</Button>
            <Button type="submit" color="primary">
              Changer le mot de passe
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ChangePasswordForm;
