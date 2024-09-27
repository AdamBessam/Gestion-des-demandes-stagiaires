import React, { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import CloseIcon from '@mui/icons-material/Close';
import FormEmploye from './formeajouteremploye';

function Employes() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api/users/getUsers', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des utilisateurs');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs:', error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const showUserForm = () => {
    setShowForm(true);
  };

  const closeUserForm = () => {
    setShowForm(false);
    setUserToEdit(null);
  };

  const showEditForm = (user) => {
    setUserToEdit(user);
    setShowForm(true);
  };

  const addUser = async (user) => {
    const userToAdd = {
      ...user
    };
    console.log('ok', userToAdd);

    try {
      const token = sessionStorage.getItem('TOKEN');

      const response = await fetch('http://localhost:3001/api/users/createUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userToAdd)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'ajout de l'utilisateur");
      }

      const data = await response.json();
      console.log('Utilisateur ajouté avec succès:', data);
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'utilisateur:", error);
    }
    fetchUsers();
  };

  const confirmDeleteUser = (userId) => {
    setUserToDelete(userId);
    setConfirmationDialogOpen(true);
  };

  const handleDeleteUser = async () => {
    const token = localStorage.getItem('TOKEN');

    try {
      const response = await fetch(`http://localhost:3001/api/users/deleteUser/${userToDelete}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'utilisateur");
      }
      console.log('Utilisateur supprimé avec succès');
      closeUserForm();
      fetchUsers();
    } catch (error) {
      console.error("Erreur lors de la suppression de l'utilisateur:", error);
    }
    setConfirmationDialogOpen(false);
    setUserToDelete(null);
  };

  const editUser = async (userToEdit) => {
    try {
      const userEdited = {
        ...userToEdit
      };

      const token = localStorage.getItem('TOKEN');

      const response = await fetch(`http://localhost:3001/api/users/updateUser/${userToEdit._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(userEdited)
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la modification de l'utilisateur");
      }

      const data = await response.json();
      console.log('Utilisateur modifié avec succès:', data);
    } catch (error) {
      console.error("Erreur lors de la modification de l'utilisateur:", error);
    }
    fetchUsers();
  };

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Nom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Prénom
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Email
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Departement
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Rôle
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users
              .filter((user) => user.role !== 'admin')
              .map((user, index) => (
                <tr
                  key={index}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{user.nom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.prenom}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.departement.nomDepartement}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === 'moderator' ? 'Modérateur' : user.role === 'employee' ? 'Employé' : 'Non défini'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => showEditForm(user)} className="text-blue-600 hover:underline">
                      Modifier
                    </button>
                    <button onClick={() => confirmDeleteUser(user._id)} className="text-red-600 hover:underline ml-4">
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <Dialog open={showForm} onClose={closeUserForm}>
          <div className="flex justify-between items-center">
            <DialogTitle sx={{ fontSize: '16px', color: 'black' }}>
              {userToEdit ? "CGabdel'utilisatCour" : 'Ajouter un utilisateur'}
            </DialogTitle>
            <Button sx={{ color: 'red' }} onClick={closeUserForm}>
              <CloseIcon />
            </Button>
          </div>
          <DialogContent>
            <FormEmploye onClose={closeUserForm} ajouterEmploye={addUser} modifierEmploye={editUser} employeAmodifier={userToEdit} supprimerEmploye={confirmDeleteUser} />
          </DialogContent>
        </Dialog>
        <Dialog open={confirmationDialogOpen} onClose={() => setConfirmationDialogOpen(false)}>
          <DialogTitle>Confirmer la suppression</DialogTitle>
          <DialogContent>
            <DialogContentText>Voulez-vous vraiment supprimer cet utilisateur ?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setConfirmationDialogOpen(false)} color="primary">
              Annuler
            </Button>
            <Button onClick={handleDeleteUser} color="primary" autoFocus>
              Supprimer
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div className="flex justify-center mt-4 space-x-8">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={showUserForm}>
          <strong>Ajouter</strong>
        </button>
      </div>
    </>
  );
}

export default Employes;
