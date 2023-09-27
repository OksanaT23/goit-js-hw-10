import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';

import "slim-select/dist/slimselect.css";

const hiddenClass = 'hidden';
const selectorElement = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');
let breedsData = [];

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
    removeClass(error, hiddenClass);
}
function hideError() { 
    addClass(error, hiddenClass);
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

function getBreedData(breedId) {
    for (let breedData of breedsData) {
        if (breedData.id === breedId) {
            return breedData;
        }
    }

    return null;
}

showLoader();
fetchBreeds()
    .then(data => {
        breedsData = data;

        const selectorHtml = data.map(breedData => `<option value="${breedData.id}">${breedData.name}</option>`).join('');

        selectorElement.insertAdjacentHTML('beforeend', selectorHtml);

        showSelectorElement();

        new SlimSelect({
            select: '.breed-select'
        });
    })
    .catch(showError)
    .finally(hideLoader);

selectorElement.addEventListener('change', event => {
    const breedId = selectorElement.value;

    hideError();
    hideCatInfo();
    showLoader();

    fetchCatByBreed(breedId)
        .then(jsonData => {
            console.log(jsonData);

            const imgInfo = jsonData[0];
            const imgUrl = imgInfo.url;
            const breedData = getBreedData(breedId);

            console.log(breedData);

            const { name, description, temperament } = breedData;

            catInfo.innerHTML = `
                <div class="cat-info-wrapper">
                    <img src="${imgUrl}" alt="" />
                    <div class="text-info">
                        <h1>${name}</h1>
                        <p class="description">${description}</p>
                        <p><strong>Temperament:</strong> ${temperament}</p>
                    </div>
                </div>
            `;
            
            showCatInfo();
        })
        .catch(showError)
        .finally(hideLoader);
});
