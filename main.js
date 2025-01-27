// main.js
import { top100Passwords } from './top100Passwords.js';

const currentYear = new Date().getFullYear();

// Function to generate the password based on rules
function generatePassword(dogName, requireCapital = false, requireNumber = false, requireSpecialChar = false) {
    let password = dogName;
    
    if (requireCapital) {
        password = password.charAt(0).toUpperCase() + password.slice(1);
    }
    
    if (requireNumber) {
        password += currentYear;
    }
    
    if (requireSpecialChar) {
        password += '!';
    }

    return password;
}

const dogName = 'sparkles';
const correctPassword = generatePassword(dogName, true, true, true);

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const input = document.getElementById('password-input');
    const response = document.getElementById('response');
    const diaryContainer = document.getElementById('diary-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = input.value.trim();

        if (password === correctPassword) {
            response.textContent = 'Access Granted! Welcome.';
            response.style.color = 'green';
            diaryContainer.innerHTML = `
                <h2>Secret Diary</h2>
                <p>Dear Diary,</p>
                <p>Today was another hard day at school. It feels like no matter what I do, they just won’t leave me alone. I tried to be brave and ignore them, but their words hurt so much. I wish I could tell someone how I feel, but I’m scared they’ll think I’m weak. Writing this down helps a little, but I wish things were different...</p>
                <p>Maybe tomorrow will be better. I just have to keep going.</p>
                <p>- A 14-year-old girl</p>
            `;
            diaryContainer.style.display = 'block';
        } else if (top100Passwords.includes(password)) {
            response.textContent = 'Well done, your guess was in one of the top 100 passwords!';
            response.style.color = 'orange';
        } else if (password.toLowerCase().includes(dogName.toLowerCase())) {
            response.textContent = `Interesting choice! You included the dog's name, "${dogName}".`;
            response.style.color = 'orange';
        } else {
            response.textContent = 'Error: Incorrect password. Please try again.';
            response.style.color = 'red';
        }
    });
});

