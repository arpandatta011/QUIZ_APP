import React, { useState, useEffect } from 'react';
import { questions } from '../data/questions';
import { useTimer } from '../hooks/useTimer';
import { saveSessionTime } from '../utils/storage';
import QuestionCard from './QuestionCard';
import ResultsCard from './ResultsCard';
import ProgressBar from './ProgressBar';
import type { QuizState } from '../types/types';

const initialState: QuizState = {
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  isCompleted: false,
  startTime: Date.now(),
  endTime: 0
};

const QuizApp: React.FC = () => {
  const [state, setState] = useState<QuizState>(initialState);
  const [isActive, setIsActive] = useState(true);
  const [resetTimer, setResetTimer] = useState(0); 
  const seconds = useTimer(isActive, resetTimer); 

  useEffect(() => {
    setState({
      ...initialState,
      startTime: Date.now()
    });
    setIsActive(true);
  }, []);

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[state.currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    const newAnswers = [...state.answers, answer];
    const newScore = isCorrect ? state.score + 1 : state.score;
    
    if (state.currentQuestionIndex === questions.length - 1) {
      const endTime = Date.now();
      setIsActive(false);
      
      const timeTaken = Math.floor((endTime - state.startTime) / 1000);
      saveSessionTime(timeTaken);
      
      setState({
        ...state,
        score: newScore,
        answers: newAnswers,
        isCompleted: true,
        endTime
      });
    } else {
      setState({
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
        score: newScore,
        answers: newAnswers
      });
    }
  };

  const handleRestart = () => {
    setResetTimer(prev => prev + 1);
    setIsActive(true);
    setState({
      ...initialState,
      startTime: Date.now()
    });
  };

  const timeTaken = state.isCompleted 
    ? Math.floor((state.endTime - state.startTime) / 1000) 
    : seconds;

  const currentQuestion = questions[state.currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 p-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-purple-600 p-4 flex items-center justify-center">
          <h1 className="text-xl md:text-2xl font-bold text-white">Quiz App</h1>
        </div>
        
        <div className="p-5 md:p-8">
          {!state.isCompleted ? (
            <>
              <ProgressBar 
                currentQuestion={state.currentQuestionIndex + 1} 
                totalQuestions={questions.length} 
              />
              
              <div className="mb-4 flex justify-between items-center">
                <span className="bg-purple-100 text-purple-800 text-sm font-medium px-3 py-1 rounded-full">
                  Score: {state.score}
                </span>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                  Time: {seconds}s
                </span>
              </div>
              
              <QuestionCard 
                question={currentQuestion} 
                onAnswer={handleAnswer}
              />
            </>
          ) : (
            <ResultsCard 
              score={state.score}
              totalQuestions={questions.length}
              timeInSeconds={timeTaken}
              onRestart={handleRestart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;