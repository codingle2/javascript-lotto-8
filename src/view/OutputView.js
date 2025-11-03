import { Console } from '@woowacourse/mission-utils';
import { RANK, PRIZE_MONEY } from '../LottoConfig.js';


//출력 메시지 포맷 정의
const PRIZE_FORMATTER = new Map([
  [RANK.FIFTH, `3개 일치 (${PRIZE_MONEY.FIFTH.toLocaleString()}원)`],
  [RANK.FOURTH, `4개 일치 (${PRIZE_MONEY.FOURTH.toLocaleString()}원)`],
  [RANK.THIRD, `5개 일치 (${PRIZE_MONEY.THIRD.toLocaleString()}원)`],
  [RANK.SECOND, `5개 일치, 보너스 볼 일치 (${PRIZE_MONEY.SECOND.toLocaleString()}원)`],
  [RANK.FIRST, `6개 일치 (${PRIZE_MONEY.FIRST.toLocaleString()}원)`],
]);

const OutputView = {
  printPurchaseResult(count) {
    Console.print(`\n${count}개를 구매했습니다.`);
  },

  printLottos(lottos) {
    lottos.forEach((lotto) => {
      const numbers = lotto.getNumbers();
      Console.print(`[${numbers.join(', ')}]`);
    });
  },

  /**
  당첨 통계 및 수익률 출력
  @param {Map<string, number>} results - 등수별 당첨 횟수 (Calculator에서 생성)
  @param {number} rateOfReturn - 계산된 수익률
   */
  printResults(results, rateOfReturn) {
    Console.print('\n당첨 통계');
    Console.print('---');

    // PRIZE_FORMATTER의 순서(5등->1등)대로 출력
    PRIZE_FORMATTER.forEach((message, rank) => {
      const count = results.get(rank) || 0;
      Console.print(`${message} - ${count}개`);
    });

    // 요구사항: 소수점 둘째 자리에서 반올림 (ex 62.5%)
    Console.print(`총 수익률은 ${rateOfReturn.toFixed(1)}%입니다.`);
  },

  printError(message) {
    Console.print(message);
  },
};

export default OutputView;