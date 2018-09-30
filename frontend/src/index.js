import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import App from './App';
import {StripeProvider} from 'react-stripe-elements';

const WrappedApp = () => {
  return (
    <StripeProvider apiKey="pk_test_8nU7nSXRbaoM44NTvIalL0Iu">
      <App />
    </StripeProvider>
  );
};


ReactDOM.render(<WrappedApp />, document.getElementById('root'));
