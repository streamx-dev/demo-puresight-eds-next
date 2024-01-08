import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

export default async function decorate(block) {
  // load nav as fragment
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  const [logoWrapper, menuItemsWrapper] = fragment.querySelectorAll(':scope > div');

  const logoLink = logoWrapper.querySelector('a').href;
  const logoImg = logoWrapper.querySelector('img').src;
  const menuItmes = menuItemsWrapper.querySelectorAll('li');

  const navbarItemsHTML = [...menuItmes].map((item) => {
    const link = item.querySelector('a');

    link.classList.add('navbar-item');

    return link.outerHTML;
  }).join('');

  const headerFragment = document.createRange().createContextualFragment(`
    <nav class="navbar is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="container is-widescreen">
        <div class="navbar-brand">
          <a class="navbar-item" href="${logoLink}">
            <img
              src="${logoImg}"
            />
          </a>

          <a
            role="button"
            class="navbar-burger"
            aria-label="menu"
            aria-expanded="false"
            data-target="navMenu"
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        <div class="navbar-menu" id="navMenu">
          <div class="navbar-end">
            ${navbarItemsHTML}

            <div class="navbar-item">
              <div id="autocomplete">
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  `);

  block.innerHTML = headerFragment.children[0].outerHTML;

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach((el) => {
    el.addEventListener('click', () => {
      // Get the target from the "data-target" attribute
      const { target } = el.dataset;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');
    });
  });
}
