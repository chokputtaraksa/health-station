// can be any devices that use oauth2 as a service.

/*
deviceInfo = {
    id : 1234,
    type : "fitbit", //hexoskin
    client_id : "xxxxx",
    secret_id : "yyyyy",
}
userInfo{
    id : 1234,
}
*/

var MongoClient = require('mongodb').MongoClient;

function Device (userId, deviceInfo) {
    uid = userId;
    did = deviceInfo.id;
    type = deviceInfo.type;
    client_id = deviceInfo.client_id;
    secret_id = deviceInfo.secret_id;
    oAuth2Info = getOAuth2Info(this.type);
}



/* ===================================Inner===================================== */

function getOAuth2Info(type){
    var oauth2Info = {};
    if(type === "fitbit"){
        oauth2Info = {
            tokenHost : 'https://api.fitbit.com',
            tokenPath : '/oauth2/token',
            authorizePath : '/oauth2/authorize',
            redirect_uri : 'http://localhost:3000/callback',
            scope : 'activity heartrate location nutrition profile settings sleep social weight',
            state : JSON.stringify({"uid":this.uid, "did":this.did, "type":this.type, "client_id":this.client_id, "secret_id":this.secret_id, "redirect_uri" : 'http://localhost:3000/callback',})
        }
    }else if(type === "hexoskin"){
        oauth2Info = {
            tokenHost: 'https://api.hexoskin.com',
            tokenPath: '/api/connect/oauth2/token/',
            authorizePath: '/api/connect/oauth2/auth/',
            redirect_uri : 'https://localhost:3001/api/token/callbackhs',
            scope : 'readwrite',
            state: JSON.stringify({"uid":this.uid, "did":this.did, "type":this.type, "client_id":this.client_id, "secret_id":this.secret_id, "redirect_uri" : 'https://localhost:3001/api/token/callbackhs'}),
        }
    }
    return oauth2Info;
}
