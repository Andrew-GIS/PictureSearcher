import Notiflix from 'notiflix';
import renderMarkup from './renderData';
import './style.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('input'),
  searchBtn: document.querySelector('#search-form button'),
  btnLoadMore: document.querySelector('.load-more'),
  btnToTop: document.querySelector('.to-top-btn'),
  gallery: document.querySelector('.gallery'),
};
export let page = 1;
export let query = '';

let gallery = {};

refs.input.addEventListener('input', searchBtnDisableCheck);
refs.btnLoadMore.addEventListener('click', omLoadMoreAction);
refs.btnToTop.addEventListener('click', topPositionScroll);
refs.form.addEventListener('submit', onInputeSubmit);

function searchBtnDisableCheck() {
  if (refs.input.value !== query) {
    console.log(`Inpute Value: ${refs.input.value}`);
    console.log(`Query: ${query}`);
    refs.searchBtn.removeAttribute('disabled');
  }
}

async function omLoadMoreAction(event) {
  await renderMarkup();
  await gallery.refresh();

  // console.log(event);
  setTimeout(() => {
    page += 1;
    event.view.scrollBy({
      top: 1000,
      behavior: 'smooth',
    });
  }, 300);
}

function topPositionScroll(event){
  event.view.scroll({
    top: 0,
    behavior: 'smooth',
  });
}

async function onInputeSubmit (event) {
  event.preventDefault();

  if (query !== event.target[0].value) {
    // console.log(refs.gallery.textContent);
    refs.btnLoadMore.classList.add('hidden');
    refs.btnToTop.classList.add('hidden');
    refs.gallery.textContent = '';
    page = 1;
  }
  query = event.target[0].value.trim();
  if (query === '') {
    // console.log('have no text on input');
    Notiflix.Notify.failure('Please enter some query :)');
    return;
  }
  await renderMarkup();

  gallery = new SimpleLightbox('.gallery .photo-card a');
  gallery.on('show.simplelightbox');

  refs.searchBtn.setAttribute('disabled', 'disabled');
  refs.btnLoadMore.removeAttribute('disabled', 'disabled');

  page += 1;
}