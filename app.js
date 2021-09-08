const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];
const galary = document.querySelector('ul.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImg = modal.querySelector('img.lightbox__image');

galary.insertAdjacentHTML('afterbegin', createGalaryItem(galleryItems));
galary.addEventListener('click', onClickGalaryItem);

modal.addEventListener('click', e => {
  console.log(e.target);
  if (
    e.target.classList.contains('lightbox__overlay') ||
    e.target.dataset.action === 'close-lightbox'
  )
    closeModal();
  if (
    e.target.classList.contains('lightbox__image') ||
    e.target.dataset.type === 'next'
  )
    nextImg();
  if (e.target.dataset.type === 'prev') prevImg();
});

function createGalaryItem(items) {
  return items
    .map(
      el => `<li class="gallery__item">
  <a
    class="gallery__link"
    href="${el.preview}"
  >
    <img
      class="gallery__image"
      src="${el.preview}"
      data-source="${el.original}"
      alt="${el.description}"
    />
  </a>
</li>`,
    )
    .join('');
}

function onClickGalaryItem(e) {
  if (!e.target.classList.contains('gallery__image')) return;
  e.preventDefault();
  modal.classList.add('is-open');
  setModalImgSrc(e.target.dataset.source, e.target.alt);
  window.addEventListener('keydown', onKeyDown);
}

function setModalImgSrc(src, alt) {
  modalImg.src = src;
  modalImg.alt = alt;
}

function findIndexImgInObject(src) {
  return galleryItems.indexOf(galleryItems.find(el => el.original === src));
}

function nextImg() {
  let currentImgIndex = findIndexImgInObject(modalImg.getAttribute('src'));
  if (currentImgIndex === galleryItems.length - 1) currentImgIndex = -1;
  setModalImgSrc(
    galleryItems[currentImgIndex + 1].original,
    galleryItems[currentImgIndex + 1].description,
  );
}

function prevImg() {
  let currentImgIndex = findIndexImgInObject(modalImg.getAttribute('src'));
  if (currentImgIndex == 0) currentImgIndex = galleryItems.length;
  setModalImgSrc(
    galleryItems[currentImgIndex - 1].original,
    galleryItems[currentImgIndex - 1].description,
  );
}

function closeModal(e) {
  modal.classList.remove('is-open');
  setModalImgSrc('', '');

  window.removeEventListener('keydown', onKeyDown);
}