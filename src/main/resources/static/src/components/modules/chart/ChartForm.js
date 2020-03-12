import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import { withRouter } from 'react-router-dom';

import Card from '../../layout/card/Card';
import ErrroFormMessage from '../error/ErrorFormMessage';

import './ChartForm.scss';

function ChartForm(props) {
  const {
    register,
    handleSubmit,
    errors,
    formState: { isSubmitting }
  } = useForm();

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <Card>
      <form className="user-form" onSubmit={handleSubmit(onSubmit)}>
        <h3>Enter your activity</h3>
        <label htmlFor="activity-input">Activity name</label>
        <input
          id="activity-input"
          name="activity"
          placeholder="Activity"
          type="text"
          style={errors.activity && { borderColor: 'red' }}
          ref={register({ required: true })}
        />
        <ErrroFormMessage error={errors.activity} />
        <label htmlFor="date-from-input">from</label>
        <input id="date-from-input" name="dateFrom" type="datetime-local" ref={register({ required: true })} />
        <ErrroFormMessage error={errors.dateFrom} />
        <label htmlFor="date-to-input">to</label>
        <input id="date-to-input" name="dateTo" type="datetime-local" ref={register({ required: true })} />
        <ErrroFormMessage error={errors.dateTo} />
        <input className="submit-button" disabled={isSubmitting} type="submit" />
      </form>
    </Card>
  );
}

export default withRouter(ChartForm);
