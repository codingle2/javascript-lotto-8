// src/model/LottoStore.js

import { Random } from '@woowacourse/mission-utils';
import { LOTTO_CONFIG } from '../LottoConfig.js';
import Lotto from '../Lotto.js';

class LottoStore {
  #lottos;

  constructor() {
    this.#lottos = [];
  }

  // 로또 생성 
  generateLottos(count) {
    for (let i = 0; i < count; i++) {
      const numbers = this.#pickLottoNumbers();
      const lotto = new Lotto(numbers);
      this.#lottos.push(lotto);
    }
  }

  // mission-utils 사용
  #pickLottoNumbers() {
    return Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.MIN_NUMBER,
      LOTTO_CONFIG.MAX_NUMBER,
      LOTTO_CONFIG.NUMBER_COUNT
    );
  }

  // 생성 로또 목록을 반환 get
  getLottos() {
    return this.#lottos;
  }
}

export default LottoStore;