import React from 'react';
import { connect } from 'react-redux';
import formFields from './formFields';
import _ from 'lodash';
import * as actions from '../../actions/index'
import { withRouter } from 'react-router';

const SurveyReview = ({ onCancel, formValues, submitSurvey, history }) => {
    const reviewFields = _.map(formFields, ({name, label}) => {
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        );
    });
    
    return (
        <div>
            <h4>
                Survey Review
            </h4>
            <h5>Please confirm your entries</h5>
            {reviewFields}
            <button className="btn yellow darken-2 left white-text" onClick={onCancel}>
                Edit <i className="material-icons right">edit</i>
            </button>
            <button className="btn green right white-text" onClick={() => submitSurvey(formValues, history)}>
                Send Survey <i className="material-icons right">send</i>
            </button>
        </div>

    );
};

function mapStateToProps(state){
    return{formValues: state.form.surveyForm.values};
}


export default connect(mapStateToProps, actions)(withRouter(SurveyReview));