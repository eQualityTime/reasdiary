import { top1000Passwords } from "./top100passwords.js";

const currentYear = new Date().getFullYear();

// Function to generate the password based on rules
function generatePassword(dogName, requireCapital = false, requireNumber = false, requireSpecialChar = false) {
    let password = dogName;
    if (requireCapital) password = password.charAt(0).toUpperCase() + password.slice(1);
    if (requireNumber) password += currentYear;
    if (requireSpecialChar) password += '!';
    return password;
}

const dogName = 'sparkles';
const correctPassword = generatePassword(dogName, true, true, true);

// Utility function to display messages
function displayMessage(element, text, color) {
    element.textContent = text;
    element.style.color = color;
}

// Handle incorrect password responses
function handleIncorrectPassword(responseElement) {
    displayMessage(responseElement, 'Error: Incorrect password. Please try again.', 'red');
}

// Check if password is in the top 1000 list
function handleCommonPasswordCheck(password, responseElement) {
    const passwordIndex = top1000Passwords.indexOf(password);
    if (passwordIndex !== -1) {
        displayMessage(responseElement, 
            `Good guess! That is the ${passwordIndex + 1}${getOrdinalSuffix(passwordIndex + 1)} most common password according to Wikipedia!`, 
            'orange'
        );
        return true;
    }
    return false;
}

// Function to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(rank) {
    const j = rank % 10, k = rank % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    return 'th';
}

// Main event listener for login form
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('password-form');
    const input = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    const response = document.getElementById('response');

    // 2FA Elements
    const twoFAContainer = document.createElement('div');
    twoFAContainer.style.display = 'none';
    twoFAContainer.innerHTML = `
        <label for="twofa-code">Enter 2FA Code:</label>
        <input type="text" id="twofa-code" placeholder="6-digit code" maxlength="6">
        <button id="submit-2fa">Submit Code</button>
    `;
    form.appendChild(twoFAContainer);

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = input.value.trim();
        const username = usernameInput.value.trim().toLowerCase();

        // Username checks
        if (username === "play.poet.wedge") {
            displayMessage(response, "Incorrect username or password.", "red");
            return;
        }

        if (username === "madlad2329") {
            if (password === "password") {
                // Show 2FA input field
                twoFAContainer.style.display = 'block';
                displayMessage(response, "Two-Factor Authentication required. Please enter the 6-digit code.", "orange");

                // Handle 2FA submission
                document.getElementById('submit-2fa').addEventListener('click', function() {
                    const twoFACode = document.getElementById('twofa-code').value.trim();
                    
                    if (twoFACode.length === 6) {
                        displayMessage(response, "Incorrect 2FA code. Please try again.", "red");
                    } else {
                        displayMessage(response, "Please enter a valid 6-digit 2FA code.", "red");
                    }
                });

            } else {
                handleIncorrectPassword(response);
            }
            return;
        }

        if (username === "rea_gymnastics") {
            if (password === correctPassword) {
                displayMessage(response, "Access Granted! Welcome.", "green");
            } else if (password.toLowerCase() === correctPassword.toLowerCase()) {
                displayMessage(response, "That is a really interesting guess, but maybe the diary needs a capital letter?", "orange");
            } else if (handleCommonPasswordCheck(password, response)) {
                return; 
            } else if (password.toLowerCase().includes("2025")) {
                displayMessage(response, "Interesting choice! You included the year. Lots of people do that when they have to change their password a lot. Often computers want you to add a punctuation character as well...", "orange");
            } else if (password.toLowerCase().includes(dogName.toLowerCase())) {
                displayMessage(response, `Interesting choice! You included the dog's name, "${dogName}". But maybe Rea has to change the password at least once a year.`, "orange");
            } else {
                handleIncorrectPassword(response);
            }
            return;
        }

        // Default case for unrecognized usernames
        displayMessage(response, "That username doesn't exist, please try another.", "red");
    });
});

