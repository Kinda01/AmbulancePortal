import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logoImage from './assets/NETDOC.jpg';
import RegisterPage from './components/RegisterPage';
import LoginPage from './components/LoginPage';
import ProtectedRoute from './components/ProtectedRoute';
import DispatcherInfoPage from './components/DispatcherInfoPage';

function Home() {
  return (
    <div>
      <h2>Welcome to the Ambulance Portal</h2>
      <p>Your health, our priority</p>
    </div>
  );
}

function RequestAmbulancePage() {
  return <div><h2>Request Ambulance Page</h2></div>;
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <div className="logo-container">
            <img src={logoImage} alt="Logo" className="logo-image" />
            <h2>Ambulance Portal</h2>
          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
            <li><Link to="/dispatcher-info">Dispatcher Information</Link></li>
            <li><Link to="/request-ambulance">Request Ambulance</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/dispatcher-info"
              element={
                <ProtectedRoute>
                  <DispatcherInfoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/request-ambulance"
              element={
                <ProtectedRoute>
                  <RequestAmbulancePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>

        <footer>
          <p>&copy; 2024 Ambulance Portal. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
