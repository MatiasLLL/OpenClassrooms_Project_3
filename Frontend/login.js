const formLogin = document.querySelector("#login-form");

formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    // Création de l’objet de la nouvelle connexion.
    const user = {
        email: e.target.querySelector("[name=email]").value,
        password: e.target.querySelector("[name=password]").value,
    };
    // Création de la charge utile au format JSON
    const data = JSON.stringify(user);
    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: data
    }).then((data) => {
        console.log(data)
        if (data.ok) {
            return data.json()
        } else {
            throw new Error("Erreur dans l'identifiant ou le mot de passe")
        }
    }).then((data) => {
        localStorage.setItem("token", data.token)
        localStorage.setItem("userId", data.userId)
        window.location = "index.html";
    }).catch((error) => {
        document.getElementById("error").textContent = error.message
    })
})

