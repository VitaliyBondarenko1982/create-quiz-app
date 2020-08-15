import React, {
  ChangeEvent,
  FormEvent,
  useState,
  FC,
} from 'react';
import { connect } from 'react-redux';
import { createControl, validate, validateForm } from '../../form/formFramework';
import { Button } from '../../components/UI/Button';
import {
  Question,
  ControlsArr,
  OptionControl,
  AppState,
} from '../../utils/interfaces';
import {
  createQuizQuestion as createQuizQuestionAction,
  finishCreateQuiz as finishCreateQuizAction,
} from '../../store/actions/createAction';
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

interface StateProps {
  quiz: Question[];
}

interface DispatchProps {
  createQuizQuestion: (question: Question) => void;
  finishCreateQuiz: () => void;
}

type Props = StateProps & DispatchProps;

const QuizCreatorTemplate: FC<Props> = ({
  quiz,
  createQuizQuestion,
  finishCreateQuiz,
}) => {
  const [isFormValid, setIsFormValid] = useState(false);
  const [rightAnswerId, setRightAnswerId] = useState(1);
  const [formControls, setFormControls] = useState(createFormControls());

  const addQuestionHandler = (event: FormEvent) => {
    event.preventDefault();
    const questionItem: Question = {
      question: formControls[0].value,
      id: quiz.length + 1,
      result: '',
      rightAnswerId,
      answers: [
        { text: formControls[1].value, id: formControls[1].id },
        { text: formControls[2].value, id: formControls[2].id },
        { text: formControls[3].value, id: formControls[3].id },
        { text: formControls[4].value, id: formControls[4].id },
      ],
    };

    createQuizQuestion(questionItem);
    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());
  };

  const createQuizHandler = (event: FormEvent) => {
    event.preventDefault();

    setIsFormValid(false);
    setRightAnswerId(1);
    setFormControls(createFormControls());
    finishCreateQuiz();
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>, controlName: string) => {
    const { value } = event.target;
    const formControlsCopy = [...formControls];

    const currentControl = (): ControlsArr => {
      let control;
      let index;

      for (let i = 0; i < formControlsCopy.length; i += 1) {
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

      formControlsCopy[index] = control as OptionControl;
    }

    setFormControls(formControlsCopy);
    setIsFormValid(validateForm(formControls));
  };

  const renderControls = (start: number, finish: number) => {
    return formControls.map((control, index) => {
      return (
        <Input
          key={control.name + index}
          type={control.type}
          label={control.label}
          value={control.value}
          name={control.name}
          onChange={(event) => changeHandler(event, control.name)}
          valid={control.valid}
          touched={control.touched}
          shouldValidate={!!control.validation}
        />
      );
    }).slice(start, finish);
  };

  const selectChangeHandler = (event: ChangeEvent<HTMLSelectElement>) => {
    setRightAnswerId(Number(event.target.value));
  };

  return (
    <div className="quiz-creator">
      <div className="quiz-creator__container">
        <h1 className="quiz-creator__title">Create Quiz</h1>
        <form className="quiz-creator__form">
          {renderControls(0, 1)}
          <hr />
          {renderControls(1, Infinity)}
          <Select
            label="Choose right answer"
            value={rightAnswerId}
            onChange={selectChangeHandler}
            options={[
              { text: '1', value: '1' },
              { text: '2', value: '2' },
              { text: '3', value: '3' },
              { text: '4', value: '4' },
            ]}
          />
          <Button
            disabled={!isFormValid}
            buttonType="primary"
            onClick={addQuestionHandler}
          >
            Add question
          </Button>
          <Button
            disabled={!quiz.length}
            buttonType="success"
            onClick={createQuizHandler}
          >
            Create test
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  quiz: state.create.quiz,
});

const mapDispatchToProps = {
  createQuizQuestion: createQuizQuestionAction,
  finishCreateQuiz: finishCreateQuizAction,
};

export const QuizCreator = connect(
  mapStateToProps, mapDispatchToProps,
)(QuizCreatorTemplate);
