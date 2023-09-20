import axios from 'axios';
import Notiflix from 'notiflix';

const BASE_URL = 'https://pixabay.com/api/';
// const API_KEY = '39486130-41699e57d0dc4b3fd178f65df';
// const PER_PAGE = '40'

const searchParams = new URLSearchParams({
  key: '39314249-b9f637c3b6d2b2c91ffe81f29',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
  page: 1,
});


async function searchQuery() {
  const response = await axios.get(
    `${BASE_URL}?${searchParams}`
  )
  if (response.data.totalHits === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    throw new Error();
  }

  return response.data;
}

export {searchQuery, searchParams}

















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
