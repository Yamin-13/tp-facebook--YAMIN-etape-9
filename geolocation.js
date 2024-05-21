// fonction de géolocalisation pour obtnir la ville de l'utilisateur
function geo(position) {
    let lat = position.coords.latitude;
    let lng = position.coords.longitude;

    // api nominatim en open source https://nominatim.org/release-docs/latest/
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=10`)
        .then(response => response.json())
        .then(data => {
            let city = data.address.city || "Ville inconnue";
            userCity = city; // ca stock la ville dans la variable
            localStorage.setItem('userCity', city); // ca sauvegarde la ville dans le localStorage
        });
}

// ca permet de demander la géolocalisation qune seule fois
if (localStorage.getItem('geolocationAllowed') !== 'true') {
    navigator.geolocation.getCurrentPosition(geo); // ca obtient la position actuelle
    localStorage.setItem('geolocationAllowed', 'true'); // ca sauvegarde bien que la géolocalisation a été autorisée
} else {
    navigator.geolocation.getCurrentPosition(geo); //  obtient la position actuelle
}