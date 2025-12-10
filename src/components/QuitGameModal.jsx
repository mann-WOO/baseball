import { CHARACTERS } from '../utils/gameConstants';

function QuitGameModal({ 
  selectedCharacter, 
  onGoToMain, 
  onRestart, 
  onCancel 
}) {
  const characterImage = selectedCharacter === CHARACTERS.SOL 
    ? '/resources/sol.png' 
    : '/resources/moli.png';
  
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn"
      onClick={onCancel}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4 p-6 animate-fadeIn"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 모달 헤더 */}
        <div className="flex items-center justify-center mb-6">
          <img 
            src={characterImage} 
            alt={`${selectedCharacter} 캐릭터`} 
            className="w-16 h-16 object-contain"
          />
        </div>
        
        {/* 모달 제목 */}
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          게임을 중단하시겠습니까?
        </h2>
        
        {/* 모달 내용 */}
        <p className="text-gray-600 text-center mb-6">
          현재 진행 중인 게임이 저장되지 않습니다.
        </p>
        
        {/* 버튼 그룹 */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onGoToMain}
            className="
              w-full py-3 px-6 rounded-lg text-lg font-bold text-white
              bg-gray-600 hover:bg-gray-700
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            "
          >
            메인으로
          </button>
          
          <button
            onClick={onRestart}
            className="
              w-full py-3 px-6 rounded-lg text-lg font-bold text-white
              bg-blue-600 hover:bg-blue-700
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            "
          >
            다시 시작
          </button>
          
          <button
            onClick={onCancel}
            className="
              w-full py-3 px-6 rounded-lg text-lg font-bold text-gray-700
              bg-gray-200 hover:bg-gray-300
              transition-all duration-300
              hover:scale-105 active:scale-95
              shadow-lg hover:shadow-xl
            "
          >
            게임 계속하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuitGameModal;
