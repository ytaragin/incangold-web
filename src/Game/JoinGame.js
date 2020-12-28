import React from "react";
import {useSelector, useDispatch} from 'react-redux';
import {gameStateSelector } from '../slices/gamestate';
import { Formik, Form, Field, useField, ErrorMessage } from 'formik';


function validate(values) {
    const errors = {};
    if (!values.gameId) {
        errors.gameId = 'Game ID Required';
    }
    if (!values.name) {
        errors.name = 'Name Required'
    } else if ( values.name.length < 3 ) {
        errors.name = 'Name too short';
    }
    return errors;
}
const MyTextInput = ({ label, ...props }) => {
    // useField() returns [formik.getFieldProps(), formik.getFieldMeta()]
    // which we can spread on <input> and alse replace ErrorMessage entirely.
    const [field, meta] = useField(props);
    return (
      <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <input className="text-input" {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </>
    );
  };

export default function JoinGame({match}) {
    const gameState = useSelector(gameStateSelector).game.state;
    const dispatch = useDispatch();

    let id = match.params.gameId ? match.params.gameId : '';


    return (
        <div>
            <h2>Join a game</h2>
            <Formik
            initialValues={{ gameId: id, name: '' }}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
                }, 400);
            }}
            >
            {({ isSubmitting }) => (
                <Form>
                    <MyTextInput
                        label="Game to join"
                        name="gameId"
                        type="text"
                    />
                    <MyTextInput
                        label="Your name"
                        name="name"
                        type="text"
                    />
                    <button type="submit" disabled={isSubmitting}>
                        Join
                    </button>
                </Form>
            )}
            </Formik>
        </div>
    );
}

