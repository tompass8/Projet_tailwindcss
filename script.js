// --- 1. DONNÉES TEXTES (Aléatoires) ---
const compliments = [
    "Ton code est aussi propre que de l'eau de roche.",
    "Tu as une logique imparable, c'est fascinant.",
    "Ton sourire pourrait débugger n'importe quel programme.",
    "Ta présence optimise mon processeur.",
    "Tu es la version 2.0 de l'humanité."
];

const insultes = [
    "Tu es aussi utile qu'une balise <br> dans un JSON.",
    "Ton intelligence artificielle est restée au stade artificiel.",
    "Même Internet Explorer va plus vite que toi.",
    "Tu es l'erreur 404 de la nature.",
    "J'ai vu des fichiers CSV avec plus de personnalité."
];

const declarations = [
    "Mon cœur bat à 120 FPS quand je te vois.",
    "Tu es le CSS qui donne du style à ma vie.",
    "Je voudrais faire un git push de mon amour vers ton cœur.",
    "Aucun pare-feu ne pourra bloquer mes sentiments.",
    "Tu es ma variable constante dans un monde de variables."
];

// --- 2. DONNÉES IMAGES (Fixes) ---

// Note bien le ".png" et le "s" à la fin de compliments et insultes
const imageCompliment = "./images/compliments.png"; 
const imageInsulte    = "./images/insultes.png";
const imageAmour      = "./images/amour.png";

// --- 3. SÉLECTION DU DOM ---
const outputText = document.getElementById('output-message');
const outputImage = document.getElementById('output-image');

const btnCompliment = document.getElementById('btn-compliment');
const btnInsulte = document.getElementById('btn-insulte');
const btnDeclaration = document.getElementById('btn-declaration');


// --- 4. FONCTION ---
// Elle prend maintenant un chemin d'image unique (string) et non plus une liste
function genererMessage(listeTexte, cheminImageUnique, couleurTextClasse) {
    
    // --- A. GESTION DU TEXTE (Reste aléatoire) ---
    outputText.classList.remove('animate-fade-in');
    void outputText.offsetWidth; // Reset animation
    
    const indexTexte = Math.floor(Math.random() * listeTexte.length);
    outputText.textContent = `"${listeTexte[indexTexte]}"`;
    outputText.className = `relative z-10 text-2xl md:text-3xl text-center font-medium transition-all duration-300 animate-fade-in ${couleurTextClasse}`;

    // --- B. GESTION DE L'IMAGE (Fixe) ---
    outputImage.classList.remove('animate-fade-in');
    void outputImage.offsetWidth; // Reset animation

    // On applique l'image définie
    outputImage.src = cheminImageUnique;
    outputImage.alt = "Illustration de l'humeur";
         
    // Calcul de la couleur de la bordure
    const couleurBorderClasse = couleurTextClasse.replace('text', 'border');

    // Affichage et animation
    outputImage.className = `w-48 h-48 object-cover rounded-xl shadow-2xl border-2 relative z-10 animate-fade-in ${couleurBorderClasse}`;
}


// --- 5. ÉCOUTEURS D'ÉVÉNEMENTS ---
btnCompliment.addEventListener('click', () => {
    genererMessage(compliments, imageCompliment, 'text-emerald-400');
});

btnInsulte.addEventListener('click', () => {
    genererMessage(insultes, imageInsulte, 'text-red-500');
});

btnDeclaration.addEventListener('click', () => {
    genererMessage(declarations, imageAmour, 'text-pink-500');
});