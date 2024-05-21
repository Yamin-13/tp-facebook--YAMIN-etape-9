// Sélection des éléments nécessaires
let rond = document.querySelector('#rond');
let fond = document.querySelector("#fond");
let body = document.body;

// Fonction pour définir le thème clair
function themeClaire() {
    body.style.backgroundColor = "white";
    fond.style.display = "flex";
    fond.style.justifyContent = "flex-end";
    rond.style.backgroundColor = "#118AB2"; // couleur du cercle clair
    fond.style.backgroundColor = "#FDF5BF"; // couleur du fond clair
    localStorage.setItem('theme', 'claire'); // ca sauvegarde le thème dans localStorage
}

// Fonction pour définir le thème sombre
function themeSombre() {
    body.style.backgroundColor = "grey";
    fond.style.display = "flex";
    fond.style.justifyContent = "flex-start";
    rond.style.backgroundColor = "#A5C4D4"; // couleur du cercle sombre
    fond.style.backgroundColor = "#3a5743"; // couleur du fond sombre
    localStorage.setItem('theme', 'sombre'); // ca sauvegarde le thème dans localStorage
}

// ca applique le thème sauvegardé dans le local storage
function themeSaved() {
    let theme = localStorage.getItem('theme');
    if (theme == 'sombre') {
        themeSombre();
    } else {
        themeClaire();
    }
}

// ca applique le thème sauvegardé au chargement de la page avec l'evenement DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    themeSaved();
});

// Au clic sur le curseur
rond.addEventListener("click", function () {
    if (body.style.backgroundColor == "white") {
        themeSombre();
    } else if (body.style.backgroundColor == "grey") {
        themeClaire();
    }
});
