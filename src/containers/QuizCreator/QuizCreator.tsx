import React, { ChangeEvent, Component, FormEvent } from 'react';
import axios from '../../utils/api';
import { createControl, validate, validateForm } from '../../form/formFramework';
import { Button } from '../../components/UI/Button';
import {
  Question,
  CreateState,
  ControlsArr,
  OptionControl,
} from '../../utils/interfaces';
import { Input } from '../../components/UI/Input';
import { Select } from '../../components/UI/Select';
import './_QuizCreator.scss';

function createOptionControl(number: number) {
  return createControl({
    label: `Option ${number}`,
    name: `option-${number}`,
    errorMessage: 'Option don\'t be empty',
    id: number,
    value: '',
    valid: false,
    touched: false,
  }, { required: true });
}

function createFormControls() {
  return [
    createControl({
      label: 'Enter your question',
      errorMessage: 'Question don\'t be empty',
      name: 'question',
      value: '',
      valid: false,
      touched: false,
      id: Math.random(),
    }, { required: true }),
    createOptionControl(1),
    createOptionControl(2),
    createOptionControl(3),
    createOptionControl(4),
  ];
}

export class QuizCreator extends Component {
  state = {
    quiz: [],
    isFormValid: false,
    rightAnswerId: 1,
    formControls: createFormControls(),
  };

  addQuestionHandler = (event: FormEvent) => {
    event.preventDefault();

    const quiz: Array<Question> = [...this.state.quiz] as [];
    const { formControls, rightAnswerId } = this.state;
    const index = quiz.length + 1;

    const questionItem: Question = {
      question: formControls[0].value,
      id: index,
      result: '',
      rightAnswerId,
      answers: [
        { text: formControls[1].value, id: formControls[1].id },
        { text: formControls[2].value, id: formControls[2].id },
        { text: formControls[3].value, id: formControls[3].id },
        { text: formControls[4].value, id: formControls[4].id },
      ],
    };

    quiz.push(questionItem);

    this.setState((prevState: CreateState) => {
      return {
        ...prevState,
        quiz,
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      };
    });
  };

  createQuizHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('quizzes.json', this.state.quiz);
      this.setState({
        quiz: [],
        isFormValid: false,
        rightAnswerId: 1,
        formControls: createFormControls(),
      });
    } catch (e) {
      console.log(e);
    }
  };

  changeHandler = (event: ChangeEvent<HTMLInputElement>, controlName: string) => {
    const { value } = event.target;
    const formControls = [...this.state.formControls];

    const currentControl = (): ControlsArr => {
      let control;
      let index;

      for (let i = 0; i < formControls.length; i += 1) {
        if (formControls[i].name === controlName) {
          control = formControls[i];
          index = i;
          break;
        }
      }

      return { control, index };
    };

    const { control, index } = currentControl();

    if (control && index !== undefined) {
      control.value = value;
      control.touched = true;
      control.valid = validate(control.value, control.validation);

      formControls[index] = control as OptionControl;
    }

    this.setState((prevState: CreateState) => {
      return {
        ...prevState,
        formControls,
        isFormValid: validateForm(formControls),
      };
    });
  };

  renderControls = (start: number, finish: number) => {
    return this.state.formControls.map((control, index) => {
      return (
        <Input
          key={control.name + index}
          type={control.type}
          label={control.label}
          value={control.value}
          name={control.name}
          onChange={event => this.changeHandler(event, control.name)}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
        />
      );
    }).slice(start, finish);
  };

  selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      rightAnswerId: Number(event.target.value),
    });
  };

  render() {
    return (
      <div className="quiz-creator">
        <div className="quiz-creator__container">
          <h1 className="quiz-creator__title">Create Quiz</h1>
          <form className="quiz-creator__form">
            {this.renderControls(0, 1)}
            <hr />
            {this.renderControls(1, Infinity)}
            <Select
              label="Choose right answer"
              value={this.state.rightAnswerId}
              onChange={this.selectChangeHandler}
              options={[
                { text: '1', value: '1' },
                { text: '2', value: '2' },
                { text: '3', value: '3' },
                { text: '4', value: '4' },
              ]}
            />
            <Button
              disabled={!this.state.isFormValid}
              buttonType="primary"
              onClick={this.addQuestionHandler}
            >
              Add question
            </Button>
            <Button
              disabled={!this.state.quiz.length}
              buttonType="success"
              onClick={this.createQuizHandler}
            >
              Create test
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
