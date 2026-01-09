// --- 1. CONFIGURATION & LOCALSTORAGE ---

let userName = localStorage.getItem('verbai_name') || "Humain";
let savedScale = parseInt(localStorage.getItem('verbai_scale')) || 100;
let savedBold = localStorage.getItem('verbai_bold') === "true"; 

let currentScale = savedScale;
let currentBold = savedBold;

// --- 2. INJECTION DU STYLE CSS (LA SOLUTION RADICALE) ---
// On crée une balise <style> directement dans le code pour être sûr qu'elle existe
const styleTag = document.createElement('style');
styleTag.innerHTML = `
    .mode-ultra-gras, .mode-ultra-gras * {
        font-family: 'Arial Black', 'Inter', sans-serif !important;
        font-weight: 900 !important;
        text-shadow: 0 0 1px currentColor !important;
        letter-spacing: 0.5px !important;
    }
`;
document.head.appendChild(styleTag);


// --- 3. DOM UI CONFIG ---
const btnSettings = document.getElementById('btn-settings');
const modalSettings = document.getElementById('modal-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');
const inputName = document.getElementById('input-name');

const btnDecrease = document.getElementById('btn-decrease');
const btnIncrease = document.getElementById('btn-increase');
const displayPercent = document.getElementById('display-percent');
const checkBold = document.getElementById('check-bold');


// --- 4. FONCTION D'APPLICATION VISUELLE (LIVE) ---
function updateVisuals(scale, isBold) {
    // Zoom
    document.documentElement.style.fontSize = scale + "%";
    
    // Gras (Ajout/Retrait de la classe définie plus haut)
    if (isBold) {
        document.body.classList.add('mode-ultra-gras');
    } else {
        document.body.classList.remove('mode-ultra-gras');
    }

    // UI Modale
    displayPercent.textContent = scale + "%";
    checkBold.checked = isBold;
}


// --- 5. INTERACTION UTILISATEUR ---

// Ouverture Modale
btnSettings.addEventListener('click', () => {
    inputName.value = userName === "Humain" ? "" : userName; 
    currentScale = savedScale;
    currentBold = savedBold;
    updateVisuals(currentScale, currentBold);
    modalSettings.classList.remove('hidden');
});

// Boutons Zoom
btnDecrease.addEventListener('click', () => {
    if (currentScale > 50) {
        currentScale -= 10;
        updateVisuals(currentScale, currentBold);
    }
});

btnIncrease.addEventListener('click', () => {
    if (currentScale < 180) { 
        currentScale += 10;
        updateVisuals(currentScale, currentBold);
    }
});

// Checkbox Gras
checkBold.addEventListener('change', (e) => {
    currentBold = e.target.checked;
    updateVisuals(currentScale, currentBold);
});

// Sauvegarde
btnSaveSettings.addEventListener('click', () => {
    const newName = inputName.value.trim();
    if (newName) {
        userName = newName;
        localStorage.setItem('verbai_name', userName);
    }

    savedScale = currentScale;
    savedBold = currentBold;
    
    localStorage.setItem('verbai_scale', savedScale);
    localStorage.setItem('verbai_bold', savedBold);

    modalSettings.classList.add('hidden');
});


// --- 6. DONNÉES & GÉNÉRATION ---
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

const imageCompliment = "./images/compliments.png"; 
const imageInsulte    = "./images/insultes.png";
const imageAmour      = "./images/amour.png";

const resultContainer = document.getElementById('result-container');
const loader = document.getElementById('loader');
const outputText = document.getElementById('output-message');
const outputImage = document.getElementById('output-image');


function lancerGeneration(listeTexte, cheminImage, couleurClasse) {
    resultContainer.classList.add('opacity-0');
    loader.classList.remove('hidden');

    setTimeout(() => {
        const indexTexte = Math.floor(Math.random() * listeTexte.length);
        let messageBrut = listeTexte[indexTexte];
        const messageFinal = messageBrut.replace(/{name}/g, userName);
        
        outputText.textContent = `"${messageFinal}"`;
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

// Initialisation au démarrage
updateVisuals(savedScale, savedBold);

document.getElementById('btn-compliment').addEventListener('click', () => {
    lancerGeneration(compliments, imageCompliment, 'text-emerald-400');
});

document.getElementById('btn-insulte').addEventListener('click', () => {
    lancerGeneration(insultes, imageInsulte, 'text-red-500');
});

document.getElementById('btn-declaration').addEventListener('click', () => {
    lancerGeneration(declarations, imageAmour, 'text-pink-500');
});