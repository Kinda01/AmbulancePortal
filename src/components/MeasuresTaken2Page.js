import React, { useState } from 'react';
import './MeasuresTaken2Page.css';

function MeasuresTaken2Page() {
  const [measures, setMeasures] = useState([
    { id: 1, text: 'Administer pain relief or sedatives if required.' },
    { id: 2, text: 'Establish intravenous access if needed for medication or fluids.' },
    { id: 3, text: 'Monitor vital signs continuously and prepare for transport.' },
    { id: 4, text: 'Prepare documentation and handover to the receiving medical team.' },
    { id: 5, text: 'Complete all patient details for further medical evaluation.' },
  ]);

  const handleInputChange = (id, newText) => {
    setMeasures(measures.map(measure => 
      measure.id === id ? { ...measure, text: newText } : measure
    ));
  };

  const handleAddMeasure = () => {
    setMeasures([
      ...measures,
      { id: Date.now(), text: '' },
    ]);
  };

  const handleRemoveMeasure = (id) => {
    setMeasures(measures.filter(measure => measure.id !== id));
  };

  return (
    <div className="measures-container">
      <h2>Second Measures Taken</h2>
      <p>This section includes any additional measures taken to manage the patient's condition after the secondary survey. You can edit the measures as needed.</p>
      
      <ul>
        {measures.map(measure => (
          <li key={measure.id} className="measure-item">
            <input
              type="text"
              value={measure.text}
              onChange={(e) => handleInputChange(measure.id, e.target.value)}
              className="measure-input"
            />
            <button onClick={() => handleRemoveMeasure(measure.id)} className="remove-button">Remove</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddMeasure} className="add-button">Add New Measure</button>
      <p>Ensure that all actions are documented and the patient is ready for transport to the hospital.</p>
    </div>
  );
}

export default MeasuresTaken2Page;
