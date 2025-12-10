import { useState } from 'react';
import { validateInput, calculateResult, formatResult, determineGameStatus } from '../utils/gameLogic';
import { DIFFICULTIES, CHARACTERS } from '../utils/gameConstants';

function GameScreen({ 
  selectedCharacter, 
  difficulty, 
  answer, 
  attempts, 
  currentAttempt,
  onAttemptSubmit,
  onGameEnd
}) {
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);
  
  const characterImage = selectedCharacter === CHARACTERS.SOL 
    ? '/resources/sol.png' 
    : '/resources/moli.png';
  const difficultyInfo = DIFFICULTIES[difficulty];
  const maxAttempts = difficultyInfo.maxAttempts;
  const remainingAttempts = maxAttempts - currentAttempt;
  
  const handleInputChange = (e) => {
    const value = e.target.value;
    // 숫자만 입력 가능, 최대 4자리
    // 숫자가 아닌 문자는 자동으로 제거
    const numericValue = value.replace(/\D/g, '').slice(0, 4);
    
    setInput(numericValue);
    setError('');
    
    // 유효성 검사
    if (numericValue.length === 4) {
      const validation = validateInput(numericValue);
      setIsValid(validation.valid);
      if (!validation.valid) {
        setError(validation.message);
      } else {
        setError('');
      }
    } else {
      setIsValid(false);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (input.length !== 4) {
      setError('네 자리 숫자를 입력해주세요.');
      return;
    }
    
    const validation = validateInput(input);
    if (!validation.valid) {
      setError(validation.message);
      setIsValid(false);
      return;
    }
    
    // 판정 계산
    const { strikes, balls } = calculateResult(answer, input);
    const resultText = formatResult(strikes, balls);
    
    // 시도 기록 추가
    const newAttempt = {
      attemptNumber: currentAttempt + 1,
      guess: input,
      strikes,
      balls,
      resultText,
      timestamp: new Date()
    };
    
    // 게임 상태 확인
    const gameStatus = determineGameStatus(strikes, currentAttempt + 1, maxAttempts);
    
    onAttemptSubmit(newAttempt, gameStatus);
    
    // 입력 초기화
    setInput('');
    setError('');
    setIsValid(false);
    
    // 게임 종료 시 결과 화면으로 이동
    if (gameStatus === 'WON' || gameStatus === 'LOST') {
      setTimeout(() => {
        onGameEnd(gameStatus, currentAttempt + 1);
      }, 500);
    }
  };
  
  const getResultColor = (resultText) => {
    if (resultText === '낫싱') {
      return 'text-gray-600'; // #999999에 가까운 색상
    }
    if (resultText.includes('S')) {
      return 'text-red-600'; // #FF4444에 가까운 색상
    }
    if (resultText.includes('B')) {
      return 'text-yellow-500'; // #FFD700에 가까운 색상
    }
    return 'text-gray-800';
  };
  
  const getResultStyle = (resultText) => {
    if (resultText === '낫싱') {
      return { color: '#999999' };
    }
    if (resultText.includes('S') && resultText.includes('B')) {
      // 스트라이크와 볼이 모두 있는 경우 스트라이크 색상 우선
      return { color: '#FF4444' };
    }
    if (resultText.includes('S')) {
      return { color: '#FF4444' };
    }
    if (resultText.includes('B')) {
      return { color: '#FFD700' };
    }
    return { color: '#333333' };
  };
  
  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat overflow-y-auto"
      style={{ 
        backgroundImage: `url(/resources/background.jpg)`,
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover'
      }}
    >
      {/* 흰색 오버레이 30% 투명도 */}
      <div 
        className="absolute inset-0 bg-white opacity-30"
        style={{ position: 'fixed' }}
      ></div>
      
      {/* 콘텐츠 */}
      <div className="relative z-10 min-h-screen py-8 px-5 md:px-10 lg:px-40">
        <div className="max-w-4xl mx-auto lg:max-w-2xl">
          {/* 상단 정보 영역 */}
          <div className="bg-white/90 rounded-lg p-6 mb-6 shadow-lg">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={characterImage} 
                  alt={`${selectedCharacter} 캐릭터`} 
                  className="w-12 h-12 object-contain"
                />
                <div>
                  <div className="text-lg font-bold text-gray-800">
                    {currentAttempt}회 시도
                  </div>
                  <div className="text-sm text-gray-600">
                    남은 기회: {remainingAttempts}회
                  </div>
                </div>
              </div>
              <div className="px-4 py-2 rounded-full bg-blue-100 text-blue-800 font-bold">
                {difficultyInfo.name}
              </div>
            </div>
          </div>
          
          {/* 시도 이력 영역 */}
          <div className="bg-white/90 rounded-lg p-6 mb-6 shadow-lg max-h-96 overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-800 mb-4">시도 이력</h3>
            {attempts.length === 0 ? (
              <p className="text-gray-500 text-center py-8">아직 시도한 기록이 없습니다.</p>
            ) : (
              <div className="space-y-2">
                {[...attempts].reverse().map((attempt) => (
                  <div 
                    key={attempt.attemptNumber}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                  >
                    <span className="font-bold text-gray-700">
                      {attempt.attemptNumber}회
                    </span>
                    <span className="font-mono text-lg text-gray-800">
                      {attempt.guess}
                    </span>
                    <span className="text-2xl">→</span>
                    <span 
                      className="font-bold text-xl"
                      style={getResultStyle(attempt.resultText)}
                    >
                      {attempt.resultText}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 입력 영역 */}
          <div className="bg-white/90 rounded-lg p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="guess-input" className="block text-lg font-bold text-gray-800 mb-2">
                  4자리 숫자 입력
                </label>
                <input
                  id="guess-input"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={input}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && isValid && input.length === 4) {
                      handleSubmit(e);
                    }
                  }}
                  placeholder="예: 1234"
                  maxLength={4}
                  autoComplete="off"
                  aria-label="4자리 숫자 입력"
                  aria-invalid={error ? 'true' : 'false'}
                  aria-describedby={error ? 'error-message' : undefined}
                  className={`
                    w-full px-4 py-3 text-2xl text-center font-mono rounded-lg border-2
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    ${error ? 'border-red-500' : isValid ? 'border-green-500' : 'border-gray-300'}
                    transition-colors
                  `}
                />
                {error && (
                  <p id="error-message" className="mt-2 text-red-600 font-bold animate-shake" role="alert">
                    {error}
                  </p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={!isValid || input.length !== 4}
                aria-label="숫자 제출"
                className={`
                  w-full py-4 px-6 rounded-lg text-xl font-bold text-white
                  transition-all duration-300
                  ${isValid && input.length === 4
                    ? 'bg-blue-600 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-lg'
                    : 'bg-gray-400 cursor-not-allowed opacity-50'
                  }
                `}
              >
                제출
              </button>
            </form>
          </div>
          
          {/* 하단 안내 영역 */}
          <div className="mt-6 text-center text-gray-700">
            <p className="text-lg">
              💡 <strong>스트라이크</strong>: 숫자와 위치 모두 일치 / <strong>볼</strong>: 숫자만 일치
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameScreen;
