import { query, refs } from './index';
import fetchPictures from './fetchData';

async function renderMarkup() {
  try {
    const markup = await fetchPictures(query);
    const render = await markup
      .map(card => {
        return `<div  class="photo-card">
        <a href = '${card.largeImageURL}'>
          <img src="${card.webformatURL}" alt="${card.tags}" loading="lazy" />
          <div class="info">
            <p class="info-item">
              <b>Likes</b>${card.likes}
            </p>
            <p class="info-item">
              <b>Views</b>${card.views}
            </p>
            <p class="info-item">
              <b>Comments</b>${card.comments}
            </p>
            <p class="info-item">
              <b>Downloads</b>${card.downloads}
            </p>
          </div>
          </a>
        </div>`;
      })
      .join('');

    await refs.gallery.insertAdjacentHTML('beforeend', render);
    refs.btnLoadMore.classList.remove('hidden');
    refs.btnToTop.classList.remove('hidden');
  } catch (error) {
    'error', error;
  }
}

export default renderMarkup;