import { createOptimizedPicture, getMetadata } from '../../scripts/aem.js';

const renderGoToAllBlockArticles = () => {
  const goToAllBlockArticlesFragment = document.createRange().createContextualFragment(`
    <a href="/content/puresight/pages/blog.html" class="blog-back-button">
      <span class="mdi mdi-arrow-left"></span>
      <span>All blog articles</span>
    </a>
  `);

  return goToAllBlockArticlesFragment.children[0].outerHTML;
};

const renderArticleHeader = ({
  headingText, avatarLink, author, date, readTime, image,
}) => {
  const articleHeader = document.createRange().createContextualFragment(`
    <div class="container blog-article-header">
      <div class="tags are-normal">
      </div>
      <h1 class="title is-4">${headingText}</h1>
      <article class="media">
        <figure class="media-left">
            <p class="image is-48x48">
              <img class="is-rounded" src="${avatarLink}">
            </p>
        </figure>
        <div class="media-content">
            <div class="content has-text-weight-normal">
              <p>
                  <strong>${author}</strong>
                  <br>
                  <small>${date}</small>
                  <small>${readTime}</small>
              </p>
            </div>
        </div>
      </article>
      <figure class="image">
        ${image.outerHTML}
      </figure>
    </div>
  `);

  return articleHeader.children[0].outerHTML;
};

const renderTableOfContents = (headings) => {
  const tableOfContents = document.createRange().createContextualFragment(`
    <div class="blog-table-of-content">
      <label class="table-label">Table of contents</label>
      <ul class="table-content-list">
        ${headings.map((h) => `
          <li class="button is-ghost table-content-list__item--h5">
            <a class="" href="#${h.id}">
              ${h.textContent}
            </a>
          </li>
        `).join('')}
      </ul>
      <a class="table-content-button" href="#">
        <span class="table-content-button__label">
          <span class="mdi mdi-arrow-up"></span>
          <span>Back to top</span>
        </span>
      </a>
    </div>
  `);

  return tableOfContents.children[0].outerHTML;
};

const renderAuthorBio = ({
  avatarLink, author, position, authorDescription,
}) => {
  const authorBio = document.createRange().createContextualFragment(`
    <template>
      <article class="id media">
        <figure class="photo media-left">
            <p class="image is-96x96">
              <img src="${avatarLink}" class="is-rounded">
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
              <p class="name">
                ${author}
              </p>
              <p class="role">
                ${position}
              </p>
            </div>
        </div>
      </article>
      <div class="description content">
        <p>
          ${authorDescription}
        </p>
      </div>
    </template>
  `);

  return authorBio.children[0].innerHTML;
};

