const signupButton = document.getElementById("signup-button");
const signinButton = document.getElementById("signin-button");
const welcomeScreen = document.getElementById("welcome-screen");
const signupScreen = document.getElementById("signup-screen");
const signinScreen = document.getElementById("signin-screen");
const backButton = document.getElementById("back-button");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const telInput = document.getElementById("tel");
const passwordInput = document.getElementById("password");
const confirmInput = document.getElementById("confirm");
const terms = document.getElementById("terms-and-conditions")

signupButton.addEventListener("click", function() {
    welcomeScreen.hidden = true;
    signinScreen.hidden = true;
    signupScreen.hidden = false;
});

signinButton.addEventListener("click", function() {
    welcomeScreen.hidden = true;
    signinScreen.hidden = false;
    signupScreen.hidden = true;
});

backButton.addEventListener("click", function() {
    welcomeScreen.hidden = false;
    signinScreen.hidden = true;
    signupScreen.hidden = true;
});



function validateName() {
    const nameError = nameInput.parentElement.querySelector(".error-message");

    const name = nameInput.value.trim();
    const nameParts = name.split(/\s+/);

    if (nameParts.length < 2) {
        nameError.textContent = "Please enter your full name.";
        return false;
    }

    if (!nameParts.every(part => /^\p{L}+$/u.test(part))) {
        nameError.textContent = "Your name must only contain letters.";
        return false;
    }

    nameError.textContent = "";
    return true;

}

function validateEmail() {
    const emailError = emailInput.parentElement.querySelector(".error-message");

    const email = emailInput.value.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailPattern.test(email)) {
        emailError.textContent = "Please enter a valid email.";
        return false;
    }
    emailError.textContent = "";
    return true;
}

function validateTel() {
    const telError = telInput.parentElement.querySelector(".error-message");

    const tel = telInput.value.trim();
    const firstChar = tel.at(0);

    if (tel === "") {
        telError.textContent = "Please enter your phone number.";
        return false;
    }

    if (!/^\d+$/.test(tel.replace("+", ""))) {
        telError.textContent = "Your phone number must only contain digits.";
        return false;
    }

    if (firstChar !== "+") {
        telError.textContent = "Your phone number must start with your country code.";
        return false;
    }

    if (tel.length < 7) {
        telError.textContent = "Your phone number is too short.";
        return false;
    }

    if (tel.length > 15) {
        telError.textContent = "Your phone number is too long.";
        return false;
    }

    telError.textContent = "";
    return true;
}

function validatePassword() {
    const password = passwordInput.value;
    const passwordError = passwordInput.parentElement.querySelector(".error-message");
    const hasUpper = /[A-Z]/.test(password);    
    const hasLower = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSymbol = /[^A-Za-z\d\s]/.test(password);

    if (password.length < 8) {
        passwordError.textContent = "Your password must have at least 8 characters.";
        return false;
    }

    if (!hasUpper || !hasLower || !hasDigit || !hasSymbol) {
        passwordError.textContent = "Your password must contain at least: one number, one uppercase letter, one lowercase letter and one symbol.";
        return false;
    }

    passwordError.textContent = "";
    return true;
}

function checkMatch() {
    const confirm = confirmInput.value;
    const confirmError = confirmInput.parentElement.querySelector(".error-message");

    if (confirm !== passwordInput.value) {
        confirmError.textContent = "Your passwords does not match.";
        return false;
    }

    confirmError.textContent = "";
    return true;
}

function checkbox() {
    const checkboxError = terms.parentElement.querySelector(".error-message");

    if (!terms.checked) {
        checkboxError.textContent = "Please agree to the terms and conditions.";
        return false;
    }

    checkboxError.textContent = "";
    return true;
}


function validateForm() {
    const validName = validateName();
    const validEmail = validateEmail();
    const validTel = validateTel();
    const validPassword = validatePassword();
    const passwordMatched = checkMatch();
    const boxChecked = checkbox();

    if (validName && validEmail && validTel && validPassword && passwordMatched && boxChecked) {
        return true;
    }
    return false;
}

const form = document.querySelector(".data");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    if (validateForm()) {
        console.log("Form is valid.")
    }
});