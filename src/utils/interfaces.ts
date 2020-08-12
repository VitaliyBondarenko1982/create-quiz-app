export interface AnswerState {
  id: number;
  result: string;
}

export interface State {
  isFinished: boolean;
  activeQuestion: number;
  answerState: AnswerState;
  quiz: Question[];
}

export interface Question {
  question: string;
  rightAnswerId: number;
  result: string;
  answers: Answer[];
  id: number;
}

export interface Answer {
  text: string;
  id: number;
}

export interface AuthState {
  isFormValid: boolean;
  formControls: Control[];
}

export interface CreateState extends AuthState{
  quiz: Question[];
  rightAnswerId: number;
}

export interface Control {
  value: string;
  type?: string;
  label: string;
  name: string;
  errorMessage: string;
  valid: boolean;
  touched: boolean;
  validation?: Validation;
}

export interface OptionControl extends Control {
  id: number;
}

export interface Validation {
  required: boolean;
  minLength?: number;
  email?: boolean;
}

export interface ControlsArr {
  control?: Control;
  index?: number;
}
