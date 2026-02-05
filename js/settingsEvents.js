import { DOM } from './constants.js';
import { state, saveName, saveSettings } from './state.js';
import { updateVisuals } from './ui.js';

export function initSettingsEvents(dom) {
    let tempScale = state.scale;
    let tempBold = state.isBold;

    DOM.BTN_SETTINGS.addEventListener('click', () => {
        DOM.INPUT_NAME.value = state.name === "Humain" ? "" : state.name;
        tempScale = state.scale;
        tempBold = state.isBold;
        updateVisuals(tempScale, tempBold, DOM);
        DOM.MODAL_SETTINGS.classList.remove('hidden');
    });

    DOM.BTN_DECREASE.addEventListener('click', () => {
        if (tempScale > 50) {
            tempScale -= 10;
            updateVisuals(tempScale, tempBold, DOM);
        }
    });

    DOM.BTN_INCREASE.addEventListener('click', () => {
        if (tempScale < 180) {
            tempScale += 10;
            updateVisuals(tempScale, tempBold, DOM);
        }
    });

    DOM.CHECK_BOLD.addEventListener('change', (e) => {
        tempBold = e.target.checked;
        updateVisuals(tempScale, tempBold, DOM);
    });

    DOM.BTN_SAVE.addEventListener('click', () => {
        const NEW_NAME = DOM.INPUT_NAME.value.trim();
        if (NEW_NAME) saveName(NEW_NAME);

        saveSettings(tempScale, tempBold);
        DOM.MODAL_SETTINGS.classList.add('hidden');
    });
}