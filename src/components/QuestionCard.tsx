import React, { useState } from 'react';
import type { Question } from '../types/types';

interface QuestionCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(option);
      setSelectedOption(null);
      setShowFeedback(false);
    }, 750);
  };

  const getOptionClass = (option: string) => {
    if (!showFeedback || selectedOption !== option) {
      return selectedOption === option 
        ? "border-purple-500 bg-purple-50" 
        : "border-gray-200 hover:border-purple-300 hover:bg-purple-50";
    }
    
    return option === question.correctAnswer
      ? "border-green-500 bg-green-50"
      : selectedOption === option
        ? "border-red-500 bg-red-50"
        : "border-gray-200 opacity-50";
  };

  return (
    <div className="animate-fadeIn">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-6">{question.text}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => !showFeedback && handleOptionSelect(option)}
            disabled={showFeedback}
            className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${getOptionClass(option)}`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;