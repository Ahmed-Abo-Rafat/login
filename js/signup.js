let nameInput = document.getElementById('name');
let emailInput = document.getElementById('email');
let passwordInput = document.getElementById('password');
let confirmPasswordInput = document.getElementById('confirmPassword');
let signUpBtn = document.getElementById("signUp");
let emailExistsAlert = document.getElementById('emailExistsAlert');

let userList = JSON.parse(localStorage.getItem('signUp')) || [];


signUpBtn.addEventListener("click", signUp);

//calling Validation
nameInput.addEventListener('input', validationName);
emailInput.addEventListener('input', validationEmail);
passwordInput.addEventListener('input', validationPass);

//Function For Check Inputs
function emptyInputs(){
    if(nameInput.value.length === 0 && emailInput.value.length === 0 && passwordInput.value.length === 0 && confirmPasswordInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = 'All Inputs Are Required';
        return false;
    }
    else if (nameInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Name is Required";
        return false;
    }
    else if (emailInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Email is Required";
        return false;
    }
    else if (passwordInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Password is Required";
        return false;
    }
    else if (confirmPasswordInput.value.length === 0) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Confirm Password is Required";
        return false;
    }
    return true;
}

//function For Validation Input
function validateInputs() {
    let isNameValid = validationName();
    let isEmailValid = validationEmail();
    let isPassValid = validationPass();

    if(!isNameValid) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Invalid Name Format";
        return false;
    } else if (!isEmailValid) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "Invalid Email Format";
        innerBox.classList.remove('d-none'); 
        return false;
    }
    else if (emailExists(emailInput.value)) {
        emailExistsAlert.classList.remove('d-none');
        emailExistsAlert.textContent = "This email already exists and has an account!";
        return false;
    }

    emailExistsAlert.classList.add('d-none');
    return true;
}

function signUp() {

    if(!emptyInputs()) return;

    if(!validateInputs()) return;

    let user = {
        name: nameInput.value,
        email: emailInput.value,
        pass: passwordInput.value,
        confPass: confirmPasswordInput.value
    };

    userList.push(user);
    localStorage.setItem('signUp', JSON.stringify(userList));
    clearInputs();
    window.location.href = "https://ahmed-abo-rafat.github.io/login/index.html";
}

//Functio For Check is Email Exiting before
function emailExists(email) {
    let users = JSON.parse(localStorage.getItem('signUp')) || [];
    for(let i = 0; i < users.length; i++) {
        if(users[i].email.toLowerCase() === email.toLowerCase()) {
            return true;
        }
    }
    return false;
}

//Clear Inputs
function clearInputs() {
    nameInput.value = '';
    emailInput.value = '';
    passwordInput.value = '';
    confirmPasswordInput.value = '';
}

//Function For Validatin name
function validationName() {
    let nameRegx = /^[A-Za-z'-]+$/;
    let nameText = nameInput.value;

    if(nameRegx.test(nameText)) {
        nameInput.classList.add('is-valid');
        nameInput.classList.remove('is-invalid');
        return true;
    }
    else {
        nameInput.classList.add('is-invalid');
        nameInput.classList.remove('is-valid');
        return false;
    }
}

//Function For Email Validation
function validationEmail() {
    let emailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailText = emailInput.value;

    if(emailRegx.test(emailText)) {
        emailInput.classList.add('is-valid');
        emailInput.classList.remove('is-invalid');
        return true;
    }
    else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        return false;
    }
}

//Function For Password Validation
function validationPass() {
    let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let passText = passwordInput.value;

    if(passRegex.test(passText)) {
        passwordInput.classList.add('is-valid');
        passwordInput.classList.remove('is-invalid');
    }
    else {
        passwordInput.classList.add('is-invalid');
        passwordInput.classList.remove('is-valid');
    }

}