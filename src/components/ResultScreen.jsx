import { CHARACTERS, DIFFICULTIES } from '../utils/gameConstants';

function ResultScreen({ 
  selectedCharacter, 
  difficulty,
  gameStatus, 
  attempts, 
  answer,
  onRestart,
  onGoToMain 
}) {
  const characterImage = selectedCharacter === CHARACTERS.SOL 
    ? '/resources/sol.png' 
    : '/resources/moli.png';
  const difficultyInfo = DIFFICULTIES[difficulty];
  
  const isWon = gameStatus === 'WON';
  const attemptCount = attempts.length;
  
  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/resources/background.jpg)` }}
    >
      {/* 흰색 오버레이 70% 투명도 */}
      <div className="absolute inset-0 bg-white opacity-70"></div>
      
      {/* 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 animate-fadeIn">
        {/* 결과 메시지 */}
        <div className="text-center mb-8">
          {isWon ? (
            <h1 className="text-5xl md:text-6xl font-bold text-green-600 mb-4">
              🎉 축하합니다! 🎉
            </h1>
          ) : (
            <h1 className="text-5xl md:text-6xl font-bold text-red-600 mb-4">
              아쉽네요! 😢
            </h1>
          )}
        </div>
        
        {/* 캐릭터 이미지 */}
        <div className="mb-8 animate-bounce">
          <img 
            src={characterImage} 
            alt={`${selectedCharacter} 캐릭터`} 
            className="w-48 h-48 md:w-64 md:h-64 object-contain"
          />
        </div>
        
        {/* 상세 정보 */}
        <div className="bg-white/90 rounded-lg p-8 mb-8 shadow-xl max-w-md w-full text-center">
          {isWon ? (
            <p className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {attemptCount}회 만에 성공했습니다!
            </p>
          ) : (
            <>
              <p className="text-xl font-bold text-gray-800 mb-4">
                정답은
              </p>
              <p className="text-4xl font-mono font-bold text-blue-600 mb-4">
                {answer}
              </p>
              <p className="text-xl font-bold text-gray-800">
                였습니다.
              </p>
            </>
          )}
        </div>
        
        {/* 액션 버튼 */}
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
          <button
            onClick={onRestart}
            className="
              flex-1 py-4 px-8 rounded-lg text-xl font-bold text-white
              bg-blue-600 hover:bg-blue-700
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            "
          >
            다시 하기
          </button>
          
          <button
            onClick={onGoToMain}
            className="
              flex-1 py-4 px-8 rounded-lg text-xl font-bold text-white
              bg-gray-600 hover:bg-gray-700
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            "
          >
            메인으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResultScreen;
