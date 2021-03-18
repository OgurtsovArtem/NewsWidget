/* eslint-disable class-methods-use-this */
export default class Api {
  constructor(options) {
    this.options = options;
  }

  async getNews() {
    try {
      const res = await fetch('http://newsapi.org/v2/everything?domains=wsj.com&apiKey=cefe7cbdc6b94355ae9ee08e1066ea96');
      return res.json();
    } catch (err) {
      console.log(`Ошибка ${err}`);
      return err;
    }
  }
}
