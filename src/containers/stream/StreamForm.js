import React from 'react';
import { Field, reduxForm } from 'redux-form';

class StreamForm extends React.Component {
    renderError = ({ visited, active, error, submitFailed }) => {
        if (((visited && !active) || submitFailed) && error) {
            const errorMessage = error;
            return <li>{errorMessage}</li>;
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field 
        ${(meta.visited && meta.error && !meta.active) || meta.submitFailed
                ? 'error' : ''}`
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete='off' />
                {this.renderError(meta)}
            </div>
        )
    }

    onSubmit = (formData) => {
        this.props.onSubmit(formData)
    }

    render() {
        return (
            <form
                onSubmit={this.props.handleSubmit(this.onSubmit)}
                className='ui form error'
            >
                <Field name='title' component={this.renderInput} label='Enter Title' />
                <Field name='description' component={this.renderInput} label='Enter Description' />
                <button type='submit' className='ui button primary'>Submit</button>
            </form>
        )
    }
}

const validate = formData => {
    const errors = {}

    if (!formData.title) {
        errors.title = 'You must enter a title'
    }
    if (!formData.description) {
        errors.description = 'You must enter a description'
    }
    return errors
}

export default reduxForm({
    form: 'StreamForm',
    validate
})(StreamForm);
