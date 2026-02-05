// --- Fonctions Visuelles ---
export function updateVisuals(scale, isBold, domElements) {
    // Zoom
    document.documentElement.style.fontSize = scale + "%";
    
    // Gras
    if (isBold) {
        document.body.classList.add('mode-ultra-gras');
    } else {
        document.body.classList.remove('mode-ultra-gras');
    }

    // Mise à jour textes modale
    if(domElements.DISPLAY_PERCENT) domElements.DISPLAY_PERCENT.textContent = scale + "%";
    if(domElements.CHECK_BOLD) domElements.CHECK_BOLD.checked = isBold;
}

// --- Animation de génération ---
export function showResult(text, imagePath, colorClass, domElements) {
    const { 
        RESULT_CONTAINER, 
        LOADER, 
        OUTPUT_TEXT, 
        OUTPUT_IMAGE 
    } = domElements;

    // Start Loader
    RESULT_CONTAINER.classList.add('opacity-0');
    LOADER.classList.remove('hidden');

    setTimeout(() => {
        // Update Texte
        OUTPUT_TEXT.textContent = `"${text}"`;
        OUTPUT_TEXT.className = `relative z-10 text-center font-medium transition-all duration-300 animate-fade-in ${colorClass}`;
        
        // Update Image
        OUTPUT_IMAGE.src = imagePath;
        OUTPUT_IMAGE.alt = "Résultat IA";
        OUTPUT_IMAGE.classList.remove('hidden');
        
        const BORDER_COLOR = colorClass.replace('text', 'border');
        OUTPUT_IMAGE.className = `w-48 h-48 object-cover rounded-xl shadow-2xl border-2 relative z-10 animate-fade-in ${BORDER_COLOR}`;

        // Stop Loader
        LOADER.classList.add('hidden');
        RESULT_CONTAINER.classList.remove('opacity-0');
    }, 1500);
}