// Récupération initiale
export const state = {
    name: localStorage.getItem('verbai_name') || "Humain",
    scale: parseInt(localStorage.getItem('verbai_scale')) || 100,
    isBold: localStorage.getItem('verbai_bold') === "true"
};

// Fonctions de sauvegarde
export function saveName(newName) {
    state.name = newName;
    localStorage.setItem('verbai_name', newName);
}

export function saveSettings(newScale, newBold) {
    state.scale = newScale;
    state.isBold = newBold;
    localStorage.setItem('verbai_scale', newScale);
    localStorage.setItem('verbai_bold', newBold);
}