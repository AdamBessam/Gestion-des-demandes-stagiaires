import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import NavigationScroll from 'layout/NavigationScroll';
import themes from 'themes';
import SignInSignUpForm from 'views/Authentification/SignInSignUpForm';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'icofont/dist/icofont.min.css';
import MainLayout from 'layout/MainLayout';
import Dashboard from 'views/dashboard/Default';
import ProfileUser from 'views/Profil/ProfileUser';
import DemandeDepartment from 'views/dashboard/Default/Demandedepartement';
import Demandes from 'views/Demandes/demandes';
import About from 'views/About/About';
import Employes from 'views/Semestres/Employe/employe';
import Espaceemploye from 'views/espaceemploye/profilemploye';
import EmployeProfil from 'views/espaceemploye/Headerem/EmployeProfile';
import FormDemande from 'views/espaceemploye/Demande/AjouterDemande';
import EspaceModerateur from 'views/espaceModerateur/ProfileModerateur';
import ModerateurProfil from 'views/espaceModerateur/HeaderMode/ModerateurProfil';
import DemandeInfo from 'views/espaceModerateur/GérerDemande/gererDemande';
import DetailDemande from 'views/dashboard/Default/DetailsDemande';
import Demande from 'views/Demandes/detaildemande';
import Stagiaire from 'views/Stagaires/stagaires';

const App = () => {
  const customization = useSelector((state) => state.customization);
  const location = useLocation();
  const token = sessionStorage.getItem('TOKEN');
  const userRole = sessionStorage.getItem('USER_ROLE');
  const userID = sessionStorage.getItem('USER_ID');
  console.log(userID);
  const isAuthenticated = token && userRole && userID;
  const isAdmin = userRole === 'admin';
  const isModerator = userRole === 'moderator';
  const isEmployee = userRole === 'employee';
  console.log(isAuthenticated + ' ' + isEmployee);

  const clearSessionStorage = () => {
    sessionStorage.removeItem('TOKEN');
    sessionStorage.removeItem('USER_ROLE');
    sessionStorage.removeItem('USER_ID');
  };

  if (location.pathname === '/' && isAuthenticated) {
    clearSessionStorage();
  }

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes(customization)}>
        <CssBaseline />
        <NavigationScroll>
          <Routes>
            <Route path="/" element={<SignInSignUpForm />} />
            {isAuthenticated && isAdmin && (
              <Route path="/admin" element={<MainLayout />}>
                <Route path="profile/:id" element={<ProfileUser />}/>
                <Route index element={<Dashboard />} />
                <Route path="departments/:departmentId" element={<DemandeDepartment />}>
                  <Route path="demande/:requestId" element={<DetailDemande />} />
                </Route>
                <Route path="Employé" element={<Employes />} />
                <Route path="stagiaire" element={<Stagiaire />} />
                <Route path="Demandes" element={<Demandes />}>
                  <Route path=":demandeId" element={<Demande />} />
                </Route>
                <Route path="About" element={<About />} />
              </Route>
            )}
            {isAuthenticated && isModerator && (
              <Route path="/Moderateur" element={<EspaceModerateur />}>
                <Route path="profile/:id" element={<ModerateurProfil />} />
                <Route path="DemandeInfo/:id" element={<DemandeInfo />} />
              </Route>
            )}
            {isAuthenticated && isEmployee && (
              <Route path="/Employee" element={<Espaceemploye />}>
                <Route path="profile/:id" element={<EmployeProfil />} />
                <Route path=":id/Ajouter" element={<FormDemande />} />
              </Route>
            )}
            <Route
              path="*"
              element={
                <Navigate
                  to={isAuthenticated ? (isAdmin ? '/admin' : isModerator ? '/Moderateur' : isEmployee ? '/Employee' : '/') : '/'}
                  replace
                />
              }
            />
          </Routes>
        </NavigationScroll>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
