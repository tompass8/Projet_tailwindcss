// --- Injection du Style "Radical" ---
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
    if(domElements.displayPercent) domElements.displayPercent.textContent = scale + "%";
    if(domElements.checkBold) domElements.checkBold.checked = isBold;
}

// --- Animation de génération ---
export function showResult(text, imagePath, colorClass, domElements) {
    const { resultContainer, loader, outputText, outputImage } = domElements;

    // Start Loader
    resultContainer.classList.add('opacity-0');
    loader.classList.remove('hidden');

    setTimeout(() => {
        // Update Texte
        outputText.textContent = `"${text}"`;
        outputText.className = `relative z-10 text-center font-medium transition-all duration-300 animate-fade-in ${colorClass}`;
        
        // Update Image
        outputImage.src = imagePath;
        outputImage.alt = "Résultat IA";
        outputImage.classList.remove('hidden');
        
        const borderColor = colorClass.replace('text', 'border');
        outputImage.className = `w-48 h-48 object-cover rounded-xl shadow-2xl border-2 relative z-10 animate-fade-in ${borderColor}`;

        // Stop Loader
        loader.classList.add('hidden');
        resultContainer.classList.remove('opacity-0');
    }, 1500);
}