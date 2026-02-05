import { DOM, STATE } from './constants.js';
import { saveName, saveSettings } from './state.js';
import { updateVisuals } from './ui.js';

export function initSettingsEvents(dom) {
    let tempScale = STATE.scale;
    let tempBold = STATE.isBold;

    DOM.BTN_SETTINGS.addEventListener('click', () => {
        DOM.INPUT_NAME.value = STATE.name === "Humain" ? "" : STATE.name;
        tempScale = STATE.scale;
        tempBold = STATE.isBold;
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