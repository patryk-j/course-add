export interface Answer {
  label: string;
  value: number;
  isCorrect: boolean;
}

export interface QuizState {
  label: string;
  answers: Answer[];
}
