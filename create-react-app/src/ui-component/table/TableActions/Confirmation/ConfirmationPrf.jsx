import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';
import axios from 'axios';

const Confirmation = ({ open, setOpen, params, deleteProfFromTable }) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        try {
            await axios.delete(`http://localhost:3001/api1/v1/professeurs/deleteOne/${params.row.id}`);
            
            handleClose();
        } catch (error) {
            console.error('Error deleting professor:', error);
        }
        deleteProfFromTable(params.row.id);
        handleClose();
    };

    return (
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Confirmer la suppression</DialogTitle>
            <DialogContent>
                <DialogContentText>Êtes-vous sûr de vouloir supprimer cet élément ?</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button onClick={handleConfirm} color="primary">Confirmer</Button>
            </DialogActions>
        </Dialog>
    );
}

export default Confirmation;
