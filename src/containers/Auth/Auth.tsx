import React, {
  FormEvent, ChangeEvent, useState, FC,
} from 'react';
import { connect } from 'react-redux';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { ControlsArr, Validation } from '../../utils/interfaces';
import { createAuthControl } from '../../form/formFramework';
import { auth as authAction } from '../../store/actions/authAction';
import './_Auth.scss';

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

function createControl(
  type: string,
  name: string,
  label: string,
  validation: Validation,
) {
  return createAuthControl({
    value: '',
    type,
    label,
    name,
    errorMessage: `Enter correct ${name}`,
    valid: false,
    touched: false,
  }, validation);
}

function createFormControls() {
  return [
    createControl(
      'email',
      'email',
      'Email',
      { required: true, email: true },
    ),
    createControl(
      'password',
      'password',
      'Password',
      { required: true, minLength: 6 },
    ),
  ];
}

interface DispatchProps {
  auth: (email: string, password: string, isLogin: boolean) => void;
}

const AuthTemplate: FC<DispatchProps> = ({
  auth,
}) => {
  const [formControls, setFormControls] = useState(createFormControls());
  const [isFormValid, setIsFormValid] = useState(false);

  const loginHandler = (event: FormEvent) => {
    event.preventDefault();
    auth(formControls[0].value, formControls[1].value, true);
  };

  const registerHandler = (event: FormEvent) => {
    event.preventDefault();

    auth(formControls[0].value, formControls[1].value, false);
  };

  const submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  const validateControl = (value: any, validation: any): boolean => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>, controlName: string) => {
    const { value } = event.target;

    const formControlsCopy = [...formControls];

    const controlsArr = (): ControlsArr => {
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

    const { control, index } = controlsArr();

    if (control && index !== undefined) {
      control.value = value;
      control.touched = true;
      control.valid = validateControl(control.value, control.validation);

      // @ts-ignore
      formControlsCopy[index] = control;
    }

    let isFormValidCurrent = true;

    formControlsCopy.forEach(controlItem => {
      isFormValidCurrent = controlItem.valid && isFormValidCurrent;
    });

    setFormControls(formControlsCopy);
    setIsFormValid(isFormValidCurrent);
  };

  const renderInputs = () => {
    return formControls
      .map((control, index) => {
        return (
          <Input
            name={control.name}
            key={control.name + index}
            type={control.type}
            value={control.value}
            valid={control.valid}
            touched={control.touched}
            label={control.label}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event => onChangeHandler(event, control.name)}
          />
        );
      });
  };

  return (
    <div className="auth">
      <div className="auth__container">
        <h1 className="auth__title">Auth</h1>
        <form
          className="auth__form"
          onSubmit={submitHandler}
        >
          {renderInputs()}
          <Button
            disabled={!isFormValid}
            buttonType="success"
            onClick={loginHandler}
          >
            Sign in
          </Button>
          <Button
            disabled={!isFormValid}
            buttonType="primary"
            onClick={registerHandler}
          >
            Sign up
          </Button>
        </form>
      </div>
    </div>
  );
};

const mapDispatchToProps = {
  auth: authAction,
};

export const Auth = connect(
  null,
  mapDispatchToProps,
)(AuthTemplate);
