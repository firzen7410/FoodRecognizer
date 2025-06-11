import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Header from './component/Header';
import Footer from './component/Footer';
import LoginPage from './component/LoginPage';
import RegisterPage from './component/RegisterPage';
import HomePage from './component/HomePage';
import FoodRecognizer from './component/FoodRecognizer';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/foodRecognizer" element={<FoodRecognizer />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;