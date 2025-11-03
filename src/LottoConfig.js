export const LOTTO_CONFIG = {
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
  PRICE_PER_TICKET: 1000,
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
};