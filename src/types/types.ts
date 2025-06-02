export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: string[];
  isCompleted: boolean;
  startTime: number;
  endTime: number;
}