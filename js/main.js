import { COMPLIMENTS, INSULTES, DECLARATIONS, IMAGES_PATHS, STATE, DOM } from './constants.js';
import { updateVisuals, showResult } from './ui.js';
import { initSettingsEvents } from './settingsEvents.js';

// --- INITIALISATION ---
updateVisuals(STATE.scale, STATE.isBold, DOM);
initSettingsEvents(DOM);

// --- LOGIQUE DE GÉNÉRATION ---
function handleGeneration(list, imgPath, color) {
    const RANDOM_TEXT = list[Math.floor(Math.random() * list.length)];
    const FINAL_TEXT = RANDOM_TEXT.replace(/{name}/g, STATE.name);
    showResult(FINAL_TEXT, imgPath, color, DOM);
}

// --- ÉVÉNEMENTS BOUTONS PRINCIPAUX ---
document.getElementById('btn-compliment').addEventListener('click', () => 
    handleGeneration(COMPLIMENTS, IMAGES_PATHS.compliment, 'text-emerald-400'));

document.getElementById('btn-insulte').addEventListener('click', () => 
    handleGeneration(INSULTES, IMAGES_PATHS.insulte, 'text-red-500'));

document.getElementById('btn-declaration').addEventListener('click', () => 
    handleGeneration(DECLARATIONS, IMAGES_PATHS.amour, 'text-pink-500'));