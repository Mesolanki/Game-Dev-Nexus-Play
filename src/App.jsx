import React from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from './components/user/Login';
import Signup from './components/user/SignUp';
import LoginSuccess from './components/user/LoginSucess';
import ForgotPassword from './components/user/ForgotPassword';
import ResetPassword from './components/user/ResetPassword';
import VerifyOTP from './components/user/VerifyOtp';
import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home';
import Footer from './components/Footer';

import AdminAddGame from './pages/AdminAddGame';
import GoogleCallback from './components/user/GoogleCallback';
import Admin from './Admin';
import Community from './pages/Community';


const App = () => {
  const isAuthenticated = !!localStorage.getItem('token');


  const PrivateRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
  };

  const PublicRoutes = () => {
    const isAuthenticated = !!localStorage.getItem('token');
    return !isAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
  };
  return (
    <>
      <Navbar />
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/" element={<Home />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/google-callback" element={<GoogleCallback />} />

        </Route>

        <Route element={<PrivateRoutes />}>
          <Route path='/community' element={<Community />} />
          <Route path="/login-success" element={<LoginSuccess />} />
        </Route>

        <Route path="*" element={<Navigate to={!!localStorage.getItem('token') ? "/" : "/login"} replace />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App;