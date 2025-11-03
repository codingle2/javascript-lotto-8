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

      // 3. 당첨 번호 입력
      const winningNumbers = await this.#lottoController.getWinningNumbers();

      // 4. 보너스 번호 입력 (당첨 번호와 중복 검사를 위해 winningNumbers 전달)
      const bonusNumber = await this.#lottoController.getBonusNumber(winningNumbers);

      // 5. 결과 계산 및 출력
      this.#lottoController.calculateAndShowResults(winningNumbers, bonusNumber);
  }
}

export default App; 