import axios from "axios";

axios.defaults.headers.common['x-api-key'] = 'live_Koigu3uu8a3Qz6YDaouSLcBGF6Gj8Eh0BEqy4tM8SBMkhrYlwzLCy3fYnzvWjRtH';

export function fetchBreeds() {
    return fetch('https://api.thecatapi.com/v1/breeds')
        .then(response => response.json());
}

export function fetchCatByBreed(breedId) {
    const searchParams = new URLSearchParams({
        breed_ids: breedId,
    });

    return fetch(`https://api.thecatapi.com/v1/images/search?${searchParams}`)
        .then(response => response.json());   
}
