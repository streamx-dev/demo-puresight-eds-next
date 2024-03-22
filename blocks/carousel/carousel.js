import createCard from '../../components/card/card.js';

export default async function decorate(block) {
  const carouselSourceLink = block.textContent.trim();

  let carousel;

  try {
    carousel = await (await fetch(carouselSourceLink)).json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }
  const carousel2 = {
    key: 'collected:products:cheapest-by-category:Accent_Furniture',
    values: [
      {
        id: 'B071FMSYNH',
        name: 'Hoffman Down-Filled Performance Fabric Living Room Sectional Sofa Couch, 127"W, Ecru',
        urlSafeName: 'hoffman-down-filled-performance-fabric-living-room-sectional-sofa-couch-127-w-ecru-b071fmsynh',
        mainImage: 'https://storage.googleapis.com/puresight-pim-images/original/71/71O-0Mrx1DL.jpg',
        images: [
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1RKWP0CHRL.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A15udsg8S8L.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1I8tkEjGeL.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1kNj5aPzdL.jpg',
        ],
        price: {
          value: '399',
        },
        height: '37.0',
        width: '39.5',
        length: '127.0',
        dimensionUnit: 'inches',
        weight: '128.0',
        weightUnit: 'pounds',
        bulletPoints: [
          'Whatever you need to accommodate kids, pets, spills and every other facet of a busy life, this sectional sofa has it all: Plush comfort, stain-resistant fabric, durable construction, and a timeless look to blend with your existing styles.',
          '127"W x 39.5"D x 37"H',
        ],
        keywords: [
          'Reclining sofa',
          'Stone & beam',
        ],
        category: 'Accent Furniture',
        type: 'Home furniture and decor',
      },
      {
        id: 'B071FMSYNH',
        name: 'Hoffman Down-Filled Performance Fabric Living Room Sectional Sofa Couch, 127"W, Ecru',
        urlSafeName: 'hoffman-down-filled-performance-fabric-living-room-sectional-sofa-couch-127-w-ecru-b071fmsynh',
        mainImage: 'https://storage.googleapis.com/puresight-pim-images/original/71/71O-0Mrx1DL.jpg',
        images: [
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1RKWP0CHRL.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A15udsg8S8L.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1I8tkEjGeL.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1kNj5aPzdL.jpg',
        ],
        height: '37.0',
        width: '39.5',
        length: '127.0',
        dimensionUnit: 'inches',
        weight: '128.0',
        weightUnit: 'pounds',
        bulletPoints: [
          'Whatever you need to accommodate kids, pets, spills and every other facet of a busy life, this sectional sofa has it all: Plush comfort, stain-resistant fabric, durable construction, and a timeless look to blend with your existing styles.',
          '127"W x 39.5"D x 37"H',
        ],
        keywords: [
          'Reclining sofa',
          'Stone & beam',
        ],
        category: 'Accent Furniture',
        type: 'Home furniture and decor',
      },
      {
        id: 'B071FMSYNH',
        name: 'Hoffman Down-Filled Performance Fabric Living Room Sectional Sofa Couch, 127"W, Ecru',
        urlSafeName: 'hoffman-down-filled-performance-fabric-living-room-sectional-sofa-couch-127-w-ecru-b071fmsynh',
        mainImage: 'https://storage.googleapis.com/puresight-pim-images/original/A1/A1kNj5aPzdL.jpg',
        images: [
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1RKWP0CHRL.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A15udsg8S8L.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1I8tkEjGeL.jpg',
          'https://storage.googleapis.com/puresight-pim-images/original/A1/A1kNj5aPzdL.jpg',
        ],
        height: '37.0',
        width: '39.5',
        length: '127.0',
        dimensionUnit: 'inches',
        weight: '128.0',
        weightUnit: 'pounds',
        bulletPoints: [
          'Whatever you need to accommodate kids, pets, spills and every other facet of a busy life, this sectional sofa has it all: Plush comfort, stain-resistant fabric, durable construction, and a timeless look to blend with your existing styles.',
          '127"W x 39.5"D x 37"H',
        ],
        keywords: [
          'Reclining sofa',
          'Stone & beam',
        ],
        price: {
          value: '400',
        },
        category: 'Accent Furniture',
        type: 'Home furniture and decor',
      },
    ],
  };
  const carouselItems = carousel2.values.map((data, index) => {
    const carouselListItemFragment = document.createRange().createContextualFragment(`
      <li class="glide__slide--active" style="width: 560px; margin-right: 16px;">
        ${createCard({ ...data, buttonText: 'Buy now' }, index).outerHTML}
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
