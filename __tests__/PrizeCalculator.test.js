import Lotto from '../src/Lotto.js';
import PrizeCalculator from '../src/model/PrizeCalculator.js';
import { RANK, LOTTO_CONFIG } from '../src/LottoConfig.js';

describe('PrizeCalculator 테스트', () => {
  let prizeCalculator;
  
  beforeEach(() => {
    prizeCalculator = new PrizeCalculator();
  });

  const winningNumbers = [1, 2, 3, 4, 5, 6];
  const bonusNumber = 7;

  // 1. 당첨 결과 (calculateResults) 테스트
  test.each([
    // [설명, 로또번호, 기대 등수]
    ['1등 (6개 일치)', new Lotto([1, 2, 3, 4, 5, 6]), RANK.FIRST],
    ['2등 (5개 + 보너스)', new Lotto([1, 2, 3, 4, 5, 7]), RANK.SECOND],
    ['3등 (5개 일치)', new Lotto([1, 2, 3, 4, 5, 8]), RANK.THIRD],
    ['4등 (4개 일치)', new Lotto([1, 2, 3, 4, 8, 9]), RANK.FOURTH],
    ['5등 (3개 일치)', new Lotto([1, 2, 3, 8, 9, 10]), RANK.FIFTH],
    ['낙첨 (2개 일치)', new Lotto([1, 2, 8, 9, 10, 11]), null],
  ])('%s 테스트', (desc, lotto, expectedRank) => {
    const lottos = [lotto];
    const results = prizeCalculator.calculateResults(lottos, winningNumbers, bonusNumber);
    
    // 기대 등수가 null이 아니면, 해당 등수가 1개여야 함
    if (expectedRank) {
      expect(results.get(expectedRank)).toBe(1);
    }
    
    // 5등부터 1등까지 총합이 1 또는 0 (낙첨) 이어야 함
    const totalWins = Array.from(results.values()).reduce((a, b) => a + b, 0);
    expect(totalWins).toBe(expectedRank ? 1 : 0);
  });

  // 2. 수익률 (calculateRateOfReturn) 테스트
  test('총 수익률을 소수점 둘째 자리에서 반올림하여 계산한다 (예: 62.5%)', () => {
    // 8000원 구매, 5000원(5등) 당첨
    const purchaseAmount = 8000;
    const totalPrize = 5000;
    const rate = prizeCalculator.calculateRateOfReturn(totalPrize, purchaseAmount);
    
    // (5000 / 8000) * 100 = 62.5
    expect(rate).toBe(62.5);
  });

  test('수익률 계산 시 100.0%인 경우', () => {
    const purchaseAmount = 1000;
    const totalPrize = 1000;
    const rate = prizeCalculator.calculateRateOfReturn(totalPrize, purchaseAmount);
    expect(rate).toBe(100.0);
  });
});
