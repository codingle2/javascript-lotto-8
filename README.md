# javascript-lotto-precourse

로또

## 프로젝트 개요

- 목표: 자세하게 설명 예정
- 패턴: MVC (Model-View-Controller)

- 프로젝트 개요 및 도전할 테스트 케이스 정리
- 기능적 요소 정리

## 기능 요구 사항

- 기술 예정

## 아키텍쳐

```
MVC 패턴
📁 src
 ├── App.js                # 프로그램 시작점 (run())
 ├── controller/
 │    └── LottoController.js # 사용자 입력/출력 흐름 제어
 ├── model/
 │    ├── Lotto.js           # 한 장 로또, 번호 관리
 │    ├── LottoStore.js      # 여러 장 로또 관리
 │    └── PrizeCalculator.js # 당첨 결과 계산 및 수익률
 ├── view/
 │    ├── InputView.js       # 사용자 입력
 │    └── OutputView.js      # 출력
 └── constants/
      └── LottoConfig.js     # 번호 범위, 가격, 상금, 등수 설정
```

- Controller: InputView → Model → OutputView 연결, 에러 처리 및 흐름 제어
- Model: Lotto, LottoStore, PrizeCalculator (SRP 준수)
- View: InputView / OutputView → 단위 테스트용 Mock 가능
- Constants: 재사용 가능한 설정 관리

| 브랜치 이름                  | 담당 기능          | 상세 내용                                                 | 테스트 포인트                                 |
| ---------------------------- | ------------------ | --------------------------------------------------------- | --------------------------------------------- |
| `feature/set-up`             | 기본 구조 생성     | MVC 패턴 별 폴더, 파일 생성                               | 기본적인 프로젝트 생성                        |
| `feature/purchase-input`     | 구입 금액 입력     | 1000원 단위 입력, 잘못된 입력 시 `[ERROR]` 출력 후 재입력 | 금액 범위, 1000원 단위 확인, 재입력 흐름      |
| `feature/lotto-generation`   | 로또 발행          | 1~45 범위, 중복 없는 6개 번호 생성, N장 구매 시 N개 생성  | 번호 개수, 범위, 중복, 오름차순 정렬          |
| `feature/winning-input`      | 당첨 번호 입력     | 쉼표 구분 6개 숫자 입력, 범위 1~45, 중복 불가             | 번호 개수, 범위, 중복, 재입력 흐름            |
| `feature/result-calculation` | 당첨 결과 & 수익률 | 등수 판정, 당첨 개수 계산, 총 수익률 계산                 | 등수 판정 로직, 보너스 번호 판정, 수익률 계산 |
| `feature/error-handling`     | 예외 처리          | 금액, 번호, 보너스 입력 오류 처리, `[ERROR]` 메시지 통일  | Error 메시지 테스트, 재입력 흐름 검증         |
| `feature/io-abstraction`     | 입출력 추상화      | InputView / OutputView, Console 직접 호출 제거, Mock 가능 | Input/Output Mock 테스트, 출력 포맷 확인      |

## 코드적 요소
| 요소          | 상세 내용                                                  |
| ------------- | ---------------------------------------------------------- |
| 객체지향      | Lotto, LottoStore, PrizeCalculator 클래스별 단일 책임(SRP) |
| SRP           | 클래스/메서드별 단일 책임 유지, 15줄 이하                  |
| 에러 처리     | `[ERROR]` 메시지 일관성, 타입별 Error 분리 가능            |
| 입출력 추상화 | InputView / OutputView 인터페이스 적용 → Mocking 가능      |
| 설정화        | LottoConfig → 번호 범위, 가격, 상금, 등수 관리             |

요구사항: SRP, 함수 길이 15줄 이하, 3항 연산자 사용 금지, 함수형 프로그래밍 일부 적용