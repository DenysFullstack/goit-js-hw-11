import { searchQuery } from './query-api';
import '../css/gallery.css';
import Notiflix from 'notiflix';
import { formEl, galleryEl, loadMoreBtn } from './refs';

formEl.addEventListener('submit', onSubmit);
loadMoreBtn.addEventListener('click', onMoreData)

function onSubmit(e) {
  e.preventDefault();
  const formElements = e.currentTarget.elements;
  const input = formElements.searchQuery.value.trim();
  if(input===''){
    return Notiflix.Notify.failure("Sorry, the input field cannot be empty. Please enter the name of the picture.")
  }
  searchQuery(input)
    .then(imageCards => {
        console.log(imageCards);
      galleryEl.innerHTML = renderCards(imageCards);
      if(imageCards.total< 40) return
      loadMoreBtn.classList.remove('is-hidden')
    })
    .catch(error => {
      console.log(error);
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
    .map(({ webformatURL, tags, likes, views, comments, downloads }) => {
      return `
        <div class="gallery-card">
        <div class="thumb">
        <img class="img-prev" src="${webformatURL}" alt="${tags}">
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

function onMoreData(){
    searchQuery()
    .then(imageCards => {
        console.log(imageCards);
      galleryEl.insertAdjacentHTML = ('beforeend', renderCards(imageCards));
      if(imageCards.total< 40) return
      loadMoreBtn.classList.remove('is-hidden')
    })
    .catch(error => {
      console.log(error);
    });
}
