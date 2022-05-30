// import fetchImages from './fetchData';
// import { query, page, refs } from './index';

// async function renderMarkup() {
// 	try {
// 		const markup = await fetchImages(query);
// 		// renderHTLM(markup);
		
// 			const render = await markup.map(data => {
// 				return `<div class="photo-card">
// 					<a class="photo-card__link" href=${data.largeImageURL}>
//   						<img src="${data.webformatURL}" alt="${data.tags}" loading="lazy" />
//   						<div class="info">
//     						<p class="info-item"><b>Likes</b>${data.likes}</p>
//     						<p class="info-item"><b>Views</b>${data.views}</p>
//     						<p class="info-item"><b>Comments</b>${data.comments}</p>
// 							<p class="info-item"><b>Downloads</b>${data.downloads}</p>
// 						</div>
// 					</a>
// 				</div>`
// 			}).join('');
// 			await refs.gallery.insertAdjacentHTML('beforeend', render);
// 			refs.loadMorebtn.classList.remove('hidden');
// 			refs.searchAnchorbtn.classList.remove('hidden');
		
		
// 	} catch (error) {
// 		'error', error;
// 	}
// }

// export default renderMarkup;