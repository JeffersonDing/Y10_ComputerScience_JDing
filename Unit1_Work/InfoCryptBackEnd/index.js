const request = require('request-promise');
const express = require('express')
const pretty = require('express-prettify');
const yub = require('yub')
const u2f = require('./custom_modules/u2f');
const session = require('express-session');
const bodyParser = require('body-parser');
const https = require("https");
const cors = require('cors');


yub.init(60017, '********************');

const app = express()
app.use(pretty({ query: 'pretty' }));
app.use(session({
  secret: 'https://infocrypt.jeffersonding.com',
  resave: true,
  saveUninitialized: true,
}
))
app.use(express.static('build'))
app.use(bodyParser.json())
app.use(cors({
  credentials: true,
  origin: 'https://infocrypt.jeffersonding.com'
}));

const port = 5000


const apiKey = '*********************'


app.get('/', (req, res) => {

})

app.get('/allCrypto', (req, res) => {
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'start': '1',
      'limit': '5',
      'convert': 'CAD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
  };
  request(requestOptions).then(response => {
    res.json(response)
  })
})

app.get('/latest',(req,res)=>{
  console.log("Requested!")
  const requestOptions = {
    method: 'GET',
    uri: ' https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
    qs: {
      'limit':25,
      'convert':'CAD'
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
  };
  request(requestOptions).then(response => {
    res.json(response)
  })
})

app.get('/meta',(req,res)=>{
  const requestOptions = {
    method: 'GET',
    uri: ' https://pro-api.coinmarketcap.com/v1/cryptocurrency/info',
    qs: {
      'symbol':req.query.q,
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
  };
  request(requestOptions).then(response => {
    res.json(response)
  })
})
app.get('/otp', (req, res) => {
  if (req.query.usr != "jefferson.ding") {
    res.status(401).json({ valid: false, identity: "unknown" })
  } else {
    yub.verify(req.query.p, (error, data) => {
      if (data) {
        if (data.identity = "cccccckkuigt" && data.valid == true) {
          req.session.auth = true;
          res.status(200).json({ valid: true, identity: "cccccckkuigt" })
        } else {
          res.status(401).json({ valid: false, identity: "cccccckkuigt" })
        }
      } else {
        res.error(error)
      }
    })
  }
})

app.get('/register', (req, res) => {
  registrationChallengeHandler(req, res);
})

app.post('/verify', (req, res) => {
  registrationVerificationHandler(req, res);
})

app.get('/authchall', (req, res) => {
  authenticationChallengeHandler(req, res);
})

app.post('/authverify', (req, res) => {
  authenticationVerificationHandler(req, res);
})
const APP_ID = "https://infocrypt.jeffersonding.com"

function registrationChallengeHandler(req, res) {
  const registrationRequest = u2f.request(APP_ID);
  req.session.registrationRequest = registrationRequest;
  req.session.save();
  return res.send(registrationRequest);
}


function registrationVerificationHandler(req, res) {
  console.log(req.session.registrationRequest)
  const result = u2f.checkRegistration(req.session.registrationRequest, req.body);

  if (result.successful) {
    console.log(result)
    return res.send({ result });
  }
  return res.send({ result })
}

function authenticationChallengeHandler(req, res) {
  const keyHandle = "******************************************************"
  const authRequest = u2f.request(APP_ID, keyHandle);
  req.session.authRequest = authRequest;
  return res.send(authRequest);
}

function authenticationVerificationHandler(req, res) {
  const publicKey = "*******************************************************"

  const result = u2f.checkSignature(req.session.authRequest, req.body, publicKey);

  if (result.successful) {
    req.session.auth = true;
    return res.status(200).json({ valid: true, identity: "cccccckkuigt" })
  }

  return res.status(401).send({ valid: false, identity: "cccccckkuigt" })
}

app.listen(5000)