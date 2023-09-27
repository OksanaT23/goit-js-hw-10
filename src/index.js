import { selectorElement, catInfo } from "./elements";
import actions from "./actions";
import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from 'slim-select';

import "slim-select/dist/slimselect.css";

let breedsData = [];

function getBreedData(breedId) {
    for (let breedData of breedsData) {
        if (breedData.id === breedId) {
            return breedData;
        }
    }

    return null;
}

actions.showLoader();
fetchBreeds()
    .then(data => {
        breedsData = data;

        const selectorHtml = data.map(breedData => `<option value="${breedData.id}">${breedData.name}</option>`).join('');

        selectorElement.insertAdjacentHTML('beforeend', selectorHtml);

        actions.showSelectorElement();

        new SlimSelect({
            select: '.breed-select'
        });
    })
    .catch(actions.showError)
    .finally(actions.hideLoader);

selectorElement.addEventListener('change', event => {
    const breedId = selectorElement.value;

    actions.hideError();
    actions.hideCatInfo();
    actions.showLoader();

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
            
            actions.showCatInfo();
        })
        .catch(actions.showError)
        .finally(actions.hideLoader);
});
