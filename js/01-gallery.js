import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const refs = {
  galleryEl: document.querySelector('.gallery'),
};

const readyGalleryContent = galleryItems
  .map(({ preview, original, description }) => {
    return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" src="${preview}" data-source="${original} alt="${description}"></a></li>`;
  })
  .join('');

refs.galleryEl.innerHTML = readyGalleryContent;
refs.galleryEl.addEventListener('click', disableHrefAndShowModal);

function disableHrefAndShowModal(event) {
  event.preventDefault();
  const { source } = event.target.dataset;
  createModal(source);
}
function createModal(source) {
  const instance = basicLightbox.create(
    `<img class="gallery__image" src=${source} width="800" height="600">`
  );
  instance.show();
  ifVisibleModal(instance);
}
function ifVisibleModal(parametr) {
  const isVisible = parametr.visible();
  if (isVisible) {
    document.addEventListener('keydown', escIsActive);
  }
  function escIsActive(event) {
    if (event.key === 'Escape') {
      parametr.close();
      document.removeEventListener('keydown', escIsActive);
    }
  }
}

// Перший варіант. Наче як забагто рядків коду, переробив на іннерХТМЛ, залишив тут на пам'ять.
// const tempArray = galleryItems.map(item => {
//   const liEl = document.createElement('li');
//   liEl.classList.add('gallery__item');
//   const linkEl = document.createElement('a');
//   linkEl.classList.add('gallery__link');
//   linkEl.setAttribute('href', item.original);
//   const imgEl = document.createElement('img');
//   imgEl.classList.add('gallery__image');
//   imgEl.setAttribute('src', item.preview);
//   imgEl.setAttribute('data-source', item.original);
//   imgEl.setAttribute('alt', item.description);
//   linkEl.appendChild(imgEl);
//   liEl.appendChild(linkEl);
//   return liEl;
// });
// console.log(tempArray);

// refs.galleryEl.append(...tempArray);
