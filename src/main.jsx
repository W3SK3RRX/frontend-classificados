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
import VerificarAssinatura from './pages/Verifica-assinatura/verifica_assinatura';
import Planos from './pages/planos/planos';
import Payment from './pages/payments/payments';
import ForgotPassword from './pages/forgotpassword/forgotpassword';
import ProfileSignup from './pages/profilesignup/profilesignup';
import Myprofile from './pages/myprofile/Myprofile';
import Profile from './pages/profile/profile';
import SearchFilters from './pages/searchfilters/search';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CustomProvider theme="light">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Sobre />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Rota protegida para Home */}
            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />

            {/* Rota protegida para busca avançada */}
            <Route
              path="/SearchFilters"
              element={
                <PrivateRoute>
                  <SearchFilters />
                </PrivateRoute>
              }
            />

            {/* Rota protegida para verificar assinatura */}
            <Route
              path="/verificar-assinatura"
              element={
                <PrivateRoute>
                  <VerificarAssinatura />
                </PrivateRoute>
              }
            />

            {/* Rota protegida para exibir os planos */}
            <Route
              path="/planos"
              element={
                <PrivateRoute>
                  <Planos />
                </PrivateRoute>
              }
            />

            {/* Rota protegida para pagamentos */}
            <Route
              path="/pagamento"
              element={
                <PrivateRoute>
                  <Payment />
                </PrivateRoute>
              }
            />

            {/* Rota protegida para cadastrar perfil profissional */}
            <Route
              path="/criar-perfil"
              element={
                <PrivateRoute>
                  <ProfileSignup />
                </PrivateRoute>
              }
            />

            {/* Rotas protegidas para perfis */}
            <Route
              path="/profile/:id"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              path="/my_profile/:id"
              element={
                <PrivateRoute>
                  <Myprofile />
                </PrivateRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </CustomProvider>
  </StrictMode>
);
