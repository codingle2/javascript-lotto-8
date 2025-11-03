import LottoStore from '../src/model/LottoStore.js';
import PrizeCalculator from '../src/model/PrizeCalculator.js';
import OutputView from '../src/view/OutputView.js';
import Lotto from '../src/Lotto.js';
import { LOTTO_CONFIG } from '../src/LottoConfig.js';
import { Random, Console } from '@woowacourse/mission-utils';

// Console만 모킹하고, Random은 실제 구현을 사용하도록 설정
jest.mock('@woowacourse/mission-utils', () => ({
  Random: jest.requireActual('@woowacourse/mission-utils').Random,
  // Console.print만 console.log로 연결하여 출력이 보이게 
  Console: {
    print: jest.fn(console.log),
    readLineAsync: jest.fn(),
  },
}));

describe('🧪 Lotto Simulation (1만 장 통계 테스트)', () => {
  // --- 3. 기존 simulation.js의 헬퍼 함수들을 테스트 스위트 내부에 정의 ---

  /**
  당첨 번호 6개를 무작위로 생성하고 정렬
  @returns {number[]} - 정렬된 당첨 번호
  */
  const generateWinningNumbers = () => {
    const numbers = Random.pickUniqueNumbersInRange(
      LOTTO_CONFIG.MIN_NUMBER,
      LOTTO_CONFIG.MAX_NUMBER,
      LOTTO_CONFIG.NUMBER_COUNT,
    );
    // Lotto 모델 번호 정렬
    const lotto = new Lotto(numbers);
    return lotto.getNumbers();
  };

  /**
  당첨 번호와 겹치지 않는 보너스 번호 1개를 무작위로 생성
  @param {number[]} winningNumbers - 당첨 번호 배열
  @returns {number} - 보너스 번호
  */
  const generateBonusNumber = (winningNumbers) => {
    while (true) {
      const number = Random.pickNumberInRange(
        LOTTO_CONFIG.MIN_NUMBER,
        LOTTO_CONFIG.MAX_NUMBER,
      );
      if (!winningNumbers.includes(number)) {
        return number;
      }
    }
  };

  const printSimulationHeader = (count, amount, winning, bonus) => {
    Console.print('--- 🧪 자동 시뮬레이션 결과 ---');
    Console.print(`[시뮬레이션 조건]`);
    Console.print(`- 구매 개수: ${count.toLocaleString()}개`);
    Console.print(`- 총 구매액: ${amount.toLocaleString()}원`);
    Console.print(`- (자동 생성) 당첨 번호: [${winning.join(', ')}]`);
    Console.print(`- (자동 생성) 보너스 번호: ${bonus}`);
  };

  // 각 테스트 전에 print 호출 기록 초기화
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('1만 장 구매 시뮬레이션이 실행되고 통계가 콘솔에 출력되어야 한다.', () => {
    // 시뮬레이션 로직을 테스트 케이스 내에서 직접 실행

    // 시뮬레이션 설정
    const SIMULATION_COUNT = 10_000;
    const PURCHASE_AMOUNT = SIMULATION_COUNT * LOTTO_CONFIG.PRICE_PER_TICKET;

    // 1. 로또 대량 구매
    const lottoStore = new LottoStore();
    lottoStore.generateLottos(SIMULATION_COUNT);
    const lottos = lottoStore.getLottos();

    // 2. 당첨/보너스 번호 생성 
    const winningNumbers = generateWinningNumbers();
    const bonusNumber = generateBonusNumber(winningNumbers);

    // 3. 당첨 결과 계산
    const prizeCalculator = new PrizeCalculator();
    const results = prizeCalculator.calculateResults(
      lottos,
      winningNumbers,
      bonusNumber,
    );
    const totalPrize = prizeCalculator.calculateTotalPrize(results);
    const rateOfReturn = prizeCalculator.calculateRateOfReturn(
      totalPrize,
      PURCHASE_AMOUNT,
    );

    // 4. 시뮬레이션 결과 출력
    printSimulationHeader(
      SIMULATION_COUNT,
      PURCHASE_AMOUNT,
      winningNumbers,
      bonusNumber,
    );
    OutputView.printResults(results, rateOfReturn);

    // 5. 테스트 검증
  expect(Console.print).toHaveBeenCalled();
  const lastCall = Console.print.mock.calls[Console.print.mock.calls.length - 1];
  expect(lastCall[0]).toEqual(expect.stringContaining('총 수익률은'));
  });
});