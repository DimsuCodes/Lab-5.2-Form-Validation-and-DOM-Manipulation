let registrationForm = document.getElementById("registrationForm");
let formGroup = document.getElementsByClassName("form-group");
let errorMessage = document.getElementsByClassName("error-message");
let confirmPassword = document.getElementById("confirmPassword");
let passwordError = document.getElementById("passwordError");
let password = document.getElementById("password");
let email = document.getElementById("email");
let emailError = document.getElementById("emailError");
let usernameError = document.getElementById("usernameError");
let username = document.getElementById("username");
let confirmPasswordError = document.getElementById("confirmPasswordError");

//Adding the event listener to username input

username.addEventListener("input", () =>{
        userInput(username, usernameError); //shows a popup error username message
});


email.addEventListener("input", () =>{
    userInput(email, emailError);
});

password.addEventListener("input", () =>{
    userInput(password, passwordError);
    checkMatch();
});

confirmPassword.addEventListener("input", () =>{
    checkMatch();
});

function checkMatch () {
    if(confirmPassword.value !== password.value){
        confirmPasswordError.textContent = "doesn't match" 
        return false;
    } else {
        confirmPasswordError.textContent = "";
        return true;
    }
}

function userInput(input, errorSpan) {

        //username validity

    if (input.validity.valueMissing) {
        errorSpan.textContent = "This field is required.";
        return false;


    } else if (input.validity.tooShort) {
        errorSpan.textContent = "Must be at least 8 characters."
        return false;
        //email validity

    } else if(input.validity.typeMismatch) {
        errorSpan.textContent = "Invalid Email"
        return false;
    }

    //password validity


    else if(input.validity.patternMismatch) {
        errorSpan.textContent = "Invalid Password"
        return false;
    } 
    
    
    else {
        errorSpan.textContent ="";
        return true;
    }

}

const fields = [
    [username, usernameError],
    [email, emailError],
    [password, passwordError],
    [confirmPassword, confirmPasswordError],
];

registrationForm.addEventListener("submit", (event) => {
    event.preventDefault();

    // run userInput on every field; keep the inputs that failed
    const failed = fields.filter(([input, errorSpan]) => !userInput(input, errorSpan));

    // password match is checked separately
    if (userInput(confirmPassword, confirmPasswordError) && !checkMatch()) {
        failed.push([confirmPassword]);
    }

    if (failed.length > 0) {
        failed[0][0].focus(); // first bad field
        return;
    }

    localStorage.setItem("username", username.value);
    alert("Registration successful!");
    registrationForm.reset();
    username.value = localStorage.getItem("username");
});

const savedUsername = localStorage.getItem("username");
if (savedUsername) {
    username.value = savedUsername;
}