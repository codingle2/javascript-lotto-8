import { Console } from "@woowacourse/mission-utils";

const InputView = {
  async readPurchaseAmount() {
    const input = await Console.readLineAsync("구입금액을 입력해 주세요.\n");
    return input;
  },
};

export default InputView;