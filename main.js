// main.js
//import { top100Passwords } from '/top100Passwords.js';

const dogName = 'sparkles';
console.log("here")

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const response = document.getElementById('response');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = input.value.trim();
				console.log("password is: "+password)
//        if (top100Passwords.includes(password)) {
 //           response.textContent = 'Well done, your guess was in one of the top 100 passwords!';
       // } else 
				if (password.toLowerCase().includes(dogName.toLowerCase())) {
            response.textContent = `Interesting choice! You included the dog\'s name, "${dogName}".`;
        } else {
            response.textContent = 'Your guess is unique, but not a common weak password.';
        }
				console.log("response is: "+response.textContent)
    });
});

