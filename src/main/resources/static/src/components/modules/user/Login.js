import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import { login } from './api/actions';
import Card from '../../layout/card/Card';
import ErrroFormMessage from '../error/ErrorFormMessage';

import './User.scss';

function Login(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = data => {
    props
      .login(data)
      .then(() => {
        const { error, isAuthenticated } = props.user;
        if (error && error.length > 0) {
          console.log(error);
        } else if (isAuthenticated) {
          props.history.push('/');
        }
      })
      .catch(e => {
        console.log(e);
      });
  };

  return (
    <Card>
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Login</h3>
        <label htmlFor="username-input">Username</label>
        <input
          id="username-input"
          name="username"
          placeholder="Username"
          type="text"
          style={errors.username && { borderColor: 'red' }}
          ref={register({ required: true })}
        />
        <ErrroFormMessage error={errors.username} />
        <label htmlFor="password-input">Password</label>
        <input
          id="password-input"
          name="password"
          placeholder="Password"
          style={errors.password && { borderColor: 'red' }}
          type="password"
          ref={register({ required: true, minLength: 6, maxLength: 20 })}
        />
        <ErrroFormMessage error={errors.password} />
        <input className="submit-button" disabled={isSubmitting} type="submit" />
      </form>
    </Card>
  );
}

function loginState(state) {
  return {
    user: state.user
  };
}

export default connect(loginState, { login })(withRouter(Login));
