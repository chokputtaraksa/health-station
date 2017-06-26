var Router = require('express');
var myMongo = require('../controllers/mongo');
var mylib = require('../controllers/mylib')


const router = express.Router();
// ===============================================hexoskin=========================================================
// ====================================Can change when build user authen===========================================
const oauth2 = simpleOauthModule.create({
  client: {
    id: '6TKpT1Ko1eyAGjocTFQZWW71xN5MNB',
    secret: 'W5DYZiC7OqzJOo9KU7kolQGdop0JzK',
  },
  auth: {
    tokenHost: 'https://api.hexoskin.com',
    tokenPath: '/api/connect/oauth2/token/',
    authorizePath: '/api/connect/oauth2/auth/',
  },
});
// Authorization uri definition
const authorizationUri = oauth2.authorizationCode.authorizeURL({
  redirect_uri: 'https://localhost:3001/api/token/callbackhs',
  scope: 'readwrite',
  state: JSON.stringify({"uid": 1111, "did": 1111, "type": "hexoskin", "client_id": "6TKpT1Ko1eyAGjocTFQZWW71xN5MNB", "secret_id":"W5DYZiC7OqzJOo9KU7kolQGdop0JzK"}),
});

// Initial page redirecting to Github
router.get('/authhs', (req, res) => {
  // console.log(authorizationUri);
  res.redirect(authorizationUri);
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callbackhs', (req, res) => {
  
  const code = req.query.code;  // get req code
  const state = JSON.parse(req.query.state);
  const options = { // prepare token for request access token
    code: code,
    redirect_uri: "https://localhost:3001/api/token/callbackhs"
  };
  oauth2.authorizationCode.getToken(options, (error, result) => { // get token
    if (error) {
      console.error('Access Token Error', error.message); 
      return res.json(error.message);
    }
    var date = new Date();
    date.setSeconds(date.getSeconds()+result.expires_in); // create expire_at
    myMongo.updateDocument("token",
        {
            uid:state.uid, 
            did:state.did, 
            type:state.type
        }, 
        {
            $set:{
                access_token : result.access_token,
                refresh_token : result.refresh_token,
                expires_at : date.toISOString(),
                client_id: state.client_id,
                secret_id: state.secret_id,
                redirect_uri : options.redirect_uri
            },
        },
        function(err, respond){
            if(err){
                res.send({error:"Update error"});
            }
            res.send({err:false, message:"Update complete"});
        }
    );
  });
});

// ===============================================fitbit====================================================

const oauth2FB = simpleOauthModule.create({
  client: {
    id: '227ZYG',
    secret: '8df3c4865e35901f964c090f99213bcf',
  },
  auth: {
    tokenHost: 'https://api.fitbit.com/',
    tokenPath: 'oauth2/token',
    authorizePath: 'oauth2/authorize',
  },
});
// Authorization uri definition
const authorizationUriFB = oauth2FB.authorizationCode.authorizeURL({
  redirect_uri: 'http://localhost:3000/api/token/callbackfb',
  scope: 'activity heartrate location nutrition profile settings sleep social weight',
  state: JSON.stringify({"uid": 1111, "did": 1111, "type": "fitbit", "client_id": "227ZYG", "secret_id":"8df3c4865e35901f964c090f99213bcf"}),
});

// Initial page redirecting to Github
router.get('/authfb', (req, res) => {
  // console.log(authorizationUri);
  res.redirect(authorizationUriFB);
});

// Callback service parsing the authorization token and asking for the access token
router.get('/callbackfb', (req, res) => {
  
  const code = req.query.code;  // get req code
  const state = JSON.parse(req.query.state);
  // console.log(code);
  // console.log(state);
  const options = { // prepare token for request access token
    code: code,
    redirect_uri: "http://localhost:3000/api/token/callbackfb"
  };
  console.log(options);
  oauth2FB.authorizationCode.getToken(options, (error, result) => { // get token
    if (error) {
      console.error('Access Token Error', error.message); 
      return res.json(error.message);
    }
    // res.send(result);
    var date = new Date();
    date.setSeconds(date.getSeconds()+result.expires_in); // create expire_at
    myMongo.updateDocument("token",
        {
            uid:state.uid, 
            did:state.did, 
            type:state.type
        }, 
        {
            $set:{
                access_token : result.access_token,
                refresh_token : result.refresh_token,
                expires_at : date.toISOString(),
                client_id: state.client_id,
                secret_id: state.secret_id,
                redirect_uri : options.redirect_uri
            },
        },
        function(err, respond){
            if(err){
                res.send({error:"Update error"});
            }
            res.send({err:false, message:"Update complete"});
        }
    );
  });
});


module.exports = router;
