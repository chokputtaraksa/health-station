var fs = require('fs');
    http = require('http');
    https = require('https');
    express = require('express');
    // bcrypt = require('bcrypt');
    // autorun = require('./autorun');
    app = express();
    bodyParser = require('body-parser');
    simpleOauthModule = require('simple-oauth2');
    request = require('request');
    mylib = require('./controllers/mylib');

    // oauth2Info = require('./controllers/oauth2');
var privateKey  = fs.readFileSync('SSL/client-key.pem', 'utf8');
    certificate = fs.readFileSync('SSL/client-cert.pem', 'utf8');
    credentials = {key: privateKey, cert: certificate};

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
const oauth2 = simpleOauthModule.create({
  client: {
    id: '227ZYG',
    secret: '8df3c4865e35901f964c090f99213bcf',
  },
  auth: {
    tokenHost: 'https://api.fitbit.com',
    tokenPath: '/oauth2/token',
    authorizePath: '/oauth2/authorize',
  },
});
// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/callback',
  scope: 'activity heartrate location nutrition profile settings sleep social weight',
  state: '6145605',
});
// Initial page redirecting to Github
app.get('/auth', (req, res) => {
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
app.get('/callback', (req, res) => {
  const code = req.query.code;
  const options = {
    code: code,
    redirect_uri: 'http://localhost:3000/callback'
  };
  // console.log(options);
  oauth2.authorizationCode.getToken(options, (error, result) => {
    if (error) {
      console.error('Access Token Error', error.context);
      return res.json(error.message);
    }
    // console.log("said something");
    //  console.log('The resulting token: ', result);
    var token = oauth2.accessToken.create(result);
    var uid = 1111; // will create user management soon
    token.token.uid = uid;
    console.log(token);
  });
});

app.get('/', function(req, res) {
  res.json({ message: 'Welcome to Telecare Repository' });
});

var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(3000, ()=>{
  console.log("Start server on port : 3000");
});
httpsServer.listen(3001);
