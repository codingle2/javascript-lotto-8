import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readPurchaseAmount() {
    const input = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
    return input;
  },


  // 당첨 번호 입력
  async readWinningNumbers() {
    // 실행 예시에 따라, 로또 목록 출력 후 한 줄 띄고 질문합니다.
    const input = await Console.readLineAsync('\n당첨 번호를 입력해 주세요.\n');
    return input;
  },

  
  // 보너스 번호 입력
  async readBonusNumber() {
    // 당첨 번호 입력 후 한 줄 띄고 질문합니다.
    const input = await Console.readLineAsync('\n보너스 번호를 입력해 주세요.\n');
    return input;
  },
};

export default InputView;
