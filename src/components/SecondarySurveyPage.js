import React from 'react';
import './SecondarySurveyPage.css';

function AmbulanceDetails() {
    return (
        <div className="container">
            <div className="header">Secondary Examination</div>

            <table className="details-table">
                <thead>
                    <tr>
                        <th>Parameter</th>
                        <th>Measurement</th>
                        <th>Status</th>
                        <th>Timestamp</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>B - Breathing</td>
                        <td>Respiratory Rate: 18 breaths/min</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:51</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>SaO2: 98%</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:51</td>
                    </tr>
                    <tr>
                        <td>C - Circulation</td>
                        <td>Pulse: 60 bpm</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:49</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Diastolic: 65 mmHg</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:52</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>Systolic: 160 mmHg</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:52</td>
                    </tr>
                    <tr>
                        <td>D - Neurology</td>
                        <td>RLS: 1</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:51</td>
                    </tr>
                    <tr>
                        <td>E - Body Inspection</td>
                        <td>Temperature: 36.7°C</td>
                        <td><span className="status green">GREEN</span></td>
                        <td>RKEK01 19:51</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default AmbulanceDetails;
