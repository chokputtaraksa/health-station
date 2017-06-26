var Router = require('express');


    mylib = require('../controllers/mylib');
    // assert = require('assert');

var router = express.Router();

router.post('/test', function (req, res) {
    // console.log(req.body);
    var json = req.body;
});

module.exports = router;


// { token_type: 'Bearer',
//   state: '6145605',
//   access_token: 'YNYMs8S80atJ9MY9WjXI4ptoJkOyhe',
//   scope: 'readwrite',
//   expires_in: 3600,
//   refresh_token: 'iOKJksf9retrtAgmdnfFIYR1OsKP1n',
//   expires_at: 2017-03-09T16:20:00.027Z,
//   uid: 1111,
//   did: 1111,
//   type: 'hexoskin' }

// {
//     "access_token":"eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0WE1LSzMiLCJhdWQiOiIyMjdaWUciLCJpc3MiOiJGaXRiaXQiLCJ0eXAiOiJhY2Nlc3NfdG9rZW4iLCJzY29wZXMiOiJyc29jIHJzZXQgcmFjdCBybG9jIHJ3ZWkgcmhyIHJudXQgcnBybyByc2xlIiwiZXhwIjoxNDg4MzAyNzk4LCJpYXQiOjE0ODgyNzM5OTh9.LfV9wlcgdbBok2xHPbFdHorWuSHAdFniLwsG_Hqu0jc",
//     "expires_in":28800,
//     "refresh_token":"6df3f199c01d7f07903e74267bf5ab82c85d40b855a360a60aa3f270354083ad",
//     "scope":"sleep nutrition settings location activity social profile weight heartrate",
//     "token_type":"Bearer",
//     "user_id":"4XMKK3",
//      uid: 1111,
//      did: 1111,
//      type: 'fitbit'
// }