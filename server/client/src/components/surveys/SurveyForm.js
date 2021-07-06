import React,{ Component } from 'react';
import { reduxForm, Field, updateSyncErrors } from 'redux-form'; //connect to redux store
import SurveyField from './SurveyField';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import validateEmails from '../../utils/validateEmails';

const FIELDS = [
    { label:'Survey Title', name:'title', type:'text' },
    { label:'Subject Line', name:'subject', type:'text' },
    { label:'Email Body', name:'body', type:'text' },
    { label:'Recipient List', name:'emails', type:'text' }
]


class SurveyForm extends Component {
    renderFields(){
        return _.map(FIELDS, ({label, name, type}) => {
            return (
                <Field key={name} label={label} type={type} name={name} component={SurveyField}/>
            );
        });
    }
    
    
    
    render(){
        return (
            <div style={{textAlign: 'center'}}>
                <h3>
                    New Survey Form
                </h3>
                <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
                    {this.renderFields()}
                    <Link to="/surveys" className="red btn left white-text">
                        Cancel
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
    errors.emails = validateEmails(values.emails || '');
    
    _.each(FIELDS, ({ name, label }) =>{
        if (!values[name]) {
            errors[name] = '"' +label + '" must be provided.'
        }
    })
    


    return errors
}


export default reduxForm({
    validate: validate,
    form: 'surveyForm'
})(SurveyForm);