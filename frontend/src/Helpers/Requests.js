class Requests {

  constructor(API_URL) {
    this.API_URL = API_URL;
  }

  verifyRequest(resp) {
    if(resp.status !== 200) {
      throw new Error('Invalid response');
    }
    return resp;
  }

  getProductInfo(sku) {
    return fetch(`${this.API_URL}/product/${sku}`)
    .then(this.verifyRequest)
    .then(resp => resp.json());
  }

  createOrder(sku, customer, token) {
    return fetch(`${this.API_URL}/order`, 
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          sku: sku,
          customer: customer,
          token: token
        })
      }
    ).then(this.verifyRequest);
  }

}

export default new Requests('https://7dmxohkcea.execute-api.us-east-1.amazonaws.com/prod');