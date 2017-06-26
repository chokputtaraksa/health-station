var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var Config = require("../configs/database");
var db;

exports.connect = function(callback) {
  MongoClient.connect(Config.database, function(err, database) {
    if( err ) throw err;
    db = database;
    callback();
  });
}

exports.getDB = function(){
    return this.db;
}

exports.findDataDocuments = function(query, callback) {
    // console.log(query);
  // Get the documents collection 
  var collection = db.collection("healthdata");
  if(query.type==="anyType" && query.tool==="anyTool"){
    // console.log("2 any");
    collection.find({uid: query.uid, date_time:{$gt:query.from ,$lt:query.to}}).toArray(function(err, docs) {
      callback(null, docs);
    });
  }else if(query.type==="anyType"){
    collection.find({uid: query.uid, tool:query.tool, date_time:{$gt:query.from ,$lt:query.to}}).toArray(function(err, docs) {
    // console.log("anyType");
      callback(null, docs);
    });
  }else if(query.tool==="anyTool"){
    collection.find({uid: query.uid, type:query.type, date_time:{$gt:query.from ,$lt:query.to}}).toArray(function(err, docs) {
    // console.log("anyTool");
      callback(null, docs);
    });
  }else{
    // console.log(query);
    collection.find({uid: query.uid, type:query.type, tool:query.tool, date_time:{$gt:query.from ,$lt:query.to}}).toArray(function(err, docs) {
    // console.log("None");
      callback(null, docs);
    });
  }
}

exports.findToken = function(data, callback) {
  var collection = db.collection("token");
  // console.log(data);
  collection.find({uid: parseInt(data.uid), type: data.type}).toArray(function(err, docs) {
    callback(null, docs);
  });
}

exports.findDocuments = function(ct, callback) {
    // console.log(ct);
  // Get the documents collection 
  var collection = db.collection(ct);
  // Find some documents 
  collection.find({}).toArray(function(err, docs) {
    // console.log("Found the following records");
    // console.dir(docs);
    callback(null, docs);
  });
}

exports.updateDocument = function(ct, $query, $project, callback) {
    // console.log(ct)
  // Get the documents collection 
  var collection = db.collection(ct);
  // console.log($query);
  // console.log($project);
  // Update document where a is 2, set b equal to 1 
  collection.updateOne($query
    , $project , { upsert: true }, function(err, result) {
    	if(err) callback(err,null);
    	else {
    		// console.log(result);
    		callback(null, result);
    	}
  });  
}

exports.insertDocuments = function(ct, docs, callback) {
  // Get the documents collection
  var collection = db.collection(ct);
  // Insert some documents
  // console.log(docs);
  collection.insertMany(docs , function(err, result) {
    if(err) callback(err);
    else callback(null, "{err:false, message:inserted completed}");
    // console.log("{err:false, message:inserted completed}");
  });
}