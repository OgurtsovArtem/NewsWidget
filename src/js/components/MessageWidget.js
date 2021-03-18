/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
export default class MessageWidget {
  constructor(options) {
    this.options = options;
    this.countIcon = '';
    this.count = 0;
  }

  _renderFrom(array, count, container) {
    const { setFormatDate, id } = this.options;
    array.forEach((obj) => {
      container.appendChild(this._templateFrom(
        obj.title,
        obj.author,
        setFormatDate(obj.publishedAt),
        obj.url,
        id(),
      ));
    });
  }

  _render(array) {
    const { container } = this.options;
    container.appendChild(this._template(array));
  }

  // eslint-disable-next-line class-methods-use-this
  _templateFrom(title, author, date, link = '', _id = '') {
    const templateString = `
    <form class="widget__form">
      <div class="widget__form-inputGroup">
        <input class="widget__form-input" id="" type="checkbox"/>
        <label class="widget__form-label" for="">
          <span class="widget__form-title"></span>
          <div class="widget__form-info">
            <span class="widget__form-author"></span>
            <time class="widget__form-date" datetime=""></time>
            <button class="button button__more">
              <a class="widget__form-link" href="" title="" target="_blank" rel="noopener noreferrer"></a>
            </button>
          </div>
        </label>
      </div>
    </form>
  `;
    const element = document.createElement('div');

    element.insertAdjacentHTML('afterbegin', templateString.trim());

    element.querySelector('.widget__form-label').setAttribute('for', `${_id}`);
    element.querySelector('.widget__form-input').setAttribute('id', `${_id}`);
    element.querySelector('.widget__form-link').href = link;
    element.querySelector('.widget__form-link').title = title;
    element.querySelector('.widget__form-link').textContent = 'read more';
    element.querySelector('.widget__form-date').dateTime = date;
    element.querySelector('.widget__form-date').textContent = date;
    element.querySelector('.widget__form-title').textContent = title;
    element.querySelector('.widget__form-author').textContent = author;

    return element.firstChild;
  }

  // eslint-disable-next-line class-methods-use-this
  _template(array) {
    this.count = array.length;

    const templateString = `
      <div class="widget">
        <div class="widget__container disabled">
          <div class="widget__footer">
            <button class="button button__check"></button>
            <button class="button button__hide"></button>
          </div>
        </div>
        <button class="button-show button-show__img">
          <span class="button-show__count"></span>
        </button>
      </div>
    `;

    const element = document.createElement('div');

    element.insertAdjacentHTML('beforeend', templateString.trim());
    const closeBtn = element.querySelector('.button__hide');
    const openBtn = element.querySelector('.button-show');
    const checkBtn = element.querySelector('.button__check');

    const countIcon = element.querySelector('.button-show__count');
    const container = element.querySelector('.widget__container');

    this.countIcon = countIcon;

    closeBtn.textContent = 'Hide';
    checkBtn.textContent = 'Check all';

    this._renderFrom(array, countIcon, container);
    this._checkBoxControll(container, countIcon);
    this._counRender(countIcon);
    this._listener(openBtn, closeBtn, checkBtn, container);

    return element.firstChild;
  }

  _counRender() {
    if (this.count === 0) {
      this.countIcon.classList.add('disabled');
    } else {
      this.countIcon.classList.remove('disabled');
      this.countIcon.textContent = this.count;
    }
  }

  _checkBoxControll(container) {
    container.querySelectorAll('input[type="checkbox"]')
      .forEach((item) => {
        item.addEventListener('change', () => {
          if (item.checked) {
            this.count--;
            this._counRender();
          } else {
            this.count++;
            this._counRender();
          }
        });
      });
  }

  _check(container) {
    const inputs = container.querySelectorAll('.widget__form-input');
    inputs.forEach((item) => {
      if (item.checked === false) {
        item.checked = true;
        this.count = 0;
        this._counRender();
      }
    });
  }

  // eslint-disable-next-line class-methods-use-this
  _open(container, button) {
    container.classList.remove('disabled');
    button.classList.add('disabled');
  }

  // eslint-disable-next-line class-methods-use-this
  _close(container, button) {
    container.classList.add('disabled');
    button.classList.remove('disabled');
  }

  _listener(openBtn, closeBtn, checkBtn, container) {
    openBtn.addEventListener('click', this._open.bind(this, container, openBtn));
    closeBtn.addEventListener('click', this._close.bind(this, container, openBtn));
    checkBtn.addEventListener('click', this._check.bind(this, container));
  }
}
