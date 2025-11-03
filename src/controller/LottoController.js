import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoStore from '../model/LottoStore.js'; 
import { LOTTO_CONFIG, ERROR_MESSAGES } from '../LottoConfig.js'; 

class LottoController {
  #lottoStore; 

  constructor() {
    this.#lottoStore = new LottoStore();
  }

  async getPurchaseAmount() {
    while (true) {
      try {
        const input = await InputView.readPurchaseAmount();
        const amount = this.#validateAmount(input);
        const count = amount / LOTTO_CONFIG.PRICE_PER_TICKET;
        return count;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  #validateAmount(input) {
    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error(ERROR_MESSAGES.AMOUNT_NAN);
    }
    if (amount <= 0) {
      throw new Error(ERROR_MESSAGES.AMOUNT_NEGATIVE);
    }
    if (amount % LOTTO_CONFIG.PRICE_PER_TICKET !== 0) {
      throw new Error(ERROR_MESSAGES.AMOUNT_UNIT);
    }

    return amount;
  }

  /**
  @param {number} count
   */
  issueLottos(count) {
    // 1. 모델(LottoStore)에 로또 생성 요청
    this.#lottoStore.generateLottos(count);

    // 2. 모델에서 생성된 로또 목록 가져오기
    const lottos = this.#lottoStore.getLottos();

    // 3. 뷰(OutputView)에 출력 요청
    OutputView.printLottos(lottos);
  }
}

export default LottoController;