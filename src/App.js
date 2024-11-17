import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import logoImage from './assets/NETDOC.jpg'; // Ensure this path is correct
import ProtectedRoute from './components/ProtectedRoute';
import CallCentrePage from './components/CallCentrePage';
import AmbulanceDetailsPage from './components/AmbulanceDetailsPage';
import PatientInformationPage from './components/PatientInformationPage';
import AmbulanceJournalPage from './components/AmbulanceJournalPage'; // Assuming you have this component
import Admin from './components/admin'; // Import the Admin component

// Other page components
function Home() {
  return (
    <div>
      <h2>Welcome to the Ambulance Portal</h2>
      <p>Your health, our priority</p>
      <section id="hero">
        <h3>Your health, our priority</h3>
        <p>Quick and reliable ambulance services are just a few clicks away. Use this portal to request an ambulance and access patient details.</p>
      </section>
      <section id="features">
        <h3>Features</h3>
        <ul>
          <li>Emergency ambulance request system</li>
          <li>Secure user authentication</li>
          <li>Access patient details</li>
        </ul>
      </section>
    </div>
  );
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
            <li><Link to="/call-centre">Call Centre</Link></li>
            <li><Link to="/AmbulanceDetails">Ambulance Details</Link></li>
            <li><Link to="/patient-information">Patient Information</Link></li>
            <li><Link to="/ambulance-journal">Ambulance Journal</Link></li> {/* Added Ambulance Journal */}
            <li><Link to="/admin">Admin</Link></li>
          </ul>
        </nav>

        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/call-centre"
              element={
                <ProtectedRoute>
                  <CallCentrePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/AmbulanceDetails"
              element={
                <ProtectedRoute>
                  <AmbulanceDetailsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/patient-information"
              element={
                <ProtectedRoute>
                  <PatientInformationPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/ambulance-journal" // Route for the Ambulance Journal
              element={
                <ProtectedRoute>
                  <AmbulanceJournalPage /> {/* Ensure you have this component */}
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <Admin />  {/* Admin page */}
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
