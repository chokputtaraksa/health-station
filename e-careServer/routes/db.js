var Router = require('express');
var myMongo = require('../controllers/mongo');
    mylib = require('../controllers/mylib');
    heartrate = require('../models/external/heartrate.js');
    breathrate = require('../models/external/breathrate.js')


const router = express.Router();


router.get('/findDocuments/:collection', function(req, res) {
  myMongo.findDocuments(req.params.collection, function(err, doc){
      res.send(doc);
  });
});

router.get('/gettoken/:uid/:type', function(req, res) {
  data = {
    uid : req.params.uid,
    type : req.params.type
  }
  // console.log(data);
  myMongo.findToken(data, function(err, doc){
      res.send(doc);
  });
});

router.post('/findDataDocuments', function(req, res) {
  var jsonContent = req.body;
  // console.log(jsonContent.from);
  // console.log( mylib.unixToUTC(mylib.toUnixTimeStamp(jsonContent.from)));
  // console.log(jsonContent);
  var options = {
    uid : jsonContent.uid,
    type : jsonContent.type,
    tool : jsonContent.tool,
    from : mylib.localToUnixTimeStamp(jsonContent.from),
    to : mylib.localToUnixTimeStamp(jsonContent.to)
  }
  // console.log(options);
  var result = {};
  var hrList = [];
  var brList = [];
  // console.log(options);
  myMongo.findDataDocuments(options, function(err, docs){
    for(index in docs){
      var data = {};
      if(docs[index].type==="BR"){
        data['respiratory_rate'] = {
          "value": docs[index].value,
          "unit": "breaths/min"
        };
        data['effective_time_frame'] = {
          "date_time": mylib.unixToUTC(docs[index].date_time)
        }
        data['user_notes'] = docs[index].tool;
        brList.push(data);
      }else if(docs[index].type==="HR"){
        data['heart_rate'] = {
          "value": docs[index].value,
          "unit": "beats/min"
        };
        data['effective_time_frame'] = {
          "date_time": mylib.unixToUTC(docs[index].date_time)
        }
        data['user_notes'] = docs[index].tool;
        hrList.push(data);
      }
    }
    // console.log(result);
    result['HR']=hrList;
    result['BR']=brList;
    // console.log(result);
    res.send(result);
  });
});

router.post('/updateToken', function(req, res){
  jsonContent = req.body;
  myMongo.updateDocument(jsonContent.collection, 
    {
      uid:jsonContent.uid, 
      did:jsonContent.did, 
      type:jsonContent.type
    }, 
    {
      $set:{
        access_token : jsonContent.access_token,
        refresh_token : jsonContent.refresh_token,
        expires_at : jsonContent.expires_at
      }    
    }, function(err, result){
    res.send({err:false, message:"Update complete"});
  });
});

router.post('/updateData', function(req, res){
  jsonContent = req.body;
  // console.log(jsonContent);
  myMongo.updateDocument("data", 
    {
      uid:jsonContent.uid, 
      tool:jsonContent.tool, 
      type:jsonContent.type,
      date_time : jsonContent.date_time
    }, 
    {
      $set:{
        value : jsonContent.value,
      }    
    }, function(err, result){
    res.send({err:false, message:"Update complete"});
  });
});

router.post('/insertData', function(req, res){
  jsonContent = req.body;
  // console.log(jsonContent);
  myMongo.insertDocuments("healthdata", jsonContent, function(err, result){
      res.send({err:false, message:"Inserted complete"});
  });
});


// myMongo.updateDocument("token",
//         {
//             uid:state.uid, 
//             did:state.did, 
//             type:state.type
//         }, 
//         {
//             $set:{
//                 access_token : json.access_token,
//                 refresh_token : json.refresh_token,
//                 expires_at : json.expires_at,
//                 client_id: state.client_id,
//                 secret_id: state.secret_id
//             }    
//         },
//         function(err, respond){
//             if(err){
//                 res.send({error:"Update error"});
//             }
//             res.send({err:false, message:"Update complete"});
//         }
//     );

module.exports = router;