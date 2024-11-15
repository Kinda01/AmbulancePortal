import React, { useState } from 'react';
import './AmbulanceDetailsPage.css'; // Ensure the correct CSS is imported
import PrimarySurveyPage from './PrimarySurveyPage';  
import MeasuresTakenPage from './MeasuresTakenPage';  
import SecondarySurveyPage from './SecondarySurveyPage';  
import MeasuresTaken2Page from './MeasuresTaken2Page';  

function AmbulanceDetailsPage() {
  const [activeContent, setActiveContent] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleButtonClick = (content) => {
    setLoading(true); // Set loading state to true
    setActiveContent(content);
    setTimeout(() => {
      setLoading(false); // Set loading state to false after the content loads
    }, 500); // Simulate loading time (you can adjust this)
  };

  return (
    <div className="ambulance-details-container">
      <h2>Ambulance Details</h2>
      
      {/* Buttons to switch between content */}
      <div className="button-container">
        <button className="button" onClick={() => handleButtonClick('primarySurvey')}>Primary Survey</button>
        <button className="button" onClick={() => handleButtonClick('measuresTaken')}>Measures Taken</button>
        <button className="button" onClick={() => handleButtonClick('secondarySurvey')}>Secondary Survey</button>
        <button className="button" onClick={() => handleButtonClick('measuresTaken2')}>Second Measures Taken</button>
      </div>

      {/* Content display area */}
      <div className="content">
        {loading ? (
          <div className="loading">Loading...</div> // Display loading state
        ) : (
          <>
            {activeContent === 'primarySurvey' && (
              <iframe 
                src="/AmbulanceDetails.html"  // Path to your HTML file in the public directory
                title="Primary Survey"
                width="100%"
                height="600px"
                style={{border: 'none'}}
              />
            )}
            {activeContent === 'measuresTaken' && <MeasuresTakenPage />}
            {activeContent === 'secondarySurvey' && <SecondarySurveyPage />}
            {activeContent === 'measuresTaken2' && <MeasuresTaken2Page />}
          </>
        )}
      </div>
    </div>
  );
}

export default AmbulanceDetailsPage;
 