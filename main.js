import { top1000Passwords} from "./top100passwords.js";
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
    const input = document.getElementById('password');
    const username_input = document.getElementById('username');
    const response = document.getElementById('response');
    const diaryContainer = document.getElementById('diary-container');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const password = input.value.trim();
        const username = username_input.value.trim() 
        const passwordIndex = top1000Passwords.indexOf(password);
        //This is where we check the username. 
        if (username.toLowerCase() === "play.poet.wedge") 
          {
            //TODO all password attempts are wrong. k
          }
        else if (username.toLowerCase() === "madlad2329")
          {
              if (password === "password"){
                //TODO do 2FA but don't accept any options 
              } else{
                //TODO Say it's an incorrect password
              }
          }
        else if (username.toLowerCase() === "rea_gymnastics")
          {
              if (password === correctPassword) {
                  response.textContent = 'Access Granted! Welcome.';
                  response.style.color = 'green';
              } else if (password.toLowerCase() ===  correctPassword.toLowerCase()){
                  response.textContent = "That is a really interesting guess, but maybe the diary needs a captial letter?"
                  response.style.color = 'orange';
              } else if (passwordIndex != -1) {
                  console.log("Hello")
                  response.textContent = `Good guess! That is the ${passwordIndex + 1}${getOrdinalSuffix(passwordIndex + 1)} most common password acording to Wikipedia!`; 
                  response.style.color = 'orange';
                  console.log("2")
              } else if (password.toLowerCase().includes("2025")) {
                  response.textContent = `Interesting choice! You included the year. Lots of people do that when they have to change their password a lot. Often computers want you to add a puncuation character as well...`;
                  response.style.color = 'orange';
              } else if (password.toLowerCase().includes(dogName.toLowerCase())) {
                  response.textContent = `Interesting choice! You included the dog's name, "${dogName}". But maybe Rea has to change the password at least once a year.`;
                  response.style.color = 'orange';
              } else {
                  response.textContent = 'Error: Incorrect password. Please try again.';
                  response.style.color = 'red';
              }
           }//end of rea password guessing
          else {
                  response.textContent = "That username doesn't exist, please try another.";
                  response.style.color = 'red';
            
          }
    });
});


// Function to get ordinal suffix (1st, 2nd, 3rd, etc.)
function getOrdinalSuffix(rank) {
    console.log("GetOridinal Suffix")
    const j = rank % 10,
          k = rank % 100;
    if (j === 1 && k !== 11) return 'st';
    if (j === 2 && k !== 12) return 'nd';
    if (j === 3 && k !== 13) return 'rd';
    console.log("leave GetOridinal Suffix")
    return 'th';
}
