// Handle ambulance request form submission
document.getElementById("requestForm").addEventListener("submit", function(e) {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let location = document.getElementById("location").value;
    let details = document.getElementById("details").value;

    // Send data to the server
    fetch('/api/request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, location, details })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Ambulance Requested Successfully!");
        } else {
            alert("There was an error.");
        }
    })
    .catch(error => console.error('Error:', error));
});

// Handle triage form submission
document.getElementById('triageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Collect input data
    const spo2 = parseInt(document.getElementById('spo2').value);
    const pulse = parseInt(document.getElementById('pulse').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const bloodPressure = document.getElementById('bloodPressure').value;
    const gcs = parseInt(document.getElementById('gcs').value);

    // Example triage conditions (adjust according to actual needs)
    let category = 'Green';

    if (spo2 < 90 || gcs < 8) {
        category = 'Red';
    } else if (spo2 < 94 || pulse > 130 || gcs < 12) {
        category = 'Orange';
    } else if (pulse > 100 || temperature > 38 || gcs < 15) {
        category = 'Yellow';
    }

    // Display the triage result
    const resultElement = document.getElementById('triageCategory');
    resultElement.textContent = category;

    // Apply colors based on the category
    if (category === 'Red') {
        resultElement.style.color = 'red';
    } else if (category === 'Orange') {
        resultElement.style.color = 'orange';
    } else if (category === 'Yellow') {
        resultElement.style.color = 'yellow';
    } else {
        resultElement.style.color = 'green';
    }
});
