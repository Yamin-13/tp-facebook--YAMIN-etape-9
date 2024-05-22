let friendsContainer = document.querySelector('.myfriends');

fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((users) => {
        const utilisateurs = users.slice(0, 5);
        // Filtrer les 5 premiers
        utilisateurs
        for (let user of utilisateurs) {
            let friend = document.createElement("div");
            friend.innerHTML = `
        
            <div class="fiend">
                <div class="tete"></div>
                <div class="corps"></div>
                </div>
                <figcaption>${user.name}</figcaption> `;

            friendsContainer.appendChild(friend);
        }
    })

// ==========================================

