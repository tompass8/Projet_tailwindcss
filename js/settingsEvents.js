import { STATE } from './constants.js';
import { saveName, saveSettings } from './state.js';
import { updateVisuals } from './ui.js';

export function initSettingsEvents(dom) {
    // Variables locales pour la modale
    let tempScale = STATE.scale;
    let tempBold = STATE.isBold;

    dom.BTN_SETTINGS.addEventListener('click', () => {
        dom.INPUT_NAME.value = STATE.name === "Humain" ? "" : STATE.name;
        tempScale = STATE.scale;
        tempBold = STATE.isBold;
        updateVisuals(tempScale, tempBold, dom);
        dom.MODAL_SETTINGS.classList.remove('hidden');
    });

    dom.BTN_DECREASE.addEventListener('click', () => {
        if (tempScale > 50) {
            tempScale -= 10;
            updateVisuals(tempScale, tempBold, dom);
        }
    });

    dom.BTN_INCREASE.addEventListener('click', () => {
        if (tempScale < 180) {
            tempScale += 10;
            updateVisuals(tempScale, tempBold, dom);
        }
    });

    dom.CHECK_BOLD.addEventListener('change', (e) => {
        tempBold = e.target.checked;
        updateVisuals(tempScale, tempBold, dom);
    });

    dom.BTN_SAVE.addEventListener('click', () => {
        const NEW_NAME = dom.INPUT_NAME.value.trim();
        if (NEW_NAME) saveName(NEW_NAME);

        saveSettings(tempScale, tempBold);
        dom.MODAL_SETTINGS.classList.add('hidden');
    });
}