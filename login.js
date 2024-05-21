let pseudoRegex = /^moi$/; // expression régulière pour vérifier le pseudo
let passwordRegex = /^moi$/; // expresion régulière pour vérifier le mot de passe
let isLogged = false; // variable pour vérifié si l'utilisateur est connecté
let loggedInUser = ""; // variable pour stoker le pseudo de l'utilisateur connecté
let loginText = document.getElementById("loginText"); // texte du login/logout
let loginWindow = document.querySelector("#loginWindow"); // fenêtre de login
let profilLogin = document.querySelector("#profilLogin"); // élément de profil
let userCity = ""; // variable pour stocké la ville

function login() {
    let pseudo = document.getElementById("pseudo").value; // ca récupère le pseudo
    let password = document.getElementById("password").value; // ca récupère le mot de passe

    if (!pseudoRegex.test(pseudo) || !passwordRegex.test(password)) { // Vérifie les identifiants
        let messageDiv = document.getElementById("messageIdIncorect");
        messageDiv.innerText = "Pseudo ou mot de passe incorrect."; // Affiche un message d'erreur
        return false;
    }

    loggedInUser = pseudo; // Stocke le pseudo de l'utilisateur connecté
    localStorage.setItem('loggedInUser', loggedInUser); // sauvegarde le pseudo dans le localStorage

    showArticleForm(); // affiche le formulaire de soumission d'article
    loginWindow.style.display = "none"; //ca masque la fenêtre de login
    document.getElementById("messageIdIncorect").innerText = ""; // réinitialise le message d'erreur
    loadArticles(); // fonction qui charge les articles
    return false; //  empêche la soumission du formulaire
}

function logout() {
    isLogged = false; // met la variable de connexion à false
    localStorage.removeItem("isLogged"); // supprim la variable de connexion du localStorage
    localStorage.removeItem("loggedInUser"); // supprime le pseudo de l'utilisateur du localStorage
    loginText.innerText = "Login"; // change le texte du bouton en "Login"
    document.getElementById('pseudo').value = ""; // rréinitialise le champ pseudo
    document.getElementById('password').value = ""; // réinitialise le champ mot de passe
    loginWindow.style.display = "none"; // masque la fenêtre de login
    hideCloseButtons(); // masque les bouton de fermeture
    selectArticles(); // recharge les article
}

function showArticleForm() {
    loginWindow.style.display = "none"; // Masque la fenêtre de login
    formulaireDePost.style.display = "block"; // Affiche le formulaire de soumission d'article
    isLogged = true; // Met la variable de connexion à true
    loginText.innerText = "Logout"; // Change le texte du bouton en "Logout"
    localStorage.setItem("isLogged", "true"); // Sauvegarde la variable de connexion dans le localStorage
    localStorage.setItem("loggedInUser", document.getElementById('pseudo').value); // Sauvegarde le pseudo dans le localStorage
    showCloseButtons(); // Affiche les boutons de fermeture
}

// écouteur d'évenements au click sur le profil
profilLogin.addEventListener("click", function () {
    if (!isLogged) { // si l'utilisateur n'est pas connecté
        loginWindow.style.display = "block"; // ca affiche la fenêtre de login
        formulaireDePost.style.display = "none"; // ca masque le formulaire de soumission d'article
    } else {
        formulaireDePost.style.display = "block"; // ca affiche le formulaire de soumission d'article
        loginWindow.style.display = "none"; // ca masque la fenêtre de login
    }
});

cancelButton.addEventListener("click", function () {
    loginWindow.style.display = "none"; // masque la fenêtre de login
    logout(); // déconnecte l'utilisateur
    document.getElementById("messageIdIncorect").innerText = ""; // réinitialise le message d'erreur
});

// fonction pour masquer les boutons de fermeture
function hideCloseButtons() {
    let closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function (buttonClose) {
        buttonClose.style.display = 'none';
    });
}

// ca vérifie la connexion au chargement de la page 
window.onload = function () {
    if (localStorage.getItem("isLogged") == "true") {
        showArticleForm(); // ca affiche le formulaire de soumission d'article
        loadArticles(); // ca charge les articles
    } else {
        showDefaultPosts(); // ca affiche les posts par défaut
        loadArticles(); // ca charge les articles
    }
};

function saveArticles() {
    localStorage.setItem('articles', JSON.stringify(articles)); // sauvegarde les articles dans le localStorage
}

// fonction qui affiche les croix de suppresion de post lorsque l'utilisateur est log
function showCloseButtons() {
    let closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(function (buttonCloseShow) {
        buttonCloseShow.style.display = 'block';
    });
}

// fonction qui charge les articles dans le localStorage
function loadArticles() {
    let storedArticles = localStorage.getItem('articles');
    if (storedArticles) {
        articles = JSON.parse(storedArticles); // charge les articles depuis le localStorage
    }
    selectArticles(); // appel de la fonction qiu sélectionne et affiche les articles
}

// fonction pour vérifier si un utilisateur connecté peut voir les boutons de fermeture
function showCloseButton(pseudo) {
    return isLogged && pseudo === loggedInUser; // affiche le bouton si l'utilisateur est connecté
}

profilLogin.addEventListener("click", function () {
    if (isLogged) {
        formulaireDePost.style.display = "none"; // masque le formulaire de soumission d'article
        loginWindow.style.display = "none"; // masque la fenêtre de login
        isLogged = false; // met la variable de connexion à false
        loginText.innerText = "Login"; // change le texte du bouton en "Login"
        logout(); // appel de la foncion qui déconnecte l'utilisateur
    } else {
        loginWindow.style.display = "block"; // affiche la fenêtre de login à la déconnection
    }
});
