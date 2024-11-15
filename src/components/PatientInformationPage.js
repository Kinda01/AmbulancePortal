import React, { useState } from 'react'; 
import './PatientInformationPage.css';

const PatientInformationPage = () => {
  const [pulseStatus, setPulseStatus] = useState('Normal');
  const [respRateStatus, setRespRateStatus] = useState('Normal');
  const [tempStatus, setTempStatus] = useState('Normal');
  const [sao2Status, setSao2Status] = useState('Normal');
  const [bpStatus, setBpStatus] = useState('Normal');
  const [measures, setMeasures] = useState(['']);

  // State for medical history
  const [medicalHistory, setMedicalHistory] = useState({
    previouslyHealthy: 'No',
    previousStroke: 'No',
    oacTreatment: 'No',
    diabetes: 'No',
    chronicKidneyDisease: 'No',
    heartFailure: 'No',
    asthma: 'No', // Add more medical history items if needed
    hypertension: 'No',
  });

  const addMeasure = () => {
    setMeasures([...measures, '']);
  };

  const handleMeasureChange = (index, event) => {
    const newMeasures = [...measures];
    newMeasures[index] = event.target.value;
    setMeasures(newMeasures);
  };

  const getStatusColor = (status) => {
    if (status === 'Normal') return 'green';
    if (status === 'Warning') return 'yellow';
    if (status === 'Critical') return 'red';
    return 'grey';
  };

  // Handle medical history changes
  const handleMedicalHistoryChange = (field, value) => {
    setMedicalHistory((prevHistory) => {
      if (field === 'previousStroke' && value === 'Yes') {
        return {
          ...prevHistory,
          previousStroke: 'Yes',
          previouslyHealthy: 'No',
          oacTreatment: 'No',
          diabetes: 'No',
          chronicKidneyDisease: 'No',
          heartFailure: 'No',
        };
      }
      return { ...prevHistory, [field]: value };
    });
  };

  return (
    <div className="patient-info-container">
      <h1>Patient Information</h1>

      <div className="info-grid">
        {/* Vital Signs Section */}
        <div className="section" id="vitalSignsSection">
          <h2>Vital Signs</h2>
          <table>
            <tbody>
              <tr>
                <td>Pulse</td>
                <td>60 beats/minute</td>
                <td>
                  <button style={{ backgroundColor: getStatusColor(pulseStatus) }}>
                    Status: {pulseStatus}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Respiratory Rate</td>
                <td>18 breaths/minute</td>
                <td>
                  <button style={{ backgroundColor: getStatusColor(respRateStatus) }}>
                    Status: {respRateStatus}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Temperature</td>
                <td>36.7 °C</td>
                <td>
                  <button style={{ backgroundColor: getStatusColor(tempStatus) }}>
                    Status: {tempStatus}
                  </button>
                </td>
              </tr>
              <tr>
                <td>SaO2</td>
                <td>98%</td>
                <td>
                  <button style={{ backgroundColor: getStatusColor(sao2Status) }}>
                    Status: {sao2Status}
                  </button>
                </td>
              </tr>
              <tr>
                <td>Blood Pressure</td>
                <td>160 mm Hg Syst / 65 mm Hg Diast</td>
                <td>
                  <button style={{ backgroundColor: getStatusColor(bpStatus) }}>
                    Status: {bpStatus}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Medical History Section */}
        <div className="section" id="medicalHistorySection">
          <h2>Medical History</h2>
          <form className="medical-history-form">
            <label>Previously Healthy:</label>
            <input
              type="radio"
              name="previouslyHealthy"
              value="Yes"
              checked={medicalHistory.previouslyHealthy === 'Yes'}
              onChange={() => handleMedicalHistoryChange('previouslyHealthy', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="previouslyHealthy"
              value="No"
              checked={medicalHistory.previouslyHealthy === 'No'}
              onChange={() => handleMedicalHistoryChange('previouslyHealthy', 'No')}
            /> No
            <br />

            <label>Previous Stroke:</label>
            <input
              type="radio"
              name="previousStroke"
              value="Yes"
              checked={medicalHistory.previousStroke === 'Yes'}
              onChange={() => handleMedicalHistoryChange('previousStroke', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="previousStroke"
              value="No"
              checked={medicalHistory.previousStroke === 'No'}
              onChange={() => handleMedicalHistoryChange('previousStroke', 'No')}
            /> No
            <br />

            <label>OAC Treatment:</label>
            <input
              type="radio"
              name="oacTreatment"
              value="Yes"
              checked={medicalHistory.oacTreatment === 'Yes'}
              onChange={() => handleMedicalHistoryChange('oacTreatment', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="oacTreatment"
              value="No"
              checked={medicalHistory.oacTreatment === 'No'}
              onChange={() => handleMedicalHistoryChange('oacTreatment', 'No')}
            /> No
            <br />

            <label>Diabetes:</label>
            <input
              type="radio"
              name="diabetes"
              value="Yes"
              checked={medicalHistory.diabetes === 'Yes'}
              onChange={() => handleMedicalHistoryChange('diabetes', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="diabetes"
              value="No"
              checked={medicalHistory.diabetes === 'No'}
              onChange={() => handleMedicalHistoryChange('diabetes', 'No')}
            /> No
            <br />

            <label>Chronic Kidney Disease:</label>
            <input
              type="radio"
              name="chronicKidneyDisease"
              value="Yes"
              checked={medicalHistory.chronicKidneyDisease === 'Yes'}
              onChange={() => handleMedicalHistoryChange('chronicKidneyDisease', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="chronicKidneyDisease"
              value="No"
              checked={medicalHistory.chronicKidneyDisease === 'No'}
              onChange={() => handleMedicalHistoryChange('chronicKidneyDisease', 'No')}
            /> No
            <br />

            <label>Heart Failure:</label>
            <input
              type="radio"
              name="heartFailure"
              value="Yes"
              checked={medicalHistory.heartFailure === 'Yes'}
              onChange={() => handleMedicalHistoryChange('heartFailure', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="heartFailure"
              value="No"
              checked={medicalHistory.heartFailure === 'No'}
              onChange={() => handleMedicalHistoryChange('heartFailure', 'No')}
            /> No
            <br />

            <label>Asthma:</label>
            <input
              type="radio"
              name="asthma"
              value="Yes"
              checked={medicalHistory.asthma === 'Yes'}
              onChange={() => handleMedicalHistoryChange('asthma', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="asthma"
              value="No"
              checked={medicalHistory.asthma === 'No'}
              onChange={() => handleMedicalHistoryChange('asthma', 'No')}
            /> No
            <br />

            <label>Hypertension:</label>
            <input
              type="radio"
              name="hypertension"
              value="Yes"
              checked={medicalHistory.hypertension === 'Yes'}
              onChange={() => handleMedicalHistoryChange('hypertension', 'Yes')}
            /> Yes
            <input
              type="radio"
              name="hypertension"
              value="No"
              checked={medicalHistory.hypertension === 'No'}
              onChange={() => handleMedicalHistoryChange('hypertension', 'No')}
            /> No
            <br />
          </form>
        </div>

        {/* Secondary Survey Section */}
        <div className="section" id="secondarySurveySection">
          <h2>Secondary Survey</h2>
          <table>
            <tbody>
              <tr>
                <td>Breathing - Respiratory Rate</td>
                <td>18 breaths/minute</td>
                <td><button className="status-button">Normal</button></td>
                <td><textarea placeholder="Doctor's comments"></textarea></td>
              </tr>
              <tr>
                <td>Circulation - Blood Pressure</td>
                <td>160 mm Hg Syst / 65 mm Hg Diast</td>
                <td><button className="status-button">Critical</button></td>
                <td><textarea placeholder="Doctor's comments"></textarea></td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Measures Section */}
        <div className="section" id="measuresSection">
          <h2>Measures</h2>
          <button onClick={addMeasure}>Add Measure</button>
          {measures.map((measure, index) => (
            <input
              key={index}
              type="text"
              value={measure}
              onChange={(event) => handleMeasureChange(index, event)}
              placeholder="Enter measure"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PatientInformationPage;
