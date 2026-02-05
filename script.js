const image = document.getElementById('avatar-img');
const message = document.getElementById('output-message');
let etatValide = 'neutre';

// Structure de données enrichie avec le texte Alt pour l'accessibilité
const sources = {
    neutre: {
        src: "./images/neutral.png",
        alt: "Personnage avec une expression neutre"
    },
    compliment: {
        off: "./images/happy_off.png",
        on: "./images/happy_on.png",
        alt: "Personnage souriant et joyeux"
    },
    insulte: {
        off: "./images/angry_off.png",
        on: "./images/angry_on.png",
        alt: "Personnage en colère avec les sourcils froncés"
    },
    declaration: {
        off: "./images/love_off.png",
        on: "./images/love_on.png",
        alt: "Personnage amoureux avec des coeurs dans les yeux"
    }
};

function restoreState() {
    if (etatValide === 'neutre') {
        image.src = sources.neutre.src;
        image.alt = sources.neutre.alt;
    } else {
        image.src = sources[etatValide].on;
        image.alt = sources[etatValide].alt;
    }
}

// Fonction générique pour gérer les interactions (évite la répétition)
function handleInteraction(btnId, type, text, colorClass, ringClass) {
    const btn = document.getElementById(btnId);

    btn.addEventListener('mouseenter', () => {
        image.src = sources[type].off;
        image.alt = sources[type].alt + " (aperçu)";
    });

    btn.addEventListener('mouseleave', restoreState);

    btn.addEventListener('click', () => {
        etatValide = type;
        image.src = sources[type].on;
        image.alt = sources[type].alt; // Mise à jour importante pour les aveugles

        message.textContent = text;
        // On utilise des couleurs plus foncées (700) pour le contraste texte
        message.className = `text-2xl text-center ${colorClass} font-bold min-h-[4rem] flex items-center justify-center px-2 drop-shadow-sm`;
    });
}

// Appel des fonctions avec des couleurs ajustées pour le contraste (700 au lieu de 600/500)
handleInteraction('btn-compliment', 'compliment', "Oh merci, c'est gentil !", "text-green-700");
handleInteraction('btn-insulte', 'insulte', "Hé ! Pourquoi tant de haine ?", "text-red-700");
handleInteraction('btn-declaration', 'declaration', "C'est vrai ? Je t'aime aussi ❤️", "text-pink-700");


// Gestion du Zoom
let currentZoom = 1;
const zoomContainer = document.getElementById('zoom-container');
const zoomDisplay = document.getElementById('zoom-display');

function changeZoom(amount) {
    currentZoom += amount;
    if (currentZoom < 0.5) currentZoom = 0.5;
    if (currentZoom > 2.0) currentZoom = 2.0;
    applyZoom();
}

function resetZoom() {
    currentZoom = 1;
    applyZoom();
}

function applyZoom() {
    zoomContainer.style.zoom = currentZoom;
    zoomDisplay.textContent = Math.round(currentZoom * 100) + "%";
}