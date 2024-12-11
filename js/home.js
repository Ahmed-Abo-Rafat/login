let logout = document.getElementById('logout');
let welcome = document.getElementById('welcome');

(
    function(){
        let users = JSON.parse(localStorage.getItem('signUp'));
        users.forEach(user => {
            welcome.textContent = `Welcome ${user.name}`
        })
    }
)()

logout.addEventListener('click', function() {
    window.location.href = "https://ahmed-abo-rafat.github.io/login/index.html"
});