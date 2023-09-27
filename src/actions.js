import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { selectorElement, loader, error, catInfo } from "./elements";

const hiddenClass = 'hidden';

function addClass(element, className) {
    if (!element.classList.contains(className)) {
        element.classList.add(className);
    }
}

function removeClass(element, className) {
    if (element.classList.contains(className)) {
        element.classList.remove(className);
    }
}

function showSelectorElement() {
    removeClass(selectorElement, hiddenClass);
}

function showError() {
    Notify.failure(error.textContent, () => { });
}

function hideError() { 
    // addClass(error, hiddenClass);
}

function showLoader() {
    removeClass(loader, hiddenClass);
}

function hideLoader() {
    addClass(loader, hiddenClass);
}

function showCatInfo() { 
    removeClass(catInfo, hiddenClass);
}

function hideCatInfo() {
    addClass(catInfo, hiddenClass);
}

export default {
    showSelectorElement,
    showError,
    hideError,
    showLoader,
    hideLoader,
    showCatInfo,
    hideCatInfo,
};
