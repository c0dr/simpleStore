import React, { Component } from 'react';
import PaymentButton from './PaymentButton';
import { Container, Row, Col } from 'reactstrap';
import Requests from '../Helpers/Requests';
class Product extends Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.createOrder = this.createOrder.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  async componentDidMount() {
    try {
      let productInfo = await Requests.getProductInfo(this.props.sku);
      this.setState({ productInfo: productInfo });    
    } catch(err) {
      //TODO: Add better error handling
      console.log(err);
    }
  }


  async createOrder(customer, token) {
    try {
      let orderID = await Requests.createOrder(this.props.sku, customer, token);
      this.props.router.history.push('/success');
      return true;
    } catch(err) {
      //TODO: Add better error handling
      console.log(err);
      return false;
    }
  }

  render() {
    if (this.state.productInfo) {
      return (
        <Container>
          <Row>
            <Col>
              <img src={this.state.productInfo.sku.image} />
            </Col>
            <Col>
              <h2>{this.state.productInfo.product.name} - {this.state.productInfo.sku.attributes.size} </h2>
              <PaymentButton createOrder={this.createOrder} price={this.state.productInfo.sku.price} productName={this.state.productInfo.product.name} />
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <div>Loading..</div>
      )
    }
  }
}

export default Product;
