import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys();
        this.render();
    }
    
    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title"><span style={{color:"rgb(200,200,200)",fontSize:"15px"}}>Title: </span>{survey.title}</span>
                        <p><span style={{color:"rgb(200,200,200)",fontSize:"15px"}}>Subject: </span>{survey.subject}</p>
                        <p><span style={{color:"rgb(200,200,200)",fontSize:"15px"}}>Body: </span>{survey.body}</p>
                        <p><span style={{color:"rgb(200,200,200)",fontSize:"15px"}}># Recipients: </span>{(survey.recipients) ? survey.recipients.length : "?"}</p>
                        <p className="left">
                        <span style={{color:"rgb(200,200,200)",fontSize:"15px"}}>Sent on: </span>{new Date(survey.dateSent).toLocaleDateString() + " " + new Date(survey.dateSent).toLocaleTimeString()}
                        </p>
                        <p className="right">
                        <span style={{color:"rgb(200,200,200)",fontSize:"15px"}}>Last response on: </span>{(survey.lastResponded) ? new Date(survey.lastResponded).toLocaleDateString() + " " + new Date(survey.lastResponded).toLocaleTimeString(): "N/A"}
                        </p>
                    </div>
                    <div className="card-action">
                        <div className="green darken-2 left white-text" style={{padding:"1px 10px"}}>
                            <i className="material-icons left">check</i>Yes: {survey.yes}
                        </div>
                        <div className="yellow darken-5 left black-text" style={{padding:"1px 10px"}}>
                            <i className="material-icons left">timelapse</i>No response: {(survey.recipients) ? survey.recipients.length - survey.no - survey.yes : "?"}
                        </div>
                        <div className="red darken-2 left white-text" style={{padding:"1px 10px"}}>
                            <i className="material-icons left">close</i>No: {survey.no}
                        </div>
                        <p></p>
                    </div>
                </div>
            );
        });
    }



    render() {
        return (
            <div>
                <h4>Your Survey List</h4>
                {this.renderSurveys()}
            </div>
        );
    }
}


function mapStateToProps({ surveys }){
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);