/**
 * 게임 상수 정의
 */

export const DIFFICULTIES = {
  EASY: {
    name: '쉬움',
    maxAttempts: 14,
    color: 'green'
  },
  NORMAL: {
    name: '중간',
    maxAttempts: 11,
    color: 'yellow'
  },
  HARD: {
    name: '어려움',
    maxAttempts: 8,
    color: 'red'
  }
};

export const CHARACTERS = {
  SOL: 'sol',
  MOLI: 'moli'
};

export const GAME_STATUS = {
  NOT_STARTED: 'NOT_STARTED',
  PLAYING: 'PLAYING',
  WON: 'WON',
  LOST: 'LOST'
};
