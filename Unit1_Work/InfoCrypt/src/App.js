import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import './scss/style.scss';

const loading = (
  <div className="pt-3 text-center">
    <div className="sk-spinner sk-spinner-pulse"></div>
  </div>
)

// Containers
const TheLayout = React.lazy(() => import('./containers/TheLayout'));

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'));
const Register = React.lazy(() => import('./views/pages/register/Register'));
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'));
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'));
class App extends Component {
  state = {
    ETH: 0,
    BTC: 0,
    XRP: 0,
    BCH: 0,
    all:{
      "id": 0,
      "name": "",
      "symbol": "",
      "slug": "",
      "num_market_pairs": 0,
      "date_added": "",
      "tags": [
        "",
      ],
      "max_supply": 0,
      "circulating_supply": 0,
      "total_supply": 0,
      "platform": null,
      "cmc_rank": 0,
      "last_updated": "0",
      "quote": {
        "CAD": {
          "price": 0,
          "volume_24h": 0,
          "percent_change_1h": 0,
          "percent_change_24h": 0,
          "percent_change_7d": 0,
          "market_cap": 0,
          "last_updated": ""
        }
      }
    },
  }
  componentDidMount(){
    fetch("https://localhost:5000/latest")
      .then(resp => {
        return resp.json()
      }).then(json => {
        var BTC = json.data[0]
        var ETH = json.data[1]
        var BCH = json.data[5]
        var XRP = json.data[3]

        var price = BTC.quote.CAD.price.toString().split(".")
        var PriceBTC = price[0] + "." + price[1].substring(0, 2)

        price = ETH.quote.CAD.price.toString().split(".")
        var PriceETH = price[0] + "." + price[1].substring(0, 2)

        price = BCH.quote.CAD.price.toString().split(".")
        var PriceBCH = price[0] + "." + price[1].substring(0, 2)

        price = XRP.quote.CAD.price.toString().split(".")
        var PriceXRP = price[0] + "." + price[1].substring(0, 2)

        this.setState({
          ETH: PriceETH,
          BTC: PriceBTC,
          XRP: PriceXRP,
          BCH: PriceBCH,
          all:json.data
        })
      })
    }
  render() {
    return (
      <HashRouter>
        <React.Suspense fallback={loading}>
          <Switch>
            <Route exact path="/login" name="Login Page" render={() => <Login price={this.state} />} />
            <Route exact path="/register" name="Register Page" render={() => <Register price={this.state} />} />
            <Route exact path="/404" name="Page 404" render={() => <Page404 price={this.state} />} />
            <Route exact path="/500" name="Page 500" render={() => <Page500 price={this.state} />} />
            <Route path="/" name="Dashboard" render={() => <TheLayout price={this.state} />} />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
