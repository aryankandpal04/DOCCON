document.addEventListener('DOMContentLoaded', function () {
    const signUpButton = document.getElementById('sign-up-btn');
    const signInButton = document.getElementById('sign-in-btn');
    const container = document.querySelector('.container');

    signUpButton.addEventListener('click', () => {
        container.classList.add('sign-up-mode');
    });

    signInButton.addEventListener('click', () => {
        container.classList.remove('sign-up-mode');
    });

    const signUpForm = document.querySelector('.sign-up-form');
    const signInForm = document.querySelector('.sign-in-form');
 
    signUpForm.addEventListener('submit', function (event) {
        const username = signUpForm.querySelector('input[name="username"]').value.trim();
        const password = signUpForm.querySelector('input[name="password"]').value.trim();

        if (username === '' || password === '') {
            event.preventDefault();
            displayErrorMessage(signUpForm, 'Please fill in all fields.');
        } else if (password.length < 6) {
            event.preventDefault();
            displayErrorMessage(signUpForm, 'Password must be at least 6 characters long.');
        }
    });

    signInForm.addEventListener('submit', function (event) {
        const username = signInForm.querySelector('input[name="username"]').value.trim();
        const password = signInForm.querySelector('input[name="password"]').value.trim();

        if (username === '' || password === '') {
            event.preventDefault();
            displayErrorMessage(signInForm, 'Please fill in all fields.');
        }
    });

    function displayErrorMessage(form, message) {
        const errorDiv = form.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.textContent = message;
        } else {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'error-message';
            errorMessage.textContent = message;
            form.appendChild(errorMessage);
        }
    }
});
