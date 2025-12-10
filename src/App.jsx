import { useState } from 'react';
import StartScreen from './components/StartScreen';
import DifficultyScreen from './components/DifficultyScreen';
import GameScreen from './components/GameScreen';
import ResultScreen from './components/ResultScreen';
import { generateAnswer } from './utils/gameLogic';
import { GAME_STATUS, DIFFICULTIES } from './utils/gameConstants';

function App() {
  const [screen, setScreen] = useState('start'); // 'start', 'difficulty', 'game', 'result'
  const [gameState, setGameState] = useState({
    selectedCharacter: null,
    difficulty: null,
    maxAttempts: null,
    answer: null,
    currentAttempt: 0,
    attempts: [],
    status: GAME_STATUS.NOT_STARTED
  });
  
  // 캐릭터 선택
  const handleCharacterSelect = (character) => {
    setGameState(prev => ({
      ...prev,
      selectedCharacter: character
    }));
    setScreen('difficulty');
  };
  
  // 난이도 선택
  const handleDifficultySelect = (difficulty) => {
    const difficultyInfo = DIFFICULTIES[difficulty];
    const answer = generateAnswer();
    
    setGameState(prev => ({
      ...prev,
      difficulty,
      maxAttempts: difficultyInfo.maxAttempts,
      answer,
      currentAttempt: 0,
      attempts: [],
      status: GAME_STATUS.PLAYING
    }));
    setScreen('game');
  };
  
  // 시도 제출
  const handleAttemptSubmit = (newAttempt, gameStatus) => {
    setGameState(prev => ({
      ...prev,
      attempts: [...prev.attempts, newAttempt],
      currentAttempt: prev.currentAttempt + 1,
      status: gameStatus
    }));
  };
  
  // 게임 종료
  const handleGameEnd = (gameStatus, finalAttempt) => {
    setGameState(prev => ({
      ...prev,
      status: gameStatus,
      currentAttempt: finalAttempt
    }));
    setScreen('result');
  };
  
  // 다시 하기
  const handleRestart = () => {
    const answer = generateAnswer();
    setGameState(prev => ({
      ...prev,
      answer,
      currentAttempt: 0,
      attempts: [],
      status: GAME_STATUS.PLAYING
    }));
    setScreen('game');
  };
  
  // 메인으로
  const handleGoToMain = () => {
    setGameState({
      selectedCharacter: null,
      difficulty: null,
      maxAttempts: null,
      answer: null,
      currentAttempt: 0,
      attempts: [],
      status: GAME_STATUS.NOT_STARTED
    });
    setScreen('start');
  };
  
  // 화면 렌더링
  const renderScreen = () => {
    switch (screen) {
      case 'start':
        return <StartScreen onCharacterSelect={handleCharacterSelect} />;
      
      case 'difficulty':
        return (
          <DifficultyScreen
            selectedCharacter={gameState.selectedCharacter}
            onDifficultySelect={handleDifficultySelect}
          />
        );
      
      case 'game':
        return (
          <GameScreen
            selectedCharacter={gameState.selectedCharacter}
            difficulty={gameState.difficulty}
            answer={gameState.answer}
            attempts={gameState.attempts}
            currentAttempt={gameState.currentAttempt}
            onAttemptSubmit={handleAttemptSubmit}
            onGameEnd={handleGameEnd}
          />
        );
      
      case 'result':
        return (
          <ResultScreen
            selectedCharacter={gameState.selectedCharacter}
            difficulty={gameState.difficulty}
            gameStatus={gameState.status}
            attempts={gameState.attempts}
            answer={gameState.answer}
            onRestart={handleRestart}
            onGoToMain={handleGoToMain}
          />
        );
      
      default:
        return <StartScreen onCharacterSelect={handleCharacterSelect} />;
    }
  };
  
  return (
    <div className="min-h-screen">
      {renderScreen()}
    </div>
  );
}

export default App;
