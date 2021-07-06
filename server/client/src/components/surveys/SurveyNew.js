import React from 'react';
import SurveyForm from './SurveyForm';

const SurveyNew = () => {
    return (
        <div style={{textAlign: 'center'}}>
            <h1>
                New Survey
            </h1>
            Make new surveys!
            <SurveyForm/>
        </div>
    )
}

export default SurveyNew;