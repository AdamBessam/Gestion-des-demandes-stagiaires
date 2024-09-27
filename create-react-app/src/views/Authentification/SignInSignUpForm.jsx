import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignInSignUpForm = () => {
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmailValue(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPasswordValue(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleClick = async (e) => {
    e.preventDefault(); // Evite la soumission multiple
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: emailValue,
          password: passwordValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Email ou mot de passe incorrect');
      }

      const data = await response.json();
      const { role, token,id } = data;
      console.log(data);

      // Stocker le token JWT et le rôle de l'utilisateur dans le sessionStorage
      sessionStorage.setItem('TOKEN', token);
      sessionStorage.setItem('USER_ROLE', role);
      sessionStorage.setItem('USER_ID', id);

      // Redirection en fonction du rôle de l'utilisateur
      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'moderator') {
        navigate('/Moderateur');
      }else if (role === 'employee') {
        navigate('/Employee');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Login Error:', error);
      setError(error.message);

      // Effacer le message d'erreur après 3 secondes
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  return (
    <section style={{ backgroundColor: 'hsl(0, 0%, 96%)', minHeight: '100vh' }}>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start">
        <div className="container">
          <div className="row gx-lg-5 align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0">
              <h1 className="my-2 display-3 fw-bold ls-tight text-primary" style={{ marginTop: '-20px' }}>
                Bienvenue <br />
              </h1>
              <span className="text" style={{ color: 'Black', fontSize: '1.2rem' }}>
                Bonjour, vous devez vous identifier pour accéder à votre compte
              </span>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0">
              <div className="card">
                <div className="card-body py-5 px-md-5">
                  <form onSubmit={handleClick}>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input
                        type="email"
                        id="form3Example3"
                        className="form-control"
                        placeholder="Email"
                        value={emailValue}
                        onChange={handleEmailChange}
                      />
                    </div>
                    <div className="form-outline position-relative mb-4">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        id="form3Example4"
                        className="form-control"
                        placeholder="Mot de passe"
                        value={passwordValue}
                        onChange={handlePasswordChange}
                      />
                      {passwordValue && (
                        <span
                          onClick={togglePasswordVisibility}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              togglePasswordVisibility();
                            }
                          }}
                          role="button"
                          tabIndex={0}
                          className="position-absolute top-50 translate-middle-y eye-icon"
                          style={{ cursor: 'pointer', right: '10px' }}
                        >
                          {showPassword ? <i className="bi bi-eye-slash"></i> : <i className="bi bi-eye"></i>}
                        </span>
                      )}
                    </div>
                    {error && (
                      <div
                        className="error-message"
                        style={{
                          backgroundColor: '#ffcccc',
                          padding: '10px',
                          borderRadius: '5px',
                          marginTop: '10px',
                          opacity: '1',
                          transition: 'opacity 0.5s ease',
                        }}
                      >
                        {error}
                      </div>
                    )}

                    <div className="text-center">
                      <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-block mb-4">
                        S identifier
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignInSignUpForm;
