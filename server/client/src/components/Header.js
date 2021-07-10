import React,{ Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Payments from './Payments.js';
import M from "materialize-css";


class Header extends Component {
    componentDidMount() {
        //console.log("Here");
        M.AutoInit(); 
    } //Reinit dropdown right after first render

    componentDidUpdate() {
        //console.log("Here");
        M.AutoInit(); 
    } //Reinit dropdown after update


    renderDropdown(){
        var temp = [];

        if (!this.props.auth || !this.props.auth.googleID){
            temp.push(
                <li className="google_container" key="google">
                    <a href="/auth/google" style={{'textTransform': 'none'}}>
                        <img width="20px" style={{'marginBottom':'0px', 'marginRight':'10px'}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Sign In with Google
                    </a>
                </li>
            );
        } else {
            temp.push(
                <li className="google_container" key="google">
                    <a style={{'textTransform': 'none'}}>
                        <img width="20px" style={{'marginBottom':'0px', 'marginRight':'10px'}} alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
                        Linked
                    </a>
                </li>
            )
        };
        if (!this.props.auth || !this.props.auth.githubID){
            temp.push(
                <li className="github_container" key="github">
                    <a href="/auth/github" style={{'textTransform': 'none'}}>
                        <img width="20px" style={{'marginBottom':'0px', 'marginRight':'10px'}} alt="GitHub sign-in" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/GitHub_Mark.png" />
                        Sign In with GitHub
                    </a>
                </li>
            );
        } else {
            temp.push(
                <li className="github_container" key="github">
                    <a style={{'textTransform': 'none'}}>
                        <img width="20px" style={{'marginBottom':'0px', 'marginRight':'10px'}} alt="GitHub sign-in" src="https://upload.wikimedia.org/wikipedia/commons/4/4a/GitHub_Mark.png" />
                        Linked
                    </a>
                </li>
            )
        };

        return temp;
    }
    
    renderContent(){       
        switch (this.props.auth) {
            case null:
                return;
            case false:
                return <li key="dropdown1"><a className="dropdown-trigger" href="#!" id="dropdowner" data-target="dropdown1">OAuth Login<i className="material-icons right">arrow_drop_down</i></a></li>;
            default:
                return [
                    <li key="payment"><Payments /></li>,
                    <li key="credit" style={{margin: '0px 10px'}}>Credit: {this.props.auth.credits}</li>,
                    <li key="dropdown2"><a className="dropdown-trigger" href="#!" id="dropdowner2" data-target="dropdown1">Add Logins<i className="material-icons right">arrow_drop_down</i></a></li>,
                    <li key="logout"><a href="/api/logout">Logout</a></li>
                ];
        }
    }
    render() {
        //console.log(this.props);
        return (
            <div>
            <ul id="dropdown1" className="dropdown-content">
                {this.renderDropdown()}
            </ul>
            <nav>
                <div className="nav-wrapper">
                <Link to={this.props.auth ? '/surveys' : '/'} className="brand-logo">
                    <img width="50px" style={{'marginLeft':'10px','marginTop':'10px','marginBottom':'10px','verticalAlign':'middle'}} src="/logo.png" alt="logo"/>
                    proar
                </Link>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {this.renderContent()}
                </ul>
                </div>
            </nav>
            {M.AutoInit()}
            </div>
            
        );
    }
};

function mapStateToProps({ auth }){
    return { auth };
}


export default connect(mapStateToProps)(Header);