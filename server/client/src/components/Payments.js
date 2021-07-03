import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

class Payments extends Component {
    render(){
        return (
            <StripeCheckout
                name="Uproar"
                description="$5 for 5 email credit."
                amount={500} //in cents
                token={token => this.props.handleToken(token)} //going to be received back from Stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    +5 Credits
                </button>
            </StripeCheckout>
        )
    }
}


export default connect(null,actions)(Payments);
