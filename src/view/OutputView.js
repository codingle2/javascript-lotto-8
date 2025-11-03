import { Console } from '@woowacourse/mission-utils';

const OutputView = {
  printPurchaseResult(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  },

  /**
   @param {Lotto[]} lottos 
   */
  printLottos(lottos) {
    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      Console.print(`[${numbers.join(', ')}]`);
    });
  },

  printError(message) {
    Console.print(message);
  },

};

export default OutputView;