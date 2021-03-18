export default class NewsCard {
  constructor(options, massageWidget, api) {
    this.options = options;
    this.api = api;
    this.massageWidget = massageWidget;
  }

  create() {
    this.api.getNews()
      .then((res) => {
        this._render(res.articles);
        return res;
      })
      .then((res) => {
        this.massageWidget._render(res.articles);
        return res;
      })
      .catch((err) => this._templateError(err));
  }

  _render(array) {
    const { container, setFormatDate } = this.options;
    array.forEach((obj) => {
      container.appendChild(this._template(
        obj.title,
        obj.description,
        setFormatDate(obj.publishedAt),
        obj.url,
        obj.urlToImage,
        obj.source.name,
        obj.source.id,
      ));
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _template(title, text, date, link = '', image, source, _id = '') {
    const templateString = `
      <div class="news-card" data-id="">
        <h3 class="news-card__title"></h3>
        <img src="" alt="" class="news-card__image">
        <p class="news-card__text"></p>
        <time class="news-card__date" datetime=""></time>
        <a href="" class="news-card__link" title="" target="_blank" rel="noopener noreferrer"></a>
      </div>
    `;
    const element = document.createElement('div');

    element.insertAdjacentHTML('beforeend', templateString.trim());

    element.querySelector('.news-card').dataset.id = _id;
    element.querySelector('.news-card__link').href = link;
    element.querySelector('.news-card__link').title = title;
    element.querySelector('.news-card__link').textContent = source;
    element.querySelector('.news-card__image').src = image;
    element.querySelector('.news-card__image').alt = 'image';
    element.querySelector('.news-card__date').dateTime = date;
    element.querySelector('.news-card__date').textContent = date;
    element.querySelector('.news-card__title').textContent = title;
    element.querySelector('.news-card__text').textContent = text;

    return element.firstChild;
  }

  // eslint-disable-next-line class-methods-use-this
  _templateError(err) {
    const { container } = this.options;
    const templateString = `
      <div>
        <h2 class="error">Error</h2>
        <p class="error__message"></p>
      </div>
    `;
    const element = document.createElement('div');

    element.insertAdjacentHTML('beforeend', templateString.trim());

    element.querySelector('.error__message').textContent = `Произошла ошибка:${err}`;

    return container.appendChild(element.firstChild);
  }
}
