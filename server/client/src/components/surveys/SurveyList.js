import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { fetchSurveys } from '../../actions';

class SurveyList extends Component {
    componentDidMount(){
        this.props.fetchSurveys();
    }
    
    renderSurveys(){
        return this.props.surveys.reverse().map(survey => {
            return (
                <div className="card blue-grey darken-1" key={survey._id}>
                    <div className="card-content white-text">
                        <span className="card-title">{survey.title}</span>
                        <p>{survey.body}</p>
                        <p className="right">
                            Sent on: {new Date(survey.dateSent).toLocaleDateString()}
                        </p>
                    </div>
                    <div className="card-action">
                        <div className="green darken-2 left white-text" style={{padding:"1px 10px"}}>
                            <i className="material-icons left">check</i>Yes: {survey.yes}
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
                <h3>Survey List</h3>
                {this.renderSurveys()}
          </div>
        );
    }
}


function mapStateToProps({ surveys }){
    return { surveys };
}

export default connect(mapStateToProps, { fetchSurveys })(SurveyList);