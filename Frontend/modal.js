const contenuModal = document.getElementById("contenu-modal")
// Ouverture modal
const openModal = document.querySelectorAll(".open-modal");
openModal.forEach(open => {
    open.addEventListener("click", () => {
        contenuModal.style.display = "flex"
    })
})

const contenu2ndModal = document.getElementById("contenu-2ndmodal")
// Ouverture 2nd modal
const open2ndModal = document.getElementById("ajout-photo");
open2ndModal.addEventListener("click", () => {
    contenu2ndModal.style.display = "flex";
})

const returnTo1stModal = document.getElementById("fleche-retour")
returnTo1stModal.addEventListener("click", () => {
    contenu2ndModal.style.display = "none"
})

// Fermeture modal
const closeModal = document.querySelectorAll(".close-modal");
closeModal.forEach(close => {
    close.addEventListener("click", () => {
        contenuModal.style.display = "none";
        contenu2ndModal.style.display = "none"
    })
})

window.onclick = function (event) {
    const myBox = document.getElementById("modal-wrapper");
    const my2ndBox = document.getElementById("modal-2ndwrapper");    
    if ((event.target.contains(myBox) && event.target !== myBox) || (event.target.contains(my2ndBox) && event.target !== my2ndBox)) {
            contenuModal.style.display = "none";
            contenu2ndModal.style.display = "none"
        }
    
}