const buildArticle = (main, doc) => {
  const author = getMetadata('author');
  const authorDescription = getMetadata('author-description');
  const position = getMetadata('position');
  const date = getMetadata('date');
  const readTime = getMetadata('read-time');
  const avatarSource = getMetadata('avatar');

  const avatarImg = createOptimizedPicture(avatarSource, author, false, [{ width: '192' }]);
  const avatarLink = avatarImg.querySelector('img').src;
  const authorBio = {
    avatarLink, author, position, authorDescription,
  };

  // first heading is the article heading
  const headingText = main.querySelector('h1, h2, h3, h4, h5, h6')?.textContent;
  const image = main.querySelector('picture');
  const headingData = {
    headingText, avatarLink, author, date, readTime, image,
  };

  // skipping the first heading - it is the article heading
  const tableOfContentsHeaders = [...main.querySelectorAll('h1, h2, h3, h4, h5, h6')].slice(1);

  const articleFragment = document.createRange().createContextualFragment(`
    <section class="section ">
      <div class="container  ">
        <div class="columns is-multiline is-desktop">
            <div class="column is-2-desktop sticky-container">
              ${renderGoToAllBlockArticles()}
            </div>
            <div class="column is-8-desktop ">
              ${renderArticleHeader(headingData)}
            </div>
            <div class="column sticky-container">
              ${renderTableOfContents(tableOfContentsHeaders)}
            </div>
            <div class="column is-8-desktop is-offset-2-desktop ">
              <div class="content is-medium  has-text-grey-700">
                  <p>In an ever-changing world, where life's pace often feels like a frenzied sprint, the minimalism movement has gained momentum. This trend towards simplifying life, both physically and mentally, has found its place in the hearts and homes of many. Join me on a journey to discover the art of decluttering and how it can transform your living spaces into havens of peace and serenity.</p>
              </div>
              <h5 id="movement" class="title is-5 ">
                  The Minimalism Movement
              </h5>
              <div class="content is-medium  has-text-grey-700">
                  <p>Minimalism, as a lifestyle, is not a new concept. It has its roots in various philosophies and cultures throughout history, emphasizing the value of living with less. From ancient Eastern practices of Zen Buddhism to the mid-20th-century architectural marvels of the Bauhaus movement, minimalism has continually shaped our understanding of space and design.</p>
              </div>
              <h5 id="movement" class="title is-5 ">
                  Creating Space
              </h5>
              <div class="content is-medium  has-text-grey-700">
                  <p>To embark on a decluttering journey, start with a clear vision. Consider what truly matters to you and what you want your space to reflect. Begin with the basics: sorting through possessions and letting go of items that no longer serve a purpose. The "less is more" mantra becomes your guiding principle as you free your living area from excess.</p>
              </div>
              <h5 id="movement" class="title is-5 ">
                  Mindful Organization
              </h5>
              <div class="content is-medium  has-text-grey-700">
                  <p>Organizing your space efficiently is the next step towards achieving a clutter-free environment. Invest in practical storage solutions that maximize your available space. Under-bed storage, floating shelves, and multifunctional furniture pieces are great additions to your arsenal. Keep in mind that every item should have its designated place, reducing the chances of clutter creeping back in.</p>
              </div>
              <h5 id="movement" class="title is-5 ">
                  Room by Room
              </h5>
              <div class="content is-medium  has-text-grey-700">
                  <p>Decluttering can feel overwhelming, so tackle one room at a time. Start with areas that are often the most cluttered, like the kitchen or home office. In the kitchen, clear countertops of unused appliances and utensils, creating an open, inviting space for meal preparation. In your home office, digitalize documents to eliminate paper clutter. As you move through your home, make conscious decisions about each item's importance and utility.</p>
              </div>
              <h5 id="movement" class="title is-5 ">
                  Sustainable Solutions
              </h5>
              <div class="content is-medium  has-text-grey-700">
                  <p>Minimalism is not just about reducing physical clutter; it also champions sustainability. Consider donating or recycling items instead of sending them to the landfill. Seek out eco-friendly cleaning products to maintain your fresh, minimalist space. Sustainable living is an integral part of the minimalist lifestyle.</p>
              </div>
              <h5 id="movement" class="title is-5 ">
                  Reflective Summary
              </h5>
              <div class="content is-medium  has-text-grey-700">
                  <p>Decluttering your home is a journey that goes beyond simply tidying up. It's about cultivating a space that reflects your values and priorities. Embrace minimalism as a lifestyle, and you'll discover the benefits of reduced stress, increased focus, and a deeper connection to the things that truly matter. Remember, decluttering is not a one-time task; it's an ongoing practice. Regularly assess your living spaces and continue to edit your possessions. By doing so, you'll ensure that your home remains a sanctuary of simplicity in a complex world.</p>
              </div>
              <div class="container blog-article-author-bio">
                ${renderAuthorBio(authorBio)}
              </div>
            </div>
        </div>
      </div>
    </section>
  `);

  main.innerHTML = articleFragment.children[0].outerHTML;
};

export default async function decorate(doc) {
  buildArticle(doc.querySelector('main'), doc);
}
