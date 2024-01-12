const createCard = ({
  img, text, rating, price, link,
}, index) => {
  const ratingIconFull = '<i class="mdi mdi-star" aria-hidden="true"></i>';
  const ratingIconEmpty = '<i class="mdi mdi-star-outline" aria-hidden="true"></i>';
  const ratingHTML = document.createRange().createContextualFragment(`
    <div class="rating">
      ${ratingIconFull.repeat(rating)}
      ${ratingIconEmpty.repeat(5 - rating)}
    </div>
  `);

  const cardFragmet = document.createRange().createContextualFragment(`
    <div class="card">
      <div class="card-image">
        <figure class="image is-3by4">
            <img src="${img}" loading="${index < 2 ? 'eager' : 'lazy'}">
        </figure>
      </div>
      <div class="card-content">
        <div class="container">
            <div class="content is-medium  has-text-grey-700">
              <p>${text}</p>
            </div>
            ${ratingHTML.children[0].outerHTML}
            <div class="content is-medium  has-text-primary-700">
              <p>${price}</p>
            </div>
            <a href="${link}" class="button is-normal is-dark">
            <span>Buy Now</span>
            <span class="icon">
            <i class="mdi mdi-24px mdi-cart-outline" aria-hidden="false"></i>
            </span>
            </a>
        </div>
      </div>
    </div>
  `);

  return cardFragmet.children[0];
};

export default async function decorate(block) {
  let carouselData;

  try {
    carouselData = await (await fetch('/data/carousel.json')).json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }

  const carouselItems = carouselData.map((data, index) => {
    const carouselListItemFragment = document.createRange().createContextualFragment(`
      <li class="glide__slide--active" style="width: 560px; margin-right: 16px;">
        ${createCard(data, index).outerHTML}
      </li>
    `);

    return carouselListItemFragment.children[0].outerHTML;
  }).join('');

  const carouselFragment = document.createRange().createContextualFragment(`
    <div class="carousel glide glide--ltr glide--slider glide--swipeable" data-items-per-row-sm="1" data-items-per-row-md="2" data-items-per-row-lg="2">
      <div data-glide-el="controls" class="buttons is-right">
          <button data-glide-dir="<" class="button glide__arrow--disabled">
            <span class="icon">
              <i class="mdi mdi-arrow-left"></i>
            </span>
          </button>
          <button data-glide-dir=">" class="button">
            <span class="icon">
              <i class="mdi mdi-arrow-right"></i>
            </span>
          </button>
      </div>
      <div class="glide__track" data-glide-el="track" tabindex="0">
          <ul class="glide__slides" style="transition: transform 800ms cubic-bezier(0.165, 0.84, 0.44, 1) 0s; width: 4736px; transform: translate3d(0px, 0px, 0px);">
            ${carouselItems}
          </ul>
      </div>
    </div>
  `);

  block.innerHTML = '';
  block.append(carouselFragment.children[0]);
}
