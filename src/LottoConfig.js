export const LOTTO_CONFIG = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
  PRICE_PER_TICKET: 1000,
};

// 당첨 등수 식별자
export const RANK = {
  FIRST: 'FIRST',
  SECOND: 'SECOND',
  THIRD: 'THIRD',
  FOURTH: 'FOURTH',
  FIFTH: 'FIFTH',
};

// 등수별 당첨금
export const PRIZE_MONEY = {
  [RANK.FIRST]: 2_000_000_000,
  [RANK.SECOND]: 30_000_000,
  [RANK.THIRD]: 1_500_000,
  [RANK.FOURTH]: 50_000,
  [RANK.FIFTH]: 5_000,
};


// 에러 메시지 정리
export const ERROR_MESSAGES = {
  // 구입 금액 관련 에러
  AMOUNT_NAN: '[ERROR] 구입 금액은 숫자여야 합니다.',
  AMOUNT_NEGATIVE: '[ERROR] 구입 금액은 0보다 커야 합니다.',
  AMOUNT_UNIT: `[ERROR] 금액은 ${LOTTO_CONFIG.PRICE_PER_TICKET}원 단위여야 합니다.`,

  // 로또 번호 관련 에러 (Lotto.js에서 사용)
  LOTTO_LENGTH: `[ERROR] 로또 번호는 ${LOTTO_CONFIG.NUMBER_COUNT}개여야 합니다.`,
  LOTTO_DUPLICATE: '[ERROR] 로또 번호에 중복된 숫자가 있습니다.',
  LOTTO_RANGE: `[ERROR] 로또 번호는 ${LOTTO_CONFIG.MIN_NUMBER}부터 ${LOTTO_CONFIG.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  LOTTO_NOT_INTEGER: '[ERROR] 로또 번호는 정수여야 합니다.',

  
  // 당첨 번호 파싱 관련 (쉼표로 구분되지 않거나 숫자가 아닌 경우)
  WINNING_NOT_NUMBER: '[ERROR] 당첨 번호는 쉼표로 구분된 숫자여야 합니다.',

  // 보너스 번호 관련 에러
  BONUS_NAN: '[ERROR] 보너스 번호는 숫자여야 합니다.',
  BONUS_RANGE: `[ERROR] 보너스 번호는 ${LOTTO_CONFIG.MIN_NUMBER}부터 ${LOTTO_CONFIG.MAX_NUMBER} 사이의 숫자여야 합니다.`,
  BONUS_DUPLICATE: '[ERROR] 보너스 번호는 당첨 번호와 중복될 수 없습니다.',
};