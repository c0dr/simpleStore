import React from 'react';
import {PaymentRequestButtonElement} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import { Collapse, Button, CardBody, Card } from 'reactstrap';
import CardSection from './CardSection';

class PaymentButton extends React.Component {

  constructor(props) {
    super(props);

    const paymentRequest = props.stripe.paymentRequest({
      country: 'US',
      currency: 'usd',
      total: {
        label: this.props.productName,
        amount: this.props.price,
      },
      requestShipping: true,
      requestPayerName: true,
      requestPayerEmail: true,
      shippingOptions: [
        {
          id: 'free-shipping',
          label: 'Free shipping',
          detail: 'Arrives in 5 to 7 days',
          amount: 0,
        },
      ],
    
    });

    paymentRequest.on('token', async ({complete, token, ...data}) => {
      let customer =  {
        name: data.shippingAddress.recipient,
        address_line1: data.shippingAddress.addressLine[0],
        address_city: data.shippingAddress.city,
        address_zip: data.shippingAddress.postalCode,
        email: data.payerEmail,
      }  
      let success = await this.props.createOrder(customer, token);
      complete(success ? 'success': 'fail');
    });

    paymentRequest.canMakePayment().then((result) => {
      this.setState({canMakePayment: !!result});
    });

    this.state = {
      canMakePayment: false,
      paymentRequest,
      collapse: false,
    };
    this.showPayment = this.showPayment.bind(this);
  }

  showPayment() {
    if(this.state.canMakePayment) {
      this.state.paymentRequest.show();
    } else {
      this.setState({collapse: true})
    }
  }

  render() {
    return (
      <div>
    <Button  style={!this.state.collapse ? {} : { display: 'none' }}           onClick={this.showPayment} color="primary">Buy now for ${this.props.price / 100}</Button>
    <Collapse isOpen={this.state.collapse}>
      <CardSection handlePayment={this.props.createOrder} className="cardSection"/>
    </Collapse>
  </div>
    )
  }
}

export default injectStripe(PaymentButton);