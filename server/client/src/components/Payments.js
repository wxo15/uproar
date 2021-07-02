import React, { Component } from 'react';
import StripeCheckout from 'react-stripe-checkout';

class Payments extends Component {
    render(){
        return (
            <StripeCheckout
                name="Uproar"
                description="$5 for 5 email credit."
                amount={500} //in cents
                token={token => console.log(token)} //going to be received back from Stripe
                stripeKey={process.env.REACT_APP_STRIPE_KEY}
            >
                <button className="btn">
                    +5 Credits
                </button>
            </StripeCheckout>
        )
    }
}


export default Payments;
