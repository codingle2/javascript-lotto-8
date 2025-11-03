import { LOTTO_CONFIG, ERROR_MESSAGES } from '../LottoConfig.js';

class Lotto {
  #numbers;

  constructor(numbers) {
    // 기본 검증
    this.#validate(numbers);
    // 유효성 검사 통과 시, 오름차순으로 정렬 저장
    this.#numbers = numbers.sort((a, b) => a - b);
  }

  #validate(numbers) {
    // 1. 기본 검증
    if (numbers.length !== LOTTO_CONFIG.NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO_LENGTH);
    }
    
    // 2.중복 검증
    if (new Set(numbers).size !== LOTTO_CONFIG.NUMBER_COUNT) {
      throw new Error(ERROR_MESSAGES.LOTTO_DUPLICATE);
    }

    // 3. 개별 번호의 범위 및 타입 검증
    numbers.forEach((number) => {
      this.#validateNumber(number);
    });
  }

  // 개별 숫자를 검증하는 private 메서드 
  #validateNumber(number) {
    if (number < LOTTO_CONFIG.MIN_NUMBER || number > LOTTO_CONFIG.MAX_NUMBER) {
      throw new Error(ERROR_MESSAGES.LOTTO_RANGE);
    }
    if (!Number.isInteger(number)) {
      throw new Error(ERROR_MESSAGES.LOTTO_NOT_INTEGER);
    }
  }

  //[추가] 로또 번호를 외부(View, Calculator)에서 읽을 수 있도록 getter 제공

  /** 
   @returns {number[]} - 정렬된 로또 번호
  */
  getNumbers() {
    return this.#numbers;
  }

  /**
  //당첨 번호와 몇 개가 일치하는지 계산 (결과 계산 시 필요)
  @param {number[]} winningNumbers - 당첨 번호 6개
  @returns {number} - 일치하는 번호 개수
  */
  countMatch(winningNumbers) {
    const winningSet = new Set(winningNumbers);
    
    const matchCount = this.#numbers.filter((number) =>
      winningSet.has(number)
    ).length;

    return matchCount;
  }

  /**
  // 보너스 번호를 포함하는지 확인 (결과 계산 시 필요)
  @param {number} bonusNumber - 보너스 번호
  @returns {boolean} - 포함 여부
  */
  hasBonus(bonusNumber) {
    return this.#numbers.includes(bonusNumber);
  }
}

export default Lotto;