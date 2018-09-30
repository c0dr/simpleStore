import React from 'react';
import {CardElement} from 'react-stripe-elements';
import {injectStripe} from 'react-stripe-elements';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class CardSection extends React.Component {

  handleSubmit = async (ev) => {
    this.setState({
      processing: true,
    });
    let token = await this.createToken();
    this.props.handlePayment( 
      {
      name: this.state.fullname,
      address_line1: this.state.address_line1,
      address_city: this.state.city,
      address_zip: this.state.postalcode,
      email: this.state.email,
      }, token.token
    );
  }

  createToken() {
    return this.props.stripe.createToken(
      {
        name: this.state.fullname,
        address_line1: this.state.address_line1,
        address_city: this.state.city,
        address_zip: this.state.postalcode
      }
    );
  }

  constructor(props) {
    super(props);
    this.state = {};

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      
      <Form>
        <FormGroup>
          <Label for="name">Full Name</Label>
          <Input type="text" name="fullname" id="fullname" autoComplete="name" value={this.state.fullname} onChange={this.handleInputChange} />
        </FormGroup>
        <FormGroup>
          <Label for="address">Address Line 1</Label>
          <Input type="text" name="address_line1" id="address" autoComplete="address-line1" value={this.state.address_line1} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="postalcode">Postal Code</Label>
          <Input type="text" name="postalcode" id="postalcode" autoComplete="postal-code" value={this.state.postalcode} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="city">City</Label>
          <Input type="text" name="city" id="city" value={this.state.city} onChange={this.handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label for="card">Card Details</Label>
          <CardElement className="form-control" hidePostalCode={true} />
        </FormGroup>
        <FormGroup>
          <Label for="email">Email</Label>
          <Input type="email" name="email" id="email" autoComplete="email" value={this.state.email} onChange={this.handleInputChange} />
        </FormGroup>
        <Button disabled={this.state.processing && 'disabled'} onClick={this.handleSubmit} color="primary">{this.state.processing ? 'Processing..' : 'Order now'}</Button>
        </Form>
    );
  }
}

export default injectStripe(CardSection);
