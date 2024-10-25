function showSection(sectionId) {
    const sections = document.querySelectorAll('.form-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Login Handler
// document.getElementById("loginFormHandler").addEventListener("submit", function(event) {
// event.preventDefault();
// const formData = new FormData(this);

// const email = formData.get('email');
// const password = formData.get('password');

// // Create an object to send as JSON
// // const data = {
// //     email: email,
// //     password: password
// // };
// // Send the request to the server
// const response = await fetch('/authRoutes/login', {
//   method: 'POST',
//   headers: {
//       'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({ email, password })
// });
// const data = await response.json();
// if (data.messageStatus === '200'){
// // Navigate to a new URL
// window.location.href = 'http://127.0.0.1:5500/';

// }
// // alert(data.message, data.messageStatus);
// });
// //     fetch("/login", {
// //         method: "POST",
// //         headers: {
// //             "Content-Type": "application/json"
// //         },
// //         body: JSON.stringify(data)
// //     })
// //     .then(response => response.json())
// //     .then(data => {
// //         if (data.success) {
// //             alert("Login successful!");
// //             window.location.href = "/dashboard";
// //         } else {
// //             alert("Login failed: " + data.message);
// //         }
// //     })
// //     .catch(error => console.error('Error:', error));
// // });


// // Register Handler
// document.getElementById("registerFormHandler").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const formData = new FormData(this);

//     fetch("/register", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert("Registration successful!");
//             showSection('loginForm');
//         } else {
//             alert("Registration failed: " + data.message);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });

// // Forgot Password Handler
// document.getElementById("forgotPasswordFormHandler").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const formData = new FormData(this);

//     fetch("/forgot-password", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert("Verification code sent!");
//             showSection('verificationCodeForm');
//         } else {
//             alert("Error: " + data.message);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });

// // Verification Code Handler
// document.getElementById("verificationCodeFormHandler").addEventListener("submit", function(event) {
//     event.preventDefault();
//     const formData = new FormData(this);

//     fetch("/verify-code", {
//         method: "POST",
//         body: formData
//     })
//     .then(response => response.json())
//     .then(data => {
//         if (data.success) {
//             alert("Verification successful!");
//             showSection('loginForm');
//         } else {
//             alert("Verification failed: " + data.message);
//         }
//     })
//     .catch(error => console.error('Error:', error));
// });
document.addEventListener('DOMContentLoaded', () => {
    // Check if 'frm-register' exists before adding event listener
    const registerForm = document.getElementById('frm-register');
    if (registerForm) {
      registerForm.addEventListener('submit', async function(e) {
        e.preventDefault();
  
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
  
        // Send the request to the server
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        });
  
        const data = await response.json();
        alert(data.message);
      });
    }
  
    // Check if 'frm-login' exists before adding event listener
    const loginForm = document.getElementById('loginFormHandler');
    if (loginForm) {
      loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();
  
        const email = document.getElementById('email').value; 
        const password = document.getElementById('password').value; 
  
        // Send the request to the server
        const response = await fetch('/authRoutes/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
  
        const data = await response.json();
        if (data.messageStatus === '200'){
          // Navigate to a new URL
  window.location.href = 'http://127.0.0.1:3000/';
  
        }
        // alert(data.message, data.messageStatus);
      });
    }
  });
  
