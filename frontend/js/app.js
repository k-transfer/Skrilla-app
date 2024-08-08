const { setDefaultResultOrder } = require("dns");

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    // Example of rendering a simple form
    app.innerHTML = `
    <h2>Register</h2>
    <form id="register-form">
    <label>Name</label>
    <input type="text" id="name" required>
    <label>Email</label>
    <input type="email" id="email" required>
    <label>Password</label>
    <input type="password" id="password" required>
    <button type="Submit">Register</button>
</form>
`;


// Example of handling a form submmission
const registerForm = document.getElementById('register-form');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await response.json();
        if (response.ok) {
            setDefaultResultOrder('Registration Successful!');
        } else {
            alert('Error: ' + data.error);
        }
    } catch (err) {
        console.log('Error:', err);
    }
});
});