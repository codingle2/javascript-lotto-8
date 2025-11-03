// src/App.js

import LottoController from './controller/LottoController.js';

class App {
  #lottoController;

  constructor() {
    this.#lottoController = new LottoController();
  }

  async run() {
      // 1. 구입 금액 입력 및 로또 개수 반환 
      const count = await this.#lottoController.getPurchaseAmount(); 
      // 2. 로또 발행 및 출력 
      this.#lottoController.issueLottos(count);
  }
}

export default App; 