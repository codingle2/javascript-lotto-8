import { RANK, PRIZE_MONEY } from '../LottoConfig.js';

//당첨 결과 계산 및 수익률 계산을 담당
class PrizeCalculator {
  /**
  로또 1장의 당첨 등수를 판별
  @param {Lotto} lotto - 검사할 로또 객체
  @param {number[]} winningNumbers - 당첨 번호
  @param {number} bonusNumber - 보너스 번호
  @returns {string | null} - 당첨 등수 (RANK[key] 또는 null)
  */
  #determineRank(lotto, winningNumbers, bonusNumber) {
    const matchCount = lotto.countMatch(winningNumbers);
    const hasBonus = lotto.hasBonus(bonusNumber);

    if (matchCount === 6) return RANK.FIRST;
    if (matchCount === 5 && hasBonus) return RANK.SECOND;
    if (matchCount === 5) return RANK.THIRD;
    if (matchCount === 4) return RANK.FOURTH;
    if (matchCount === 3) return RANK.FIFTH;
    return null;
  }

  /**
   * 구매한 모든 로또의 당첨 결과를 집계
   * @param {Lotto[]} lottos - 구매한 로또 목록
   * @param {number[]} winningNumbers
   * @param {number} bonusNumber
   * @returns {Map<string, number>} - 등수별 당첨 횟수 (e.g., Map{FIFTH: 1, ...})
   */
  calculateResults(lottos, winningNumbers, bonusNumber) {
    // Map을 사용해 5등 -> 1등 순서(출력 순서)를 보장
    const results = new Map([
      [RANK.FIFTH, 0],
      [RANK.FOURTH, 0],
      [RANK.THIRD, 0],
      [RANK.SECOND, 0],
      [RANK.FIRST, 0],
    ]);

    lottos.forEach((lotto) => {
      const rank = this.#determineRank(lotto, winningNumbers, bonusNumber);
      if (rank) {
        results.set(rank, results.get(rank) + 1);
      }
    });

    return results;
  }

  /**
   * 당첨 통계를 기반으로 총 상금 계산
   * @param {Map<string, number>} results - 당첨 통계
   * @returns {number} - 총 상금
   */
  calculateTotalPrize(results) {
    let totalPrize = 0;
    results.forEach((count, rank) => {
      totalPrize += (PRIZE_MONEY[rank] || 0) * count;
    });
    return totalPrize;
  }

  /**
   * 총 상금과 구매 금액으로 수익률 계산
   * (소수점 둘째 자리에서 반올림)
   * @param {number} totalPrize - 총 상금
   * @param {number} purchaseAmount - 총 구매 금액
   * @returns {number} - 수익률 (e.g., 62.5)
   */
  calculateRateOfReturn(totalPrize, purchaseAmount) {
    if (purchaseAmount === 0) return 0;
    const rate = (totalPrize / purchaseAmount) * 100;
    // 소수점 둘째 자리에서 반올림하여 첫째 자리까지 표시
    return Math.round(rate * 10) / 10;
  }
}

export default PrizeCalculator;
