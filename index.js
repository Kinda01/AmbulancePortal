// index.js

function showRegistrationForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('registration-form').style.display = 'block';
    document.getElementById('login-form').style.display = 'none';
}

function showLoginForm() {
    document.getElementById('form-container').style.display = 'block';
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
}

async function register(event) {
    event.preventDefault();
    const username = document.getElementById('reg-username').value;
    const password = document.getElementById('reg-password').value;
    const role = document.getElementById('reg-role').value;

    const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password, role })
    });

    const data = await response.json();
    alert(data.message);
}

async function login(event) {
    event.preventDefault();
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: username, password })
    });

    const data = await response.json();
    if (data.success) {
        // Redirect based on role
        if (data.role === 'admin') {
            window.location.href = 'admin.html';
        } else if (data.role === 'call_center') {
            window.location.href = 'ambulance-progress.html';
        } else if (data.role === 'dispatcher') {
            window.location.href = 'dispatcher.html';
        }
    } else {
        alert(data.message);
    }
}
