let articles = []; // tableau pour stocker les articles

let defaultArticles = [
    {
        author: "John Doe",
        emotion: "Découvrez la merveilles cachées des Maldives, où le sable blanc rencontre les eaux cristallines. Chaque jour est une nouvelle aventure sous le soleil éclatant, plongez dans les récifs colorés ou détendez-vous simplement sur une plage isolée. Les Maldives vous attendent pour des vacances inoubliables !",
        img: "./assset/img/maldives2.webp"
    },
    {
        author: "Jane Doe",
        emotion: "Entre les palmiers qui dansent au rythme du vent et les lagons d'un bleu éclatant, les Maldives offrent un refuge de tranquillité au cœur de l'océan Indien. Laissez-vous envoûter par la beauté naturelle de cet archipel et vivez des moments magiques sous le soleil tropical.",
        img: "./assset/img/maldives1.webp"
    },
    {
        author: "Jack Doe",
        emotion: "Imaginez-vous flotter sur des eaux turquoise, entouré par une myriade de poissons tropicaux aux couleurs vives. Les Maldives sont bien plus qu'une destination de rêve, c'est une expérience sensorielle où chaque instant éveille vos sens et vous laisse des souvenirs impérissables.",
        img: "./assset/img/maldives3.webp"
    }
];

// fonction pour afficher les posts par défaut
function showDefaultPosts() {
    let postContainer = document.getElementById('postContainer'); // sélectionne le conteneur des posts
    postContainer.innerHTML = ""; // vide le conteneur

    for (let post of defaultArticles) { 
        let template = `
            <article class="janeDoe">
                <div class="profil">
                    <div class="tete"></div>
                    <div class="corps"></div>
                </div>
                <h2>Posté par: ${post.author}</h2>
                <p>${post.emotion}</p>
                <img class="imgPost" src="${post.img}" alt="">
                <img class="flowerLike" src="./assset/img/variante-de-fleur.png">
            </article>
        `;

        let articleElement = document.createElement('div'); // crée un élément div
        articleElement.innerHTML = template.trim(); // insère le template HTML dans la div
        let article = articleElement.firstChild; // sélectionne le premier enfant de la div

        postContainer.appendChild(article); // ajoute l'article au conteneur des posts
    }
}
