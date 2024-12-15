import { StrictMode } from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { CustomProvider } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { AuthProvider } from './contexts/AuthContext'; // Provedor de Autenticação
import PrivateRoute from './components/PrivateRoute/PrivateRoute'; // Componente de Rota Protegida

// Páginas
import Sobre from './pages/Sobre/Sobre';
import Home from './pages/home/index';
import Login from './pages/login/login';
import Signup from './pages/signup/signup';
import ForgotPassword from './pages/forgotpassword/forgotpassword';
import ProfileSignup from './pages/profilesignup/profilesignup';
import Profile from './pages/profile/profile';

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <CustomProvider theme="light">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path='/' element={<Sobre />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile-signup" element={<ProfileSignup />} />
            {/* Rota protegida */}
            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </CustomProvider>

  </StrictMode>
);
