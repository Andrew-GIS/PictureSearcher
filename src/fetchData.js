import axios from 'axios';
import Notiflix from 'notiflix';

const my_key = '27722310-5078c360e429b8b979ebf7ad7';
const general_link = 'https://pixabay.com/api/';
const per_page_default = 40;

import {page, refs } from './index';

export const notiflixOptions = Notiflix.Notify.init({
  width: '400px',
  position: 'top-right',
  distance: '50px',
  borderRadius: '10px',
  clickToClose: true,
  useIcon: false,
  fontSize: '23px',
});

const fetchPictures = async query => {
  try {
    const response = await axios(
      `${general_link}?image_type=photo&orientation=horisontal&safesearch=true&page=${page}&per_page=${per_page_default}&key=${my_key}&q=${query}`,
    );

    const responseData = await response.data.hits;
    console.log(`Hits array:${response.data.hits}`);
    if (responseData.length === 0) {
      return Notiflix.Notify.warning(
      'No data to show, enter valid query',
      notiflixOptions,
    );
      throw new Error();
    }
    console.log(`response info:`);
    console.log(response);
    console.log(`Page: ${page}`);
    if (page === 1) {
      Notiflix.Notify.success(
        `Hooray! We found ${response.data.totalHits} images.`,
        notiflixOptions,
      );
    }
    refs.btnLoadMore.classList.remove('is-hidden');
    if (responseData.length < 40) {
      // console.log('less than 40 :>> ');
      refs.btnLoadMore.classList.add('is-hidden');
      Notiflix.Notify.success(
        `We're sorry, but you've reached the end of search results`,
        notiflixOptions,
      );
    }
    console.log('responseData length :>> ', responseData.length);
    
    return responseData;
  } catch (error) {
    console.log(error);
    refs.btnLoadMore.setAttribute('disabled', 'disabled');
    return Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.',
      notiflixOptions,
    );
  }
};

export default fetchPictures;