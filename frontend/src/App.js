import React, { Component } from 'react';
import './App.css';
import Product from './components/Product.js'
import Navigation from './components/Navigation.js'
import {Elements} from 'react-stripe-elements';
import Success from './components/Success'
import { BrowserRouter as Router, Route, Redirect, BrowserRouter } from "react-router-dom";


const ProductElm = ({ elm }) => (
  <div>
    <Product sku={`sku_ ${elm.params.id}`}/>
  </div>
);



class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
          <Elements>
            <BrowserRouter>
            <div>
              <Route exact path="/" render={() => (<Redirect to="/product/Cu0Ae8YvvyAXYi"/>)}/>
              <Route exact path="/product/:id" render={(router) => <Product router={router} sku={`sku_${router.match.params.id}`}/>}/>
              <Route exact path="/success" component={Success} />
              </div>
            </BrowserRouter>
        </Elements>
      </div>
    );
  }
}

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Product sku="sku_Cu0Ae8YvvyAXYi"/>
      </div>
    );
  }
}
*/



export default App;
//<Product sku="sku_Cu0Ae8YvvyAXYi"/>