import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import LottoStore from '../model/LottoStore.js'; 
import { LOTTO_CONFIG, ERROR_MESSAGES } from '../LottoConfig.js'; 
import Lotto from "../model/Lotto.js"

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

  // 당첨 번호 관련 메서드
  /**
  당첨 번호 입력을 받고 유효성 검사를 통과할 때까지 반복
  @returns {Promise<number[]>} - 유효성이 검증된 당첨 번호 배열
   */
  async getWinningNumbers() {
    while (true) {
      try {
        const input = await InputView.readWinningNumbers();
        const numbers = this.#parseAndValidateWinningNumbers(input);
        return numbers;
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  /**
  쉼표(,)로 구분된 문자열을 파싱하고 Lotto 모델을 통해 검증
  @param {string} input - 사용자 입력 문자열
  @returns {number[]} - 숫자 배열
   */
  #parseAndValidateWinningNumbers(input) {
    const numbers = input.split(',').map((numStr) => {
      const num = Number(numStr.trim()); // 공백 제거 후 숫자로 변환
      if (Number.isNaN(num)) {
        // Lotto 생성자 전에 NaN 체크가 필요
        throw new Error(ERROR_MESSAGES.WINNING_NOT_NUMBER);
      }
      return num;
    });

    // Lotto 클래스의 생성자/유효성 검사 로직을 재사용
    // (길이, 중복, 범위, 정수 모두 검사됨)
    new Lotto(numbers);

    return numbers;
  }

  // 보너스 번호 관련 메서드 

  /**
  보너스 번호 입력을 받고 유효성 검사를 통과할 때까지 반복
  @param {number[]} winningNumbers - (중복 검사를 위한) 당첨 번호 배열
  @returns {Promise<number>} - 유효성이 검증된 보너스 번호
   */
  async getBonusNumber(winningNumbers) {
    while (true) {
      try {
        const input = await InputView.readBonusNumber();
        const number = this.#parseAndValidateBonusNumber(input, winningNumbers);
        return number; 
      } catch (error) {
        OutputView.printError(error.message);
      }
    }
  }

  /**
   보너스 번호 문자열을 파싱하고 유효성 검사
  @param {string} input - 사용자 입력 문자열
  @param {number[]} winningNumbers - 당첨 번호 배열
  @returns {number} - 유효한 보너스 번호
   */
  #parseAndValidateBonusNumber(input, winningNumbers) {
    const number = Number(input.trim());

    // 숫자가 아니거나 정수가 아닐 경우 (소수, 문자 등)
    if (Number.isNaN(number) || !Number.isInteger(number)) {
      throw new Error(ERROR_MESSAGES.BONUS_NAN);
    }
    // 로또 번호의 유효 범위(예: 1~45)를 벗어나는 경우
    if (number < LOTTO_CONFIG.MIN_NUMBER || number > LOTTO_CONFIG.MAX_NUMBER) {
      throw new Error(ERROR_MESSAGES.BONUS_RANGE);
    }
    // 이미 당첨 번호 배열에 포함된 숫자인 경우 (중복 방지
    if (winningNumbers.includes(number)) {
      throw new Error(ERROR_MESSAGES.BONUS_DUPLICATE);
    }

    return number;
  }
}

export default LottoController;
