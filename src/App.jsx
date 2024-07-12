import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './components/Auth/Login';
import Blogg from './pages/cblog';
import Signup from './components/Auth/Signup';
import Navbar from './components/Common/Navbar';
import Footer from './components/Common/Footer';
import Splash from './pages/splash';
import { getCurrentUser } from './utils/authentic';

const App = () => {
  const currentUser = getCurrentUser();

  return (
    <Router>
      <Routes>
        <Route path="/" element={
          currentUser ? (
            <>
              <Navbar />
              <div className="main-content">
                <Home />
              </div>
              <Footer />
            </>
          ) : (
            <Navigate to="/splash" replace />
          )
        } />
        <Route path="/Splash" element={
          currentUser ? (
            <Navigate to="/" replace />
          ) : (
            <Splash />
          )
        } />
        <Route path="/login" element={
          currentUser ? (
            <Navigate to="/" replace />
          ) : (
            <>
              <Navbar />
              <div className="main-content">
                <Login />
              </div>
              <Footer />
            </>
          )
        } />
        <Route path="/signup" element={
          currentUser ? (
            <Navigate to="/" replace />
          ) : (
            <>
              <Navbar />
              <div className="main-content">
                <Signup />
              </div>
              <Footer />
            </>
          )
        } />
        <Route path="/newblog" element={
          currentUser ? (
            <>
              <Navbar />
              <div className="main-content">
                <Blogg />
              </div>
              <Footer />
            </>
          ) : (
            <Navigate to="/splash" replace />
          )
        } />
      </Routes>
    </Router>
  );
};

export default App;