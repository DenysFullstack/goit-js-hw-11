import { searchQuery,searchParams } from './query-api';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import '../css/gallery.css';
import Notiflix from 'notiflix';
import { formEl, galleryEl, loadMoreBtn } from './refs';

loadMoreBtn.classList.add('is-hidden');
let currentPage = 1;

let lightbox = new SimpleLightbox('.gallery div div a', {
    captionsData: 'alt',
    captionDelay: 250,
    loop: false,
});

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  loadMoreBtn.classList.add('is-hidden')
  currentPage = 1;
  const formElements = e.currentTarget.elements;
  const input = formElements.searchQuery.value.trim();
  if(input===''){
    return Notiflix.Notify.failure("Sorry, field search shouldn't be empty.")
  }
  searchParams.set('q', input)
  searchParams.set('page', currentPage)
  searchQuery()
    .then(imageCards => {
      galleryEl.innerHTML = renderCards(imageCards);
      if(imageCards.total < searchParams.get('per_page')) return
      loadMoreBtn.classList.remove('is-hidden')
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
        lightbox.refresh();
    });
}

// webformatURL - посилання на маленьке зображення для списку карток.
// largeImageURL - посилання на велике зображення.
// tags - рядок з описом зображення. Підійде для атрибуту alt.
// likes - кількість лайків.
// views - кількість переглядів.
// comments - кількість коментарів.
// downloads - кількість завантажень.

function renderCards(object) {
  console.log(object);
  const cards = object.hits;
  return cards
    .map(({ largeImageURL,webformatURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="gallery-card">
        <div class="thumb">
        <a class="gallery__link" href="${largeImageURL}">
        <img class="img-prev" src="${webformatURL}" alt="${tags}">
        </a>
        </div>
        <ul class="card-atribute list">
            <li class="likes">
             <ul class="hits-list list">
               <li class="list-item">likes</li>
               <li class="list-item">${likes}</li>
             </ul>
            </li>
            <li class="views">
              <ul class="hits-list list">
                <li class="list-item">views</li>
                <li class="list-item">${views}</li>
              </ul>
            </li>
            <li class="comments">
              <ul class="hits-list list">
                <li class="list-item">comments</li>
                <li class="list-item">${comments}</li>
              </ul>
            </li>
            <li class="downloads">
              <ul class="hits-list list">
                <li class="list-item">downloads</li>
                <li class="list-item">${downloads}</li>
              </ul>
            </li>
        </ul>
    </div>
        `;
    })
    .join('');
}

loadMoreBtn.addEventListener('click', onMoreData)

function onMoreData(){
    currentPage +=1
    searchParams.set('page',currentPage)
    searchQuery()
    .then(imageCards => {
      galleryEl.insertAdjacentHTML('beforeend', renderCards(imageCards));
      if(imageCards.hits.length< searchParams.get('per_page')) {
        loadMoreBtn.classList.add('is-hidden')
        return Notiflix.Notify.failure("We're sorry, but you've reached the end of search results.")
      }
    })
    .catch(error => {
      console.log(error);
    })
    .finally(() => {
        lightbox.refresh();
    });
}
