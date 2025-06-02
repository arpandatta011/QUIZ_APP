const HIGH_SCORE_KEY = 'quiz-high-score';
const SESSION_TIME_KEY = 'quiz-session-time';

export const saveHighScore = (score: number): void => {
  const currentHighScore = getHighScore();
  if (score > currentHighScore) {
    localStorage.setItem(HIGH_SCORE_KEY, score.toString());
  }
};

export const getHighScore = (): number => {
  const highScore = localStorage.getItem(HIGH_SCORE_KEY);
  return highScore ? parseInt(highScore, 10) : 0;
};

export const isNewHighScore = (score: number): boolean => {
  return score > getHighScore();
};

export const saveSessionTime = (timeInSeconds: number): void => {
  sessionStorage.setItem(SESSION_TIME_KEY, timeInSeconds.toString());
};

export const getSessionTime = (): number => {
  const time = sessionStorage.getItem(SESSION_TIME_KEY);
  return time ? parseInt(time, 10) : 0;
};

