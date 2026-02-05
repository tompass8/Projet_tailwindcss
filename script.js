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
function handleInteraction(btnId, type, textOrFn, colorClass, ringClass) {
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

        const text = typeof textOrFn === 'function' ? textOrFn() : textOrFn;
        message.textContent = text;
        // On utilise des couleurs plus foncées (700) pour le contraste texte
        message.className = `text-2xl text-center ${colorClass} font-bold min-h-[4rem] flex items-center justify-center px-2 drop-shadow-sm`;
    });
}

async function initInteractions() {
    try {
        const response = await fetch('./responses.json');
        if (!response.ok) {
            throw new Error(`Erreur chargement JSON: ${response.status}`);
        }

        const data = await response.json();
        if (!Array.isArray(data.buttons)) {
            throw new Error('Format JSON invalide: buttons manquant');
        }

        const textPools = {};
        const nextText = (type, texts, fallback) => {
            const pool = textPools[type];
            if (!pool || pool.length === 0) {
                const source = Array.isArray(texts) && texts.length > 0 ? texts : [fallback];
                const shuffled = source.slice();
                for (let i = shuffled.length - 1; i > 0; i -= 1) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
                }
                textPools[type] = shuffled;
            }
            return textPools[type].pop();
        };

        data.buttons.forEach((btn) => {
            const getText = () => nextText(btn.type, btn.texts, btn.text);
            handleInteraction(btn.id, btn.type, getText, btn.colorClass);
        });
    } catch (error) {
        // Fallback si le JSON n'est pas chargeable ou mal formaté
        handleInteraction('btn-compliment', 'compliment', "Oh merci, c'est gentil ! Mais c'est moi qui doit te complimenter.", "text-green-700");
        handleInteraction('btn-insulte', 'insulte', "Hé ! Pourquoi tant de haine ? Laisse-moi t'insulter gentiment en retour !", "text-red-700");
        handleInteraction('btn-declaration', 'declaration', "C'est vrai ? Je t'aime aussi ! Mais laisse moi te le dire autrement.", "text-pink-700");
        console.error(error);
    }
}

// Appel des fonctions via JSON
initInteractions();


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