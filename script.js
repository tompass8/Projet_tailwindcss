// --- 1. CONFIGURATION & LOCALSTORAGE ---
let userName = localStorage.getItem('verbai_name') || "Humain"; // Récupère le nom ou met "Humain" par défaut

// Gestion du panneau de config
const btnSettings = document.getElementById('btn-settings');
const modalSettings = document.getElementById('modal-settings');
const btnSaveSettings = document.getElementById('btn-save-settings');
const inputName = document.getElementById('input-name');

// Ouvrir la modale
btnSettings.addEventListener('click', () => {
    inputName.value = userName === "Humain" ? "" : userName; // Pré-remplir
    modalSettings.classList.remove('hidden');
});

// Sauvegarder et fermer
btnSaveSettings.addEventListener('click', () => {
    const newName = inputName.value.trim();
    if (newName) {
        userName = newName;
        localStorage.setItem('verbai_name', userName); // Sauvegarde dans le navigateur
    }
    modalSettings.classList.add('hidden');
});


// --- 2. DONNÉES (Avec placeholder {name}) ---
// Le code remplacera automatiquement "{name}" par le prénom de l'utilisateur

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

// --- 3. IMAGES (Fixes) ---
const imageCompliment = "./images/compliments.png"; 
const imageInsulte    = "./images/insultes.png";
const imageAmour      = "./images/amour.png";

// --- 4. SÉLECTION DU DOM ---
const resultContainer = document.getElementById('result-container'); // Conteneur global du résultat
const loader = document.getElementById('loader'); // Le spinner
const outputText = document.getElementById('output-message');
const outputImage = document.getElementById('output-image');

// --- 5. FONCTION PRINCIPALE (Avec Loading State) ---
function lancerGeneration(listeTexte, cheminImage, couleurClasse) {
    
    // ÉTAT 1 : CHARGEMENT
    // On cache le résultat précédent et on montre le spinner
    resultContainer.classList.add('opacity-0'); // Disparition douce
    loader.classList.remove('hidden');

    // On attend 1.5 secondes (1500 ms) pour simuler le calcul de l'IA
    setTimeout(() => {
        
        // ÉTAT 2 : GÉNÉRATION DU RÉSULTAT
        // 1. Choix du texte
        const indexTexte = Math.floor(Math.random() * listeTexte.length);
        let messageBrut = listeTexte[indexTexte];
        
        // 2. Remplacement du nom (Logique dynamique)
        const messageFinal = messageBrut.replace(/{name}/g, userName);
        
        // 3. Mise à jour du DOM
        outputText.textContent = `"${messageFinal}"`;
        outputText.className = `relative z-10 text-2xl md:text-3xl text-center font-medium transition-all duration-300 animate-fade-in ${couleurClasse}`;

        outputImage.src = cheminImage;
        outputImage.alt = "Résultat IA";
        outputImage.classList.remove('hidden');
        
        const couleurBorder = couleurClasse.replace('text', 'border');
        outputImage.className = `w-48 h-48 object-cover rounded-xl shadow-2xl border-2 relative z-10 animate-fade-in ${couleurBorder}`;

        // ÉTAT 3 : AFFICHAGE
        // On cache le loader et on réaffiche le conteneur
        loader.classList.add('hidden');
        resultContainer.classList.remove('opacity-0'); // Réapparition douce

    }, 1500); // Fin du délai
}

// --- 6. ÉCOUTEURS ---
document.getElementById('btn-compliment').addEventListener('click', () => {
    lancerGeneration(compliments, imageCompliment, 'text-emerald-400');
});

document.getElementById('btn-insulte').addEventListener('click', () => {
    lancerGeneration(insultes, imageInsulte, 'text-red-500');
});

document.getElementById('btn-declaration').addEventListener('click', () => {
    lancerGeneration(declarations, imageAmour, 'text-pink-500');
});