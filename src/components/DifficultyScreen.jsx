import { DIFFICULTIES, CHARACTERS } from '../utils/gameConstants';

function DifficultyScreen({ selectedCharacter, onDifficultySelect }) {
  const characterImage = selectedCharacter === CHARACTERS.SOL 
    ? '/resources/sol.png' 
    : '/resources/moli.png';
  
  const difficultyButtons = [
    { key: 'EASY', difficulty: DIFFICULTIES.EASY },
    { key: 'NORMAL', difficulty: DIFFICULTIES.NORMAL },
    { key: 'HARD', difficulty: DIFFICULTIES.HARD }
  ];
  
  const getButtonColor = (color) => {
    const colors = {
      green: 'bg-green-500 hover:bg-green-600 active:bg-green-700',
      yellow: 'bg-yellow-500 hover:bg-yellow-600 active:bg-yellow-700',
      red: 'bg-red-500 hover:bg-red-600 active:bg-red-700'
    };
    return colors[color] || colors.green;
  };
  
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
          {/* 선택된 캐릭터 이미지 */}
        <div className="mb-8">
          <img 
            src={characterImage} 
            alt={`${selectedCharacter} 캐릭터`} 
            className="w-32 h-32 md:w-40 md:h-40 object-contain"
            style={{ 
              filter: 'drop-shadow(0.3px 0 0 black) drop-shadow(-0.3px 0 0 black) drop-shadow(0 0.3px 0 black) drop-shadow(0 -0.3px 0 black) drop-shadow(0.3px 0.3px 0 black) drop-shadow(-0.3px -0.3px 0 black) drop-shadow(0.3px -0.3px 0 black) drop-shadow(-0.3px 0.3px 0 black)'
            }}
          />
        </div>
        
        {/* 안내 문구 */}
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12">
          난이도를 선택하세요!
        </h2>
        
        {/* 난이도 버튼 */}
        <div className="flex flex-col gap-6 w-full max-w-md">
          {difficultyButtons.map(({ key, difficulty }) => (
            <button
              key={key}
              onClick={() => onDifficultySelect(key)}
              className={`
                ${getButtonColor(difficulty.color)}
                text-white text-2xl md:text-3xl font-bold py-6 px-8 rounded-lg
                transition-all duration-300
                hover:scale-105 active:scale-95
                shadow-lg hover:shadow-xl
              `}
            >
              {difficulty.name} ({difficulty.maxAttempts}회)
            </button>
          ))}
        </div>
        </div>
      </div>
    </div>
  );
}

export default DifficultyScreen;
