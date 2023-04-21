// Récupération des projetws depuis l'API
const url = "http://localhost:5678/api/works";
async function getProjects(url) {
    const res = await fetch(url);
    let works = await res.json();
    return works;
}


function fetchProjets(works, container = ".gallery", modal = false) {
    for (let i = 0; i < works.length; i++) {

        const article = works[i];

        const galleryProjet = document.querySelector(container);

        // Création balise des projets
        const projet = document.createElement("figure");
        projet.dataset.workId = article.id
        projet.classList.add("figure-homepage")
        // Ajout icone "trash" à la modal et function deleteWork
        if (modal) {
            projet.classList.add("figure-modal")
            projet.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6"><path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" /></svg>`
            projet.querySelector("svg").addEventListener("click", (e) => {
                e.preventDefault();
                deleteWork(article.id);
            })
            document.getElementById("supression-gallerie").addEventListener("click", (e) => {
                e.preventDefault();
                deleteGallery(article.id);
            })
        }
        // Création des autres balises
        const imageProjet = document.createElement("img");
        imageProjet.src = article.imageUrl;
        const titleProjet = document.createElement("figcaption");
        titleProjet.innerText = article.title;
        imageProjet.alt = article.title;

        // On rattache la balise article a la section Fiches
        galleryProjet.appendChild(projet);
        projet.appendChild(imageProjet);
        projet.appendChild(titleProjet);
    }
    // Remplacement de tout les figcaptions de la modale par "éditer"
    const figcaptionModals = document.querySelectorAll("#gallery-modal figcaption");
    for (let i = 0; i < figcaptionModals.length; ++i) {
        figcaptionModals[i].innerText = "éditer";
    }
}


document.querySelector(".gallery").innerHTML = "";
// Ajout des projets à la galerie
let works = null;
getProjects(url).then((wrk) => {
    works = wrk;
    fetchProjets(wrk);
    fetchProjets(wrk, "#gallery-modal", true);
})

// Création des boutons de filtres
const boutonTous = document.getElementById('btn-filtrer-tous');
boutonTous.addEventListener("click", () => {
    document.querySelector(".gallery").innerHTML = "";
    fetchProjets(works);
});

const boutonObjets = document.getElementById('btn-filtrer-objets');
boutonObjets.addEventListener("click", () => {
    const projetsFiltreesObjets = works.filter((work) => {
        if (work.category.name == "Objets") {
            return true;
        }
        return false;
    });
    document.querySelector(".gallery").innerHTML = "";
    fetchProjets(projetsFiltreesObjets);
});

const boutonAppartements = document.getElementById('btn-filtrer-appartements');
boutonAppartements.addEventListener("click", () => {
    const projetsFiltreesAppartements = works.filter((work) => {
        if (work.category.name == "Appartements") {
            return true;
        }
        return false;
    });
    document.querySelector(".gallery").innerHTML = "";
    fetchProjets(projetsFiltreesAppartements);
});

const boutonHotelsRestaurants = document.getElementById('btn-filtrer-hotels-restaurants');
boutonHotelsRestaurants.addEventListener("click", () => {
    const projetsFiltreesHotelsRestaurants = works.filter((work) => {
        if (work.category.name == "Hotels & restaurants") {
            return true;
        }
        return false;
    });
    document.querySelector(".gallery").innerHTML = "";
    fetchProjets(projetsFiltreesHotelsRestaurants);
});


// Ajout des éléments apparaissant à la connexion
const editBarre = document.getElementById("edit-barre")
const modeEdition = document.getElementById("mode-edition")
const navLogin = document.getElementById("login-link")
const navLogout = document.getElementById("logout-link")
const modifierArticle = document.getElementById("modifier-article")
const modifier1 = document.getElementById("modifier-1")
const modifier2 = document.getElementById("modifier-2")
const filtres = document.getElementById("filtres")

if (localStorage.getItem("token")) {
    editBarre.style.display = "flex";
    modeEdition.style.display = "inline";
    navLogin.style.display = "none";
    navLogout.style.display = "inline";
    modifierArticle.style.display = "block";
    modifier1.style.display = "block";
    modifier2.style.display = "block";
    filtres.style.display = "none";
}

navLogout.addEventListener("click", () => {
    localStorage.clear();
    window.location = "index.html";
})

// Création fontion supression work
function deleteWork(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(() => {
            const elementDelete = document.querySelectorAll(`[data-work-id="${id}"]`);
            elementDelete.forEach((work) => {
                work.remove();
            })

        })
}


// Création fontion supression gallery
function deleteGallery(id) {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    })
        .then(() => {
            const elementDelete = document.querySelectorAll(`[data-work-id="${id}"]`);
            for (let i = 0; i < elementDelete.length; ++i) {
                elementDelete[i].remove();
            }
        })
}


// Affichage de l'image à ajouter
document.querySelector('[name="image-file"]').addEventListener('change', (e) => {
    const file = e.target.files[0];
    const src = URL.createObjectURL(file);
    const img = document.createElement("img");
    img.src = src;
    const previewLabel = document.getElementById("label-file");
    previewLabel.style.display = "none";
    const previewElement = document.getElementById("fieldset-file");
    previewElement.append(img);
})

// Affichage vide du selecteur catégorie de la 2nd modal
document.getElementById("categorie").selectedIndex = -1;

// Création fontion ajout work
const formAjoutProjet = document.querySelector("#form-ajout");
formAjoutProjet.addEventListener("submit", function (e) {
    e.preventDefault();
    // Création de la charge utile au format JSON
    const token = localStorage.getItem("token");
    const data = new FormData();
    data.append("image", e.target.querySelector('[name="image-file"]').files[0]);
    data.append("title", e.target.querySelector('[name="titre"]').value);
    data.append("category", parseInt(e.target.querySelector('[name="categorie"]').value));
    // Vérification des champs remplis
    if ((e.target.querySelector('[name="image-file"]').value !== '') && (e.target.querySelector('[name="titre"]').value !== '') && (e.target.querySelector('[name="categorie"]').value !== '')) {
        var allFields = true
    }

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: data
    }).then((resp) => {
        console.log(resp)
        return resp.json()
    }).then((work) => {
        console.log(work)
        if (allFields) {
            fetchProjets([work]);
            fetchProjets([work], "#gallery-modal", true);
            const contenuModal = document.getElementById("contenu-modal");
            const contenu2ndModal = document.getElementById("contenu-2ndmodal");
            contenuModal.style.display = "none";
            contenu2ndModal.style.display = "none"
        } else {
            throw new Error("Erreur dans l'un des champs")
        }
    }).catch((error) => {
        document.getElementById("error2").textContent = error.message
    })

})

