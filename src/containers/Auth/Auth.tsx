import React, { Component, FormEvent, ChangeEvent } from 'react';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import { ControlsArr, AuthState } from '../../utils/interfaces';
import axios from 'axios';
import './_Auth.scss';

function validateEmail(email: string) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
}

export class Auth extends Component {
  state = {
    isFormValid: false,
    formControls: [
      // {
      //   value: '',
      //   type: 'text',
      //   name: 'nickname',
      //   label: 'Nickname',
      //   errorMessage: 'Enter correct nickname',
      //   valid: false,
      //   touched: false,
      //   validation: {
      //     required: true,
      //     minLength: 6,
      //   },
      // },
      {
        value: '',
        type: 'email',
        label: 'Email',
        name: 'email',
        errorMessage: 'Enter correct email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true,
        },
      },
      {
        value: '',
        type: 'password',
        label: 'Password',
        name: 'password',
        errorMessage: 'Enter valid password',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6,
        },
      },
    ],
  };

  loginHandler = async (event: FormEvent) => {
    event.preventDefault();

    const authData = {
      email: this.state.formControls[0].value,
      password: this.state.formControls[1].value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCZ13ZcvnKFi14thxo55kh61gl0jvIVQaw',
        authData,
      );

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  registerHandler = async (event: FormEvent) => {
    event.preventDefault();

    const authData = {
      email: this.state.formControls[0].value,
      password: this.state.formControls[1].value,
      returnSecureToken: true,
    };

    try {
      const response = await axios.post(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCZ13ZcvnKFi14thxo55kh61gl0jvIVQaw',
        authData,
      );

      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  onChangeHandler = (event: ChangeEvent<HTMLInputElement>, controlName: string) => {
    const { value } = event.target;
    const formControls = [...this.state.formControls];

    const controlsArr = (): ControlsArr => {
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

    const { control, index } = controlsArr();

    if (control && index !== undefined) {
      control.value = value;
      control.touched = true;
      control.valid = this.validateControl(control.value, control.validation);

      // @ts-ignore
      formControls[index] = control;
    }

    let isFormValid = true;

    formControls.forEach(controlItem => {
      isFormValid = controlItem.valid && isFormValid;
    });

    this.setState((prevState: AuthState) => {
      return {
        ...prevState,
        formControls,
        isFormValid,
      };
    });
  };

  validateControl = (value: any, validation: any): boolean => {
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

  renderInputs() {
    return this.state.formControls
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
            onChange={event => this.onChangeHandler(event, control.name)}
          />
        );
      });
  }

  render() {
    return (
      <div className="auth">
        <div className="auth__container">
          <h1 className="auth__title">Auth</h1>
          <form
            className="auth__form"
            onSubmit={this.submitHandler}
          >
            {this.renderInputs()}
            <Button
              disabled={!this.state.isFormValid}
              buttonType="success"
              onClick={this.loginHandler}
            >
              Sign in
            </Button>
            <Button
              disabled={!this.state.isFormValid}
              buttonType="primary"
              onClick={this.registerHandler}
            >
              Sign up
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
