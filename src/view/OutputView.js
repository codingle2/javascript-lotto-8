import { Console } from "@woowacourse/mission-utils";

const OutputView = {
  printError(message) {
    Console.print(message);
  },
  printPurchaseResult(count) {
    Console.print(`${count}개를 구매했습니다.`);
  },
};

export default OutputView;
