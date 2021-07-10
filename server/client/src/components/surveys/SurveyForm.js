import React,{ Component } from 'react';
import { reduxForm, Field } from 'redux-form'; //connect to redux store
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';
import formFields from './formFields';


class SurveyForm extends Component {
    renderFields(){
        return _.map(formFields, ({label, name, type}) => {
            return (
                <Field key={name} label={label} type={type} name={name} component={SurveyField}/>
            );
        });
    }
    
    
    
    render(){
        return (
            <div style={{textAlign: 'center'}}>
                <h4>
                    New Survey Form
                </h4>
                <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn left white-text">
                        Cancel <i className="material-icons right">undo</i>
                    </Link>
                    <button type="submit" className="btn right white-text">
                        Review <i className="material-icons right">visibility</i>
                    </button>
                </form>
            </div>
        );
    }
}

function validate(values){
    const errors = {};

    // Send values to Survey Field meta property
    errors.recipients = validateEmails(values.recipients || '');
    
    _.each(formFields, ({ name, label }) =>{
        if (!values[name]) {
            errors[name] = '"' +label + '" must be provided.'
        }
    })
    


    return errors
}


export default reduxForm({
    validate: validate,
    form: 'surveyForm', // define object in redux state
    destroyOnUnmount: false // to persist values for review and back
})(SurveyForm);