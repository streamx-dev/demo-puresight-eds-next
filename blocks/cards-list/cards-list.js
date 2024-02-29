import createCard from '../../components/card/card.js';

const renderColumn = (columnCellsData) => {
  const columFragment = document.createRange().createContextualFragment(`
    <div class="column product-tiles">
      ${columnCellsData.map((cell) => createCard(cell).outerHTML).join('')}
    </div>
  `);

  return columFragment.children[0];
};

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
  const splittedArray = [];
  while (carousel.data.length > 0) {
    splittedArray.push(carousel.data.splice(0, 4));
  }
  const carouselFragment = document.createRange().createContextualFragment(`
    <div class="columns is-tablet">
      ${splittedArray.map((column) => renderColumn(column).outerHTML).join('')}
    </div>
  `);

  block.innerHTML = '';
  block.append(carouselFragment.children[0]);
}
