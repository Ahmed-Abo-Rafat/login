let emialInput = document.getElementById('email');
let passInput = document.getElementById('password');
let loginBtn = document.getElementById("login");
let alertParag = document.getElementById("alertParag");
let userList = JSON.parse(localStorage.getItem('logIn')) || [];

//^ validation
emialInput.addEventListener('input', validationEmail);
passInput.addEventListener('input', validationPass);

//Login BTN
loginBtn.addEventListener('click', logIn);



//Functio For Email Exiest
function emailExists(email) {
    if (localStorage.getItem('signUp') !== null) { 
        let users = JSON.parse(localStorage.getItem('signUp')); 
        for (let i = 0; i < users.length; i++) { 
            if (users[i].email.toLowerCase() === email.toLowerCase()) { 
                return true; 
            } 
        } 
    } 
    return false;
}

//^ Check Input Lengths
function checkInputLengths(emailValue, passValue) {
    if (emailValue.length === 0 && passValue.length === 0) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "All Inputs Are Required";
        return false;
    } else if (emailValue.length === 0) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "Email is Required";
        return false;
    } else if (passValue.length === 0) {
        alertParag.classList.remove('d-none');
        alertParag.textContent = "Password is Required";
        return false;
    }
    return true;
}

//Functio For Check Password and Email Math
function passMatchesEmail(email, pass) {
    if (localStorage.getItem('signUp') !== null) { 
        let users = JSON.parse(localStorage.getItem('signUp')); 
        for (let i = 0; i < users.length; i++) { 
            if (users[i].email.toLowerCase() === email.toLowerCase() && users[i].pass === pass) { 
                return true; 
            } 
        } 
    } 
    return false;
} 

//Function For Login 
function logIn() {
    let emailValue = emialInput.value;
    let passValue = passInput.value;

    if (!checkInputLengths(emailValue, passValue)) return;

    
    if(emailExists(emailValue) && passMatchesEmail(emailValue, passValue)) {
        alertParag.classList.add('d-none');

        let user = {
            email: emailValue,
            pass: passValue
        };

        userList.push(user);
        localStorage.setItem('logIn', JSON.stringify(userList));
        console.log(userList);
        clearInputs();
        window.location.href = "https://ahmed-abo-rafat.github.io/login/home.html";
    }
    else if(!emailExists(emailValue)) {
        alertParag.classList.remove('d-none'); 
        alertParag.textContent = "Email does not exist!"; 
    }
    else { 
        alertParag.classList.remove('d-none'); 
        alertParag.textContent = "Incorrect password!"; 
    }

    
}


//^ clear inputs
function clearInputs() {
    emialInput.value = '';
    passInput.value = '';
}

//Functio For Vadiation Email
function validationEmail() {
    let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let emailText = emialInput.value;

    if(emailRegex.test(emailText)) {
        emialInput.classList.add('is-valid');
        emialInput.classList.remove('is-invalid');
        return true;
    }
    else {
        emailInput.classList.add('is-invalid');
        emailInput.classList.remove('is-valid');
        return false;
    }
}

//Functio for Validation Password
function validationPass() {
    var passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    var passText = passInput.value;

    if (passRegex.test(passText)) {
        passInput.classList.add('is-valid');
        passInput.classList.remove('is-invalid');
        return true;
    } else {
        passInput.classList.remove('is-valid');
        passInput.classList.add('is-invalid');
        return false;
    }
}
