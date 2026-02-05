import { compliments, insultes, declarations, imagesPaths } from './data.js';
import { state, saveName, saveSettings } from './state.js';
import { updateVisuals, showResult } from './ui.js';
import { dom } from './constants.js';

// Variables locales pour la modale
let tempScale = state.scale;
let tempBold = state.isBold;

// --- INITIALISATION ---
updateVisuals(state.scale, state.isBold, dom);

// --- ÉVÉNEMENTS SETTINGS ---
dom.btnSettings.addEventListener('click', () => {
    dom.inputName.value = state.name === "Humain" ? "" : state.name;
    tempScale = state.scale;
    tempBold = state.isBold;
    updateVisuals(tempScale, tempBold, dom);
    dom.modalSettings.classList.remove('hidden');
});

dom.btnDecrease.addEventListener('click', () => {
    if (tempScale > 50) {
        tempScale -= 10;
        updateVisuals(tempScale, tempBold, dom);
    }
});

dom.btnIncrease.addEventListener('click', () => {
    if (tempScale < 180) {
        tempScale += 10;
        updateVisuals(tempScale, tempBold, dom);
    }
});

dom.checkBold.addEventListener('change', (e) => {
    tempBold = e.target.checked;
    updateVisuals(tempScale, tempBold, dom);
});

dom.btnSave.addEventListener('click', () => {
    const newName = dom.inputName.value.trim();
    if (newName) saveName(newName);
    
    saveSettings(tempScale, tempBold);
    dom.modalSettings.classList.add('hidden');
});

// --- LOGIQUE DE GÉNÉRATION ---
function handleGeneration(list, imgPath, color) {
    const randomText = list[Math.floor(Math.random() * list.length)];
    const finalText = randomText.replace(/{name}/g, state.name);
    showResult(finalText, imgPath, color, dom);
}

// --- ÉVÉNEMENTS BOUTONS PRINCIPAUX ---
document.getElementById('btn-compliment').addEventListener('click', () => 
    handleGeneration(compliments, imagesPaths.compliment, 'text-emerald-400'));

document.getElementById('btn-insulte').addEventListener('click', () => 
    handleGeneration(insultes, imagesPaths.insulte, 'text-red-500'));

document.getElementById('btn-declaration').addEventListener('click', () => 
    handleGeneration(declarations, imagesPaths.amour, 'text-pink-500'));