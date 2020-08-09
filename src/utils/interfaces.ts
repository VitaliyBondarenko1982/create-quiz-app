export interface AnswerState {
  id: number;
  result: string;
}

export interface State {
  activeQuestion: number;
  answerState: AnswerState;
  quiz: Question;
}

export interface Question {
  question: string;
  rightAnswerId: number;
  result: string;
  answers: Answer[];
}

export interface Answer {
  text: string;
  id: number;
}
