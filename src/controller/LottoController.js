import InputView from "../view/InputView.js";
import OutputView from "../view/OutputView.js";
import { LOTTO_CONFIG } from "../LottoConfig.js";

class LottoController {
  async getPurchaseAmount() {
    try {
        const input = await InputView.readPurchaseAmount();
        const amount = this.#validateAmount(input);
        const count = amount / LOTTO_CONFIG.PRICE_PER_TICKET;
        OutputView.printPurchaseResult(count);
        return count;
      } catch (error) {
        OutputView.printError(error.message);
    }
  }

  #validateAmount(input) {
    const amount = Number(input);

    if (Number.isNaN(amount)) {
      throw new Error("[ERROR] 구입 금액은 숫자여야 합니다.");
    }
    if (amount <= 0) {
      throw new Error("[ERROR] 구입 금액은 0보다 커야 합니다.");
    }
    if (amount % LOTTO_CONFIG.PRICE_PER_TICKET !== 0) {
      throw new Error("[ERROR] 금액은 1000원 단위여야 합니다.");
    }

    return amount;
  }
}

export default LottoController;
