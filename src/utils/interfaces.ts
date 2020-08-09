export interface State {
  activeQuestion: number;
  answerState: {
    [id: number]: string;
  } | null;
  quiz: Quiz;
}

export interface Quiz {
  question: string;
  rightAnswerId: number;
  answers: Answer[];
}

export interface Answer {
  text: string;
  id: number;
}
