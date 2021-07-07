import React, { Component } from 'react';
import SurveyForm from './SurveyForm';
import SurveyReview from './SurveyFormReview';
import { reduxForm } from 'redux-form';


class SurveyNew extends Component {
    state = {showReview: false }; // constructor
    
    renderContent() {
        if (this.state.showReview) {
            return <SurveyReview onCancel={() => this.setState({showReview: false})}/>;
        } else {
            return <SurveyForm onSurveySubmit={() => this.setState({showReview: true})} />;
        }
    }
    
    render() {
        return (
            <div style={{textAlign: 'center'}}>
                {this.renderContent()}
            </div>
        );
    }
};

export default reduxForm({
    form: 'surveyForm'} //do not persist value when get out of SurveyNew
)(SurveyNew);