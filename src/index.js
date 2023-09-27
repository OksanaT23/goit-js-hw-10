import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';

import "slim-select/dist/slimselect.css";

const selectorElement = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');
let breedsData = [];

function showError() { 
    error.style.display = 'block';
}
function hideError() { 
    error.style.display = 'none';
}
function showLoader() {
    loader.style.display = 'block';
}
function hideLoader() {
    loader.style.display = 'none';
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
        selectorElement.style.display = 'block';

        new SlimSelect({
            select: '.breed-select'
        });
    })
    .catch(showError)
    .finally(hideLoader);

selectorElement.addEventListener('change', event => {
    const breedId = selectorElement.value;

    catInfo.style.display = 'none';
    
    hideError();
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
            catInfo.style.display = 'block';
        })
        .catch(showError)
        .finally(hideLoader);
});
