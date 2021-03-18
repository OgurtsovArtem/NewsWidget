/* eslint-disable class-methods-use-this */
export default class Api {
  constructor(options) {
    this.options = options;
  }

  getNews() {
    return fetch('http://newsapi.org/v2/everything?domains=wsj.com&apiKey=cefe7cbdc6b94355ae9ee08e1066ea96')
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }
}
