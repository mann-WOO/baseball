/**
 * 정답 생성 함수
 * 0~9 숫자 중 중복 없이 4개를 무작위로 선택하여 문자열로 반환
 * @returns {string} 4자리 숫자 문자열 (예: "1234")
 */
export function generateAnswer() {
  const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  const selected = [];
  
  // 4개의 숫자를 무작위로 선택 (중복 방지)
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    selected.push(numbers[randomIndex]);
    numbers.splice(randomIndex, 1); // 선택한 숫자 제거
  }
  
  return selected.join('');
}

/**
 * 입력 유효성 검사 함수
 * @param {string} input - 사용자 입력 문자열
 * @returns {{valid: boolean, message?: string}} 검사 결과
 */
export function validateInput(input) {
  // 1. 정확히 4자리 숫자인지 확인
  if (!/^\d{4}$/.test(input)) {
    return {
      valid: false,
      message: '네 자리 숫자를 입력해주세요.'
    };
  }
  
  // 2. 중복된 숫자가 없는지 확인
  const digits = input.split('');
  const uniqueDigits = new Set(digits);
  
  if (uniqueDigits.size !== 4) {
    return {
      valid: false,
      message: '중복되지 않는 숫자를 입력해주세요.'
    };
  }
  
  return { valid: true };
}

/**
 * 스트라이크/볼 판정 함수
 * @param {string} answer - 정답 문자열 (예: "1234")
 * @param {string} guess - 사용자 입력 문자열 (예: "1567")
 * @returns {{strikes: number, balls: number}} 판정 결과
 */
export function calculateResult(answer, guess) {
  let strikes = 0;
  let balls = 0;
  
  const answerDigits = answer.split('');
  const guessDigits = guess.split('');
  
  // 스트라이크 계산: 같은 인덱스에서 같은 숫자인 개수
  for (let i = 0; i < 4; i++) {
    if (answerDigits[i] === guessDigits[i]) {
      strikes++;
    }
  }
  
  // 볼 계산: 정답에 포함되지만 다른 위치에 있는 숫자 개수
  for (let i = 0; i < 4; i++) {
    if (answerDigits[i] !== guessDigits[i]) {
      // 현재 위치가 아닌 다른 위치에 같은 숫자가 있는지 확인
      if (answerDigits.includes(guessDigits[i])) {
        balls++;
      }
    }
  }
  
  return { strikes, balls };
}

/**
 * 판정 결과를 텍스트로 변환
 * @param {number} strikes - 스트라이크 개수
 * @param {number} balls - 볼 개수
 * @returns {string} 결과 텍스트 (예: "2S 1B", "낫싱")
 */
export function formatResult(strikes, balls) {
  if (strikes === 0 && balls === 0) {
    return '낫싱';
  }
  
  const parts = [];
  if (strikes > 0) {
    parts.push(`${strikes}S`);
  }
  if (balls > 0) {
    parts.push(`${balls}B`);
  }
  
  return parts.join(' ');
}

/**
 * 게임 상태 판정 함수
 * @param {number} strikes - 현재 스트라이크 개수
 * @param {number} currentAttempt - 현재 시도 횟수
 * @param {number} maxAttempts - 최대 시도 횟수
 * @returns {'WON' | 'LOST' | 'PLAYING'} 게임 상태
 */
export function determineGameStatus(strikes, currentAttempt, maxAttempts) {
  if (strikes === 4) {
    return 'WON';
  }
  
  if (currentAttempt >= maxAttempts) {
    return 'LOST';
  }
  
  return 'PLAYING';
}
