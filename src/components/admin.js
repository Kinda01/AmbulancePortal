import React, { useState } from 'react';
import './admin.css';

function Admin() {
  const [requests, setRequests] = useState([
    { id: 1, name: 'John Doe', location: 'Meru', emergency: 'High', status: 'In Progress', ambulanceAssigned: 'AMB-101', timestamps: [], distance: 20, fuelConsumption: 8, nurseReport: 'Patient was stable. Administered first aid and took vital signs.' },
    { id: 2, name: 'Jane Smith', location: 'Nairobi', emergency: 'Medium', status: 'Pending', ambulanceAssigned: '', timestamps: [], distance: 35, fuelConsumption: 10, nurseReport: 'Patient complained of mild discomfort. No further actions were necessary.' },
    { id: 3, name: 'Mike Brown', location: 'Arusha', emergency: 'Low', status: 'Pending', ambulanceAssigned: '', timestamps: [], distance: 15, fuelConsumption: 6, nurseReport: 'Patient was in good condition. No issues reported.' }
  ]);

  const [ambulanceStaff, setAmbulanceStaff] = useState([]);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [showNurseReportModal, setShowNurseReportModal] = useState(false);
  const [showAssignAmbulanceModal, setShowAssignAmbulanceModal] = useState(false);
  const [showOnboardingModal, setShowOnboardingModal] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);

  const handleAssignAmbulance = (requestId, ambulanceId) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, ambulanceAssigned: ambulanceId, status: 'In Progress' } : req
    );
    setRequests(updatedRequests);
    setShowAssignAmbulanceModal(false);
  };

  const handleStatusUpdate = (requestId, newStatus) => {
    const updatedRequests = requests.map(req =>
      req.id === requestId ? { ...req, status: newStatus } : req
    );
    setRequests(updatedRequests);
  };

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <h2>Admin Dashboard - Ambulance Management</h2>
        <button onClick={() => setShowOnboardingModal(true)}>Onboard Staff</button>
      </header>

      {/* Summary Section */}
      <div className="summary-section">
        <h3>Summary</h3>
        <div className="summary-cards">
          <div>Total Requests: {requests.length}</div>
          <div>Pending: {requests.filter(req => req.status === 'Pending').length}</div>
          <div>In Progress: {requests.filter(req => req.status === 'In Progress').length}</div>
          <div>Completed: {requests.filter(req => req.status === 'Completed').length}</div>
        </div>
      </div>

      {/* Requests Table */}
      <table className="requests-table">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Emergency Level</th>
            <th>Status</th>
            <th>Ambulance Assigned</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map(request => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.name}</td>
              <td>{request.location}</td>
              <td>{request.emergency}</td>
              <td>
                <select value={request.status} onChange={(e) => handleStatusUpdate(request.id, e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
              <td>{request.ambulanceAssigned || 'Not Assigned'}</td>
              <td>
                <button onClick={() => { setSelectedRequest(request); setShowProgressModal(true); }}>Track</button>
                <button onClick={() => { setSelectedRequest(request); setShowNurseReportModal(true); }}>Nurse Report</button>
                <button onClick={() => { setSelectedRequest(request); setShowAssignAmbulanceModal(true); }}>Assign Ambulance</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Staff Onboarded List with Scroll */}
      <div className="staff-list">
        <h3>Onboarded Staff</h3>
        <div className="staff-scroll">
          {ambulanceStaff.length === 0 ? (
            <p>No staff onboarded yet.</p>
          ) : (
            ambulanceStaff.map((staff, index) => (
              <div key={index} className="staff-card">
                <p>Name: {staff.name}</p>
                <p>Role: {staff.role}</p>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modals */}
      {showProgressModal && selectedRequest && (
        <div className="modal">
          <h3>Tracking Ambulance for Request ID: {selectedRequest.id}</h3>
          <p>Location updates...</p>
          <button onClick={() => setShowProgressModal(false)}>Close</button>
        </div>
      )}

      {showNurseReportModal && selectedRequest && (
        <div className="modal">
          <h3>Nurse Report for {selectedRequest.name}</h3>
          <p>{selectedRequest.nurseReport}</p>
          <button onClick={() => setShowNurseReportModal(false)}>Close</button>
        </div>
      )}

      {showAssignAmbulanceModal && selectedRequest && (
        <div className="modal">
          <h3>Assign Ambulance</h3>
          <input
            type="text"
            placeholder="Enter Ambulance ID"
            onBlur={(e) => handleAssignAmbulance(selectedRequest.id, e.target.value)}
          />
          <button onClick={() => setShowAssignAmbulanceModal(false)}>Close</button>
        </div>
      )}

      {showOnboardingModal && (
        <div className="modal">
          <h3>Onboard New Staff</h3>
          <form onSubmit={(e) => {
            e.preventDefault();
            const newStaff = { name: e.target.name.value, role: e.target.role.value };
            setAmbulanceStaff([...ambulanceStaff, newStaff]);
            setShowOnboardingModal(false);
          }}>
            <input name="name" placeholder="Staff Name" required />
            <select name="role" required>
              <option value="">Select Role</option>
              <option value="Driver">Driver</option>
              <option value="Nurse">Nurse</option>
            </select>
            <button type="submit">Register</button>
          </form>
          <button onClick={() => setShowOnboardingModal(false)}>Close</button>
        </div>
      )}
    </div>
  );
}

export default Admin;
