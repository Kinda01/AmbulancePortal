// components/CallCentrePage.js
import React from 'react';

function CallCentrePage() {
  return (
    <div>
      <h2>Call Centre</h2>
      {/* Use process.env.PUBLIC_URL to dynamically reference the public folder */}
      <iframe 
        src={`${process.env.PUBLIC_URL}/call centre.html`} 
        title="Call Centre" 
        width="100%" 
        height="600px" 
      />
    </div>
  );
}

export default CallCentrePage;
