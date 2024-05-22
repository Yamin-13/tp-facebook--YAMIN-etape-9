document.querySelector('#postForm').addEventListener('submit', function (event) {
    event.preventDefault(); // ca empêche la soumission par défaut du formulaire

    // Récupère les valeurs du formulaire
    let author = localStorage.getItem('loggedInUser') || 'Anonyme'; // ca utilise le pseudo stocké ou 'Anonyme'
    let emotion = document.getElementById('emotion').value.trim();
    let fileInput = document.getElementById('fileInput');
    let city = localStorage.getItem('userCity') || 'Ville inconnue'; // ca récupère la ville de localStorage ou 'Ville inconnue'

    // objet FileReader pour uploadé des images en utilisant le formulaire de post
    let imgURL = ''; // Initialiser une variable pour stocker l'URL de l'image
    if (fileInput.files.length > 0) { // vérifie si un fichier a été sélectionné
        let file = fileInput.files[0]; // Récupère le fichier
        let reader = new FileReader(); // Crée un lecteur de fichier
        reader.onload = function (e) {
            imgURL = e.target.result; // stocke l'URL de l'image

            // crée un nouveau post avec le pseudo de l'utilisateur connecté et la ville
            let post = {
                author: `${author} à ${city}`, // Ajoute la ville au message
                emotion: emotion,
                img: imgURL // Utilise l'URL de l'image si une image est sélectionnée
            };

            // Ajoute le nouveau post au tableau des articles
            articles.push(post);
            saveArticles(); // Sauvegarde les articles
            selectArticles(); 

            // Réinitialise le formulaire
            document.getElementById('name').value = '';
            document.getElementById('emotion').value = '';
            fileInput.value = ''; // Réinitialise le champ de fichier
        };
        reader.readAsDataURL(file); // Lit le fichier comme une URL de données
    } else {
        // Si aucune image n'est sélectionnée, créer un post sans image
        let post = {
            author: `${author} à ${city}`, // Ajoute la ville au message
            emotion: emotion,
            img: '' // Pas d'image
        };

        // Ajoute le nouveau post au tableau des articles
        articles.push(post);
        saveArticles(); // Sauvegarde les articles
        selectArticles(); // Met à jour l'affichage des articles

        // Réinitialise le formulaire
        document.getElementById('name').value = '';
        document.getElementById('emotion').value = '';
        fileInput.value = ''; // Réinitialise le champ de fichier
    }
});

function selectArticles() {
    let postContainer = document.getElementById('postContainer'); // Sélectionne le conteneur des posts
    postContainer.innerHTML = ""; // Vide le conteneur avant d'ajouter les articles

    // Affiche les posts par défaut
    showDefaultPosts();

    for (let post of articles) { // Pour chaque article
        let template = `
            <article class="janeDoe">
                <div class="close" style="display: ${isLogged ? 'block' : 'none'};">
                    <div class="horizontal"></div>
                    <div class="vertical"></div>
                </div>
                <div class="profil">
                    <div class="tete"></div>
                    <div class="corps"></div>
                </div>
                <h2>Posté par: ${post.author}</h2>
                <p>${post.emotion}</p>
                ${post.img ? `<img class="imgPost" src="${post.img}" alt="Image Post">` : ''}
                <img class="flowerLike" src="./assset/img/variante-de-fleur.png">
            </article>
        `;

        let articleElement = document.createElement('div'); // Crée un élément div
        articleElement.innerHTML = template.trim(); // Insère le template HTML dans la div
        let article = articleElement.firstChild; // Sélectionne le premier enfant de la div

        let closeDiv = article.querySelector('.close');
        if (closeDiv && showCloseButton(post.author.split(' à ')[0])) { // Vérifie si le bouton de fermeture doit être affiché
            closeDiv.addEventListener('click', function () {
                articles = articles.filter(a => a !== post); // Supprime l'article du tableau
                saveArticles(); // Sauvegarde les articles
                article.remove(); // Supprime l'article de l'affichage
            });
        }
        postContainer.appendChild(article); // Ajoute l'article au conteneur des posts
        // ca ajoute un nouvel article à chaque fois, postContainer est le parent et article est l'enfant qui existe déjkà
        // ca insère le nouvel article avant le premier article 
        let firstArticle = postContainer.firstChild;
        postContainer.insertBefore(article, firstArticle);


    }

    // Gestion des likes sur les articles
    let likeButtons = document.querySelectorAll('.flowerLike');
    likeButtons.forEach(button => {
        button.addEventListener('click', function () {
            let isFlowerImage = button.src.includes('variante-de-fleur.png');
            button.src = isFlowerImage ? './assset/img/petales-de-fleur.png' : './assset/img/variante-de-fleur.png';
        });
    });
}

function loadArticles() {
    let storedArticles = localStorage.getItem('articles'); // récupère les articles du localStorage
    if (storedArticles) {
        articles = JSON.parse(storedArticles); // charge les articles depuis le localStorage
    }
    selectArticles(); // sélectione et affiche les articles
}

function saveArticles() {
    localStorage.setItem('articles', JSON.stringify(articles)); // sauvegarde les articles dans le localStorage
}

document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem("isLogged") === "true") {
        showArticleForm(); // appel de la fonction qui affiche le formulaire de soumission d'article
        loadArticles(); // appel de la fonction qui charge les articles
    } else {
        isLogged = false; // s'assure que l'utilisateur est déconnecté
        showDefaultPosts(); 
        loadArticles(); 
    }
});