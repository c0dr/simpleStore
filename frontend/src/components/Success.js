import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import Checkmark from '../Checkmark.svg';

class Success extends React.Component {
  render() {
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }} style={{textAlign:'center'}}>          
            <img style={{width: '25%'}} src={Checkmark}/>
            <h1>Thank you for your order!</h1>
            <p>We will send you an order confirmation shortly!</p>
          </Col>
      </Row>
    </Container>
    );
  }
}

export default Success;
