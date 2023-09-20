import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39486130-41699e57d0dc4b3fd178f65df';
const PER_PAGE = '40'

async function searchQuery(text) {
  const response = await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${text}&image_type=photo&page=1&per_page=${PER_PAGE}`
  )
  if (response.data.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    throw new Error();
  }

  return response.data;
}

export {searchQuery}

















// export function searchQuery(text) {
//   return fetch(
//     `${BASE_URL}?key=${API_KEY}&q=${text}&image_type=photo&per_page=40`
//   ).then(response => {
//     if (!response.ok) {
//       throw new Error(response.status);
//     }
//     return response.json();
//   });
// }
