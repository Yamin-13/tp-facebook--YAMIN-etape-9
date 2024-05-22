let ACCESS_KEY = 'u_8LEQjiGqILDDg3AGoulVVPzqRPLJFNF8qIxY2JbyI'; // clé API Unsplash

// commentaires documentation mozilla.org, openclassroom, livre "oh mycode je parle le js"
document.addEventListener('DOMContentLoaded', async () => {
    // 'DOMContentLoaded', événement qui se déclenche lorsque le HTML du document a été complètement chargé et vu
    // 'async' avant la fonction indique que cette fonction va contenir des opérations asynchrones (comme 'await')

    try {
        // 'try' essaye un code qui va tenter d'exécuter les instructions et capturer les erreurs s'il y en a
        
        let response = await fetch(`https://api.unsplash.com/search/photos?client_id=${ACCESS_KEY}&query=flowerbouquet&per_page=30`);
        // 'await' attend que la promesse renvoyée par 'fetch' soit résolue
        // ensuite 'fetch' envoie une requête réseau et retourne une promesse qui se résout avec une réponse
        // 'response' contient l'objet réponse de la requête HTTP à l'API Unsplash

        let data = await response.json();
        // 'response.json()'  ca lit la réponse et la convertit en un objet JavaScript
        // 'data' contient les données renvoyées par l'API Unsplash (la reponse)

        let images = data.results;
        // 'images' extrait la liste des résultats (images) dee la reponse de l'api

        let compteurIndex = 0;
        // 'compteurIndex' c'est un compteur pour suivre l'index de l'image actuelle affichée (0= 1er index)

        if (images.length === 0) {
            // Vérifie si aucune image n'a été trouvée

            document.getElementById('imageInfo').innerText = 'Aucune image trouvée';
            // Affiche le message 'Aucune image trouvée' si aucune image n'est retournée

            document.getElementById('imageElement').style.display = 'none';
            // Cache l'élément d'image s'il n'y a pas d'images à afficher

            return;
            // ca termine l'exécution de la fonction si aucune image n'est trouvée
        }

        let showNextImage = () => {
            // declar une fonction pour afficher la prochaine image

            let image = images[compteurIndex];
            // sélectionne l'image actuelle à afficher en utilisant 'compteurIndex'

            document.getElementById('imageInfo').innerHTML = `<strong>Photographe:</strong> ${image.user.name || 'Inconnu'}<br><strong>Description:</strong> ${image.alt_description || 'Pas de description disponible'}`;
            // met à jour les informations de l'image (nom du photographe et description) dans l'élément 'imageInfo'

            document.getElementById('imageElement').src = image.urls.regular || 'https://via.placeholder.com/150';
            // met à jour la source de l'élément d'image pour afficher l'image actuelle

            document.getElementById('imageElement').style.display = 'block';
            // Affiche l'élément d'image

            compteurIndex = (compteurIndex + 1) % images.length;
            // ajoute 'compteurIndex' et le remet à 0 lorsqu'il atteint la fin de la liste des images ( c'est pour un défilement circulaire)
        };

        showNextImage();
        // Affiche la première image immédiatement

        setInterval(showNextImage, 3000); // Change d'image toutes les 10 secondes
        // Utilise 'setInterval' pour appeler 'showNextImage' toutes les 10 secondes, créant ainsi un diaporama automatique
    } catch (error) {
        // 'catch' capture et gère les erreurs survenues dans le bloc 'try'        
        console.log(error);
    }
});
