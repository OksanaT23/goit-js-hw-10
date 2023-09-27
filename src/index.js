import { fetchBreeds } from "./cat-api";

const selectorElement = document.querySelector('select.breed-select');
const loader = document.querySelector('p.loader');
const error = document.querySelector('p.error');
const catInfo = document.querySelector('div.cat-info');

fetchBreeds().then(breedsData => {
    const selectorHtml = breedsData.reduce((htmlString, breedData) => {
        return htmlString + `<option value="${breedData.id}">${breedData.name}</option>`;
    }, '');

    selectorElement.insertAdjacentHTML('beforeend', selectorHtml);
});
