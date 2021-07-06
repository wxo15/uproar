//contains logic to render a single label and text input
import React from 'react';

export default ({input, label, meta: { error, touched}}) => { //looking for props.input
    //pass all event handler properties. 
    //meta.error is produced by validate function in SurveyForm
    //only produce when field has been touched. Located in meta.touched
    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{ marginBottom: '5px'}}/> 
            <div className="red-text" style={{ marginBottom: '20px'}}>
                {touched && error}
            </div>
        </div>
    );

}

