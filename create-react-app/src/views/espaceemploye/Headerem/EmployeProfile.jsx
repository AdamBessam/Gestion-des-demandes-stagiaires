import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetch } from 'hooks/useFetch';
import User1 from 'assets/images/users/user-round.svg';
import ChangePasswordForm from 'views/Profil/updatepassword';
import Button from '@mui/material/Button'; // Importez le composant Button

function ProfileUser() {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [showChangePasswordForm, setShowChangePasswordForm] = useState(false);
  const { data, loading, error } = useFetch(`http://localhost:3001/api/users/getUser/${id}`);

  useEffect(() => {
    if (data) {
      setUser(data.user);
    }
  }, [data]);

  if (loading) {
    return <p>Loading ...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <>
      {user && (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' }}>
          {/* Cover Header */}
          <div
            style={{
              backgroundColor: '#2d71a1',
              color: '#fff',
              padding: '20px',
              borderTopLeftRadius: '10px',
              borderTopRightRadius: '10px',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            {/* Image */}
            <div style={{ marginRight: '20px' }}>
              <img
                src={User1}
                alt="Profile"
                style={{
                  width: '100px',
                  height: '100px',
                  borderRadius: '50%',
                  border: '5px solid white',
                  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.3)'
                }}
              />
            </div>
            {/* User's Name */}
            <div>
              <h1 style={{ color: 'white' }}>
                {user.nom} {user.prenom}
              </h1>
              <h3 style={{ color: 'white' }}>Profil</h3>
            </div>
          </div>
          {/* Information */}
          <div style={{ marginTop: '20px', color: '#333' }}>
            <div
              style={{
                marginBottom: '20px',
                padding: '20px',
                backgroundColor: '#f9f9f9',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
              }}
            >
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
                <div>
                  <h4 style={{ fontWeight: 'bold' }}>Email :</h4>
                  <p>{user.email}</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold' }}>Role:</h3>
                  <p>{user.role}</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold' }}>CIN:</h3>
                  <p>{user.CIN}</p>
                </div>
                <div>
                  <h3 style={{ fontWeight: 'bold' }}>Adresse:</h3>
                  <p>{user.Adresse}</p>
                </div>
                {user.departement && (
                  <div>
                    <h3 style={{ fontWeight: 'bold' }}>Département:</h3>
                    <p>{user.departement.nomDepartement}</p>
                  </div>
                )}
                <div>
                  <Button onClick={() => setShowChangePasswordForm(true)} variant="outlined" color="primary">
                    Changer le mot de passe
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <ChangePasswordForm open={showChangePasswordForm} onClose={() => setShowChangePasswordForm(false)} userId={id} />
        </div>
      )}
    </>
  );
}

export default ProfileUser;
