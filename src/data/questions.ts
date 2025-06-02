import type { Question } from "../types/types";

export const questions: Question[] = [
  {
    id: 1,
    text: "Which of the following is not a principle of Object-Oriented Programming (OOP)?",
    options: ["Encapsulation", "Polymorphism", "Abstraction", "Compilation"],
    correctAnswer: "Compilation"
  },
  {
    id: 2,
    text: "What is the purpose of normalization in a database?",
    options: [
      "To increase data duplication",
      "To reduce data redundancy",
      "To create more tables",
      "To speed up queries"
    ],
    correctAnswer: "To reduce data redundancy"
  },
  {
    id: 3,
    text: "Which of the following is a correct example of polymorphism?",
    options: [
      "Using the same function name with different parameters",
      "Using private variables in a class",
      "Creating objects",
      "Declaring variables"
    ],
    correctAnswer: "Using the same function name with different parameters"
  },
  {
    id: 4,
    text: "Which SQL command is used to remove a table from a database?",
    options: ["DELETE", "DROP", "REMOVE", "TRUNCATE"],
    correctAnswer: "DROP"
  },
  {
    id: 5,
    text: "In OOP, what does 'inheritance' allow you to do?",
    options: [
      "Create a new class from an existing class",
      "Hide internal details of objects",
      "Change object behavior at runtime",
      "Store multiple values in a variable"
    ],
    correctAnswer: "Create a new class from an existing class"
  }
];
