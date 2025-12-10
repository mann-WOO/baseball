import { CHARACTERS } from '../utils/gameConstants';

function StartScreen({ onCharacterSelect }) {
  return (
    <div 
      className="fixed inset-0 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(/resources/background.jpg)` }}
    >
      {/* 흰색 오버레이 50% 투명도 */}
      <div className="absolute inset-0 bg-white opacity-50"></div>
      
      {/* 콘텐츠 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-5 md:px-10 lg:px-40">
        <div className="w-full max-w-4xl lg:max-w-2xl mx-auto flex flex-col items-center">
          {/* 로고 */}
          <div className="mb-8">
            <img 
              src="/resources/logo.png" 
              alt="SOL 야구 로고" 
              className="max-w-xs w-full h-auto"
            />
          </div>
          
          {/* 게임 제목 */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-12">
            SOL 야구!
          </h1>
          
          {/* 캐릭터 선택 버튼 */}
          <div className="flex flex-row gap-4 sm:gap-8 items-center justify-center flex-wrap">
            <button
              onClick={() => onCharacterSelect(CHARACTERS.SOL)}
              className="group relative transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="SOL 캐릭터 선택"
            >
              <img 
                src="/resources/sol.png" 
                alt="SOL 캐릭터 선택" 
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain drop-shadow-lg"
                style={{ filter: 'drop-shadow(0 0 3px rgba(0, 0, 0, 0.8))' }}
              />
              <div className="mt-4 text-center">
                <span className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
                  SOL
                </span>
              </div>
            </button>
            
            <button
              onClick={() => onCharacterSelect(CHARACTERS.MOLI)}
              className="group relative transition-transform duration-300 hover:scale-105 active:scale-95"
              aria-label="MOLI 캐릭터 선택"
            >
              <img 
                src="/resources/moli.png" 
                alt="MOLI 캐릭터 선택" 
                className="w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 object-contain drop-shadow-lg"
              />
              <div className="mt-4 text-center">
                <span className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-purple-600 transition-colors">
                  MOLI
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StartScreen;
