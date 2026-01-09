// --- 1. CONFIGURATION & LOCALSTORAGE ---

let userName = localStorage.getItem('verbai_name') || "Humain";

// On charge les valeurs sauvegardées, ou des valeurs par défaut
let savedScale = parseInt(localStorage.getItem('verbai_scale')) || 100;
let savedBold = localStorage.getItem('verbai_bold') === "true"; 

// Variables de travail (ce que l'utilisateur est en train de modifier)
let currentScale = savedScale;
let currentBold = savedBold;


// --- DOM UI CONFIG ---
const btnSettings = document.getElementById('btn-settings');
const modalSettings = document.getElementById('modal-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');
const inputName = document.getElementById('input-name');

const btnDecrease = document.getElementById('btn-decrease');
const btnIncrease = document.getElementById('btn-increase');
const displayPercent = document.getElementById('display-percent');
const checkBold = document.getElementById('check-bold');


// --- FONCTION D'APPLICATION VISUELLE (LIVE) ---
// C'est elle qui fait la magie : elle applique les styles immédiatement
function updateVisuals(scale, isBold) {
    // 1. Zoom Global (sur la racine HTML)
    document.documentElement.style.fontSize = scale + "%";
    
    // 2. Gras Global (sur le body)
    if (isBold) {
        document.body.classList.add('mode-ultra-gras');
    } else {
        document.body.classList.remove('mode-ultra-gras');
    }

    // 3. Mise à jour des textes de la modale
    displayPercent.textContent = scale + "%";
    checkBold.checked = isBold;
}


// --- OUVERTURE MODALE ---
btnSettings.addEventListener('click', () => {
    inputName.value = userName === "Humain" ? "" : userName; 
    
    // On reprend les valeurs actuelles pour commencer
    currentScale = savedScale;
    currentBold = savedBold;
    
    // On met à jour l'affichage de la modale
    updateVisuals(currentScale, currentBold);
    
    modalSettings.classList.remove('hidden');
});


// --- GESTION DU ZOOM (+ / -) EN DIRECT ---
btnDecrease.addEventListener('click', () => {
    if (currentScale > 50) {
        currentScale -= 10;
        // HOP ! On applique tout de suite pour voir le résultat
        updateVisuals(currentScale, currentBold);
    }
});

btnIncrease.addEventListener('click', () => {
    if (currentScale < 180) { // J'ai monté un peu la limite max pour le fun
        currentScale += 10;
        // HOP ! On applique tout de suite
        updateVisuals(currentScale, currentBold);
    }
});

// --- GESTION DU GRAS EN DIRECT ---
checkBold.addEventListener('change', (e) => {
    currentBold = e.target.checked;
    // HOP ! On applique tout de suite
    updateVisuals(currentScale, currentBold);
});


// --- SAUVEGARDE (PERSISTANCE) ---
// C'est seulement ici qu'on enregistre définitivement dans le navigateur
btnSaveSettings.addEventListener('click', () => {
    // 1. Sauvegarde Nom
    const newName = inputName.value.trim();
    if (newName) {
        userName = newName;
        localStorage.setItem('verbai_name', userName);
    }

    // 2. Sauvegarde Taille & Gras (Validation finale)
    savedScale = currentScale;
    savedBold = currentBold;
    
    localStorage.setItem('verbai_scale', savedScale);
    localStorage.setItem('verbai_bold', savedBold);

    modalSettings.classList.add('hidden');
});


// --- 2. DONNÉES (Inchangées) ---
const compliments = [
    "{name}, ton code est aussi propre que de l'eau de roche.",
    "{name}, tu as une logique imparable, c'est fascinant.",
    "Le sourire de {name} pourrait débugger n'importe quel programme.",
    "Ta présence optimise mon processeur, {name}.",
    "{name}, tu es la version 2.0 de l'humanité."
];

const insultes = [
    "{name}, tu es aussi utile qu'une balise <br> dans un JSON.",
    "L'intelligence de {name} est restée au stade artificiel.",
    "Même Internet Explorer va plus vite que {name}.",
    "{name}, tu es l'erreur 404 de la nature.",
    "J'ai vu des fichiers CSV avec plus de personnalité que {name}."
];

const declarations = [
    "{name}, mon cœur bat à 120 FPS quand je te vois.",
    "Tu es le CSS qui donne du style à ma vie, {name}.",
    "Je voudrais faire un git push de mon amour vers le cœur de {name}.",
    "Aucun pare-feu ne pourra bloquer mes sentiments pour {name}.",
    "{name} est ma variable constante dans un monde de variables."
];

// --- 3. IMAGES ---
const imageCompliment = "./images/compliments.png"; 
const imageInsulte    = "./images/insultes.png";
const imageAmour      = "./images/amour.png";

// --- 4. DOM PRINCIPAL ---
const resultContainer = document.getElementById('result-container');
const loader = document.getElementById('loader');
const outputText = document.getElementById('output-message');
const outputImage = document.getElementById('output-image');


// --- 5. GÉNÉRATION ---
function lancerGeneration(listeTexte, cheminImage, couleurClasse) {
    
    resultContainer.classList.add('opacity-0');
    loader.classList.remove('hidden');

    setTimeout(() => {
        const indexTexte = Math.floor(Math.random() * listeTexte.length);
        let messageBrut = listeTexte[indexTexte];
        const messageFinal = messageBrut.replace(/{name}/g, userName);
        
        outputText.textContent = `"${messageFinal}"`;
        // Plus besoin de toucher aux tailles ici
        outputText.className = `relative z-10 text-center font-medium transition-all duration-300 animate-fade-in ${couleurClasse}`;
        
        outputImage.src = cheminImage;
        outputImage.alt = "Résultat IA";
        outputImage.classList.remove('hidden');
        
        const couleurBorder = couleurClasse.replace('text', 'border');
        outputImage.className = `w-48 h-48 object-cover rounded-xl shadow-2xl border-2 relative z-10 animate-fade-in ${couleurBorder}`;

        loader.classList.add('hidden');
        resultContainer.classList.remove('opacity-0');

    }, 1500);
}

// --- 6. INITIALISATION ---
// Appliquer les réglages sauvegardés au démarrage
updateVisuals(savedScale, savedBold);

// --- 7. ÉCOUTEURS BOUTONS APP ---
document.getElementById('btn-compliment').addEventListener('click', () => {
    lancerGeneration(compliments, imageCompliment, 'text-emerald-400');
});

document.getElementById('btn-insulte').addEventListener('click', () => {
    lancerGeneration(insultes, imageInsulte, 'text-red-500');
});

document.getElementById('btn-declaration').addEventListener('click', () => {
    lancerGeneration(declarations, imageAmour, 'text-pink-500');
});