const request = require('request-promise');
const express = require('express')
const pretty = require('express-prettify');
const yub = require('yub')
const u2f = require('./custom_modules/u2f');
const session = require('express-session');
const bodyParser = require('body-parser');
const https = require("https"),
fs = require("fs");

const options = {
  key: fs.readFileSync("./cert/ssl/server.key"),
  cert: fs.readFileSync("./cert/ssl/server.crt")
};

yub.init(60017,'zsxBf5qnrG+rMy2ZRpIje1/drMk=');

const app = express()
app.use(pretty({ query: 'pretty' }));
app.use(session({
  secret: 'https://infocrypt.jeffersonding.com',
  resave: true,
  saveUninitialized: true
}
))
app.use(express.static('public'))
app.use(bodyParser.json())

const port = 5000


const apiKey = '6dcdf365-574a-49e8-87ba-b1e624b48205'


app.get('/', (req,res) => {

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
  request(requestOptions).then(response=>{
    res.json(response)
  })
})

function getId(symbol,callback){
  const requestOptions = {
    method: 'GET',
    uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/map',
    qs: {
      'symbol': symbol,
    },
    headers: {
      'X-CMC_PRO_API_KEY': apiKey
    },
    json: true,
    gzip: true
  };
  request(requestOptions).then(response=>{
      callback(response);
  })
  
}

app.get('/id',(req,res)=>{
  getId("BTC",(result)=>{
    res.send(result)
  })
})

app.get('/otp',(req,res)=>{
  yub.verify(req.query.p,(error,data)=>{
    if(data){
      if(data.identity = "cccccckkuigt" && data.valid == true){
        res.status(200).json({valid:true,identity:"cccccckkuigt"})
      }else{
        res.status(401).json({valid:false,identity:"cccccckkuigt"})
      }
    }else{
      res.error(error)
    }
  })
})

app.get('/register',(req,res)=>{
  registrationChallengeHandler(req,res);
})

app.get('/authchall',(req,res)=>{
  authenticationChallengeHandler(req,res);
})

app.post('/authverify',(req,res)=>{
  authenticationVerificationHandler(req,res);
})

app.post('/verify',(req,res)=>{
  registrationVerificationHandler(req,res);
})

const APP_ID = "https://localhost:5000"

function registrationChallengeHandler(req, res) {
  const registrationRequest = u2f.request(APP_ID);
  req.session.registrationRequest = registrationRequest;
  return res.send(registrationRequest);
}


function registrationVerificationHandler(req, res) {
  const result = u2f.checkRegistration(req.session.registrationRequest, req.body);

  if (result.successful) {
    console.log(result)
    return res.sendStatus(200);
  }
 return res.send({result});
}

function authenticationChallengeHandler(req, res) {
  const keyHandle = "dhFsl8SjrS-H2yf4KB7TpT19UKefboQpT5OAdbyQ0QWPqGlfRcxOcGc4cBxnK44IbUmh0bBHYo_z_FlVM7T0kA"

  const authRequest = u2f.request(APP_ID, keyHandle);
  req.session.authRequest = authRequest;

  return res.send(authRequest);
}

function authenticationVerificationHandler(req, res) {

  const publicKey = "BP-wCxb_ZIoD4CEPFeQ-TDMiLjBqBXtuZCOehr5EQX6UOv5kWYXDBrv6tgx9F8D5coBC-I4cdWxPgS9AJmk4rVI"

  const result = u2f.checkSignature(req.session.authRequest, req.body, publicKey);

  if (result.successful) {
    return res.status(200).json({valid:true,identity:"cccccckkuigt"})
  }

  return res.statuse(401).send({valid:false,identity:"cccccckkuigt"})
}

https.createServer(options,app).listen(5000);