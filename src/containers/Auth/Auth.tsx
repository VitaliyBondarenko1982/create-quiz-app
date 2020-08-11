import React, { Component, FormEvent } from 'react';
import { Button } from '../../components/UI/Button';
import { Input } from '../../components/UI/Input';
import './_Auth.scss';

export class Auth extends Component {
  loginHandler = () => {

  };

  registerHandler = () => {

  };

  submitHandler = (event: FormEvent) => {
    event.preventDefault();
  };

  render() {
    return (
      <div className="auth">
        <div className="auth__container">
          <h1 className="auth__title">Auth</h1>
          <form
            className="auth__form"
            onSubmit={this.submitHandler}
          >
            <Input
              type="text"
              label="Nickname"
              value=""
              errorMessage="Test"
            />
            <Input
              type="email"
              label="Email"
              value=""
              errorMessage="Test"
            />
            <Input
              type="password"
              label="Password"
              value=""
              errorMessage="Test"
            />
            <Button
              disabled={false}
              buttonType="success"
              onClick={this.loginHandler}
            >
              Sign in
            </Button>
            <Button
              disabled={false}
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
