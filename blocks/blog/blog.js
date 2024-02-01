const renderMainArticle = ({
  link, img, heading, avatar, author, date, readTime,
}) => {
  const articleFragment = document.createRange().createContextualFragment(`
    <a
      href="${link}"
      class="article-featured"
    >
      <div class="columns is-desktop">
        <div class="column">
          <figure class="image-hero">
            <img
              src="${img}"
            />
          </figure>
        </div>
        <div class="column">
          <div class="content">
            <div class="content-info">
              <h4 class="title is-4">
                ${heading}
              </h4>
              <div class="content-info-details">
                <span class="image is-32x32">
                  <img
                    class="is-rounded"
                    src="${avatar}"
                  />
                </span>
                <span class="author-content">${author}</span>
                <span class="date-content">${date}</span>
                <span class="time-content">${readTime}</span>
              </div>
            </div>
            <span class="mdi mdi-arrow-up"></span>
          </div>
        </div>
      </div>
    </a>
  `);

  return articleFragment.children[0].outerHTML;
};

const renderArticle = ({
  link, img, heading, author, date, readTime,
}) => {
  const articleFragment = document.createRange().createContextualFragment(`
    <a
      href="${link}"
      class="column is-4-desktop article-thumbnail"
    >
      <div class="has-text-centered image-hero">
        <img
          src="${img}"
        />
      </div>
      <div class="content">
        <div class="content-info">
          <h6 class="title is-6">${heading}</h6>
          <div class="content-info-details">
            <p>
              <span class="author-content">${author}</span>
              <span class="date-content">${date}</span>
              <span class="time-content">${readTime}</span>
            </p>
          </div>
        </div>
        <span class="mdi mdi-arrow-up"></span>
      </div>
    </a>
  `);

  return articleFragment.children[0].outerHTML;
};

export default async function decorate(block) {
  const blogLink = block.textContent.trim();

  let blogData;

  try {
    blogData = await (await fetch(blogLink)).json();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);

    return;
  }

  const blogFragment = document.createRange().createContextualFragment(`
    <div class="container">
      ${renderMainArticle(blogData[0])}
      <div class="columns is-multiline is-desktop">
        ${blogData.slice(1).map((el) => renderArticle(el)).join('')}
      </div>
    </div>
  `);

  block.innerHTML = '';
  block.append(blogFragment.children[0]);
}
