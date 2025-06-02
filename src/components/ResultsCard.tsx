import React, { useEffect } from 'react';
import { saveHighScore, isNewHighScore, getHighScore } from '../utils/storage';
import { Star } from 'lucide-react';

interface ResultsCardProps {
  score: number;
  totalQuestions: number;
  timeInSeconds: number;
  onRestart: () => void;
}

const ResultsCard: React.FC<ResultsCardProps> = ({
  score,
  totalQuestions,
  timeInSeconds,
  onRestart
}) => {
  const bonusScore = Math.floor((score * 1000) / (timeInSeconds || 1));
  const totalScore = score + bonusScore;

  const newHighScore = isNewHighScore(totalScore);
  const highScore = getHighScore();

  useEffect(() => {
    if (newHighScore) {
      saveHighScore(totalScore);
    }
  }, [newHighScore, totalScore]);

  return (
    <section
      aria-label="Quiz Results"
      className="w-full max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6 animate-fadeIn"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Quiz Results</h2>

      {newHighScore && (
        <div
          role="alert"
          className="bg-purple-100 border border-purple-300 rounded-lg p-4 mb-6 flex items-center"
        >
          <Star className="text-yellow-500 mr-2" size={24} aria-hidden="true" />
          <span className="text-purple-800 font-semibold">🎉 New High Score!</span>
        </div>
      )}

      <dl className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <dt className="text-gray-600">Base Score:</dt>
          <dd className="font-semibold">{score} / {totalQuestions}</dd>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <dt className="text-gray-600">Time Taken:</dt>
          <dd className="font-semibold">{timeInSeconds} seconds</dd>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <dt className="text-gray-600">Speed Bonus:</dt>
          <dd className="font-semibold text-green-600">+{bonusScore} points</dd>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <dt className="text-gray-600 font-semibold">Total Score:</dt>
          <dd className="text-xl font-bold text-purple-600">{totalScore}</dd>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <dt className="text-gray-600">High Score:</dt>
          <dd className="font-semibold">{highScore}</dd>
        </div>
      </dl>

      <button
        onClick={onRestart}
        className="w-full mt-6 bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        aria-label="Play again"
      >
        Play Again
      </button>
    </section>
  );
};

export default ResultsCard;
