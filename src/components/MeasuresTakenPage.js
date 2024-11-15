import React, { useState } from 'react';


function MeasuresTakenPage() {
  const [measures, setMeasures] = useState([
    { id: 1, text: 'Administer oxygen if needed.' },
    { id: 2, text: 'Control bleeding using pressure or a tourniquet.' },
    { id: 3, text: 'Splint fractures if necessary.' },
    { id: 4, text: 'Monitor vital signs.' },
    { id: 5, text: 'Prepare for transport to a medical facility.' },
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
      <h2>Measures Taken</h2>
      <p>This section outlines the actions taken to stabilize the patient after the primary survey. You can edit the measures as needed.</p>
      
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
      <p>Document all measures taken and continue to monitor the patient's condition.</p>
    </div>
  );
}

export default MeasuresTakenPage;
