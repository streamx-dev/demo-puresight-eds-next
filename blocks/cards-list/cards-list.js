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

  let carouselData;

  try {
    carouselData = await (await fetch(carouselSourceLink)).json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }

  const carouselFragment = document.createRange().createContextualFragment(`
    <div class="columns is-tablet">
      ${carouselData.map((column) => renderColumn(column).outerHTML).join('')}
    </div>
  `);

  block.innerHTML = '';
  block.append(carouselFragment.children[0]);
}
