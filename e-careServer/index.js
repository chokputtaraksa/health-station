var fs = require('fs');
    https = require('https');
    express = require('express');
    Promise = require('bluebird');
    MongoClient = require('mongodb').MongoClient;
    bodyParser = require('body-parser');
    simpleOauthModule = require('simple-oauth2');
    request = require('request');
    logger = require('morgan');
    cors = require('cors');
// Internal library    
    Device = require('./models/device');
    // autorun = require('./autorun');
    mylib = require('./controllers/mylib');
    usersRestApi = require('./routes/users');
    tokenRestApi = require('./routes/token');
    dbApi = require('./routes/db');
    myMongo = require('./controllers/mongo');

    // oauth2Info = require('./controllers/oauth2');

// global variable 
    app = express();
    http = require('http').Server(app);
    io = require('socket.io')(http);



var privateKey  = fs.readFileSync('SSL/client-key.pem', 'utf8');
    certificate = fs.readFileSync('SSL/client-cert.pem', 'utf8');
    credentials = {key: privateKey, cert: certificate};

// =======================================================================================

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(logger('dev')); // Log requests to API using morgan
app.use(cors());
// =====================================socket.io==========================================

io.on('connection', function(socket){
  console.log("user connected");
  socket.broadcast.emit('chat message', "User connect");
  socket.on('heartrate', function(msg){
    // console.log(msg);
    io.emit('heartrate', msg);
  });
  socket.on('breathrate', function(msg){
    // console.log(msg);
    io.emit('breartrate', msg);
  });
});


// ========================================================================================
// Create a MongoDB connection pool and start the application
// after the database connection is ready
myMongo.connect(function(err, database) {
  var httpsServer = https.createServer(credentials, app);
  if (err) {
    console.log(`Failed to connect to the database. ${err.stack}`);
  }else{
    http.listen(3000, function(err,res){
      console.log("Start server on port : 3000");
    });
    httpsServer.listen(3001);
  }
});

// ====================================about database======================================
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/users', usersRestApi);
app.use('/api/token', tokenRestApi);
app.use('/api/db', dbApi);

app.post("/addDevice", function(req, res){
    var json = req.body;
    var deviceObj = new Device (json.uid, json.deviceInfo);
    
    // res.send()
});

// ========================================================================================


app.use(function (err, req, res, next) {
 if (err.msg) {
    res.status(500).send({ error: err.msg });
  } else {
    res.status(500).send({ error: '500 - Internal Server Error' });
  }
});

app.get('/', function(req, res) {
  res.json({ message: 'Welcome to Telecare Repository' });
});