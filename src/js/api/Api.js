/* eslint-disable class-methods-use-this */
export default class Api {
  constructor(options) {
    this.options = options;
  }

  async getNews() {
    try {
      const res = await fetch('https://nomoreparties.co/news/v2/top-headlines?country=us&apiKey=cefe7cbdc6b94355ae9ee08e1066ea96');
      return res.json();
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }
}
