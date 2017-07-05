var AuthenticationController = require('./controllers/authentication'),  
    // TodoController = require('./controllers/todos'),  
    DataController = require('./controllers/healthData');
    RoleController = require('./controllers/e-careRole');
    express = require('express'),
    passportService = require('../config/passport'),
    passport = require('passport');
 
var requireAuth = passport.authenticate('jwt', {session: false}),
    requireLogin = passport.authenticate('local', {session: false});
    requireLoginBasic = passport.authenticate('basic', { session: false })
 
module.exports = function(app){
 
    var apiRoutes = express.Router(),
        authRoutes = express.Router(),
        // todoRoutes = express.Router();
        roleRoutes = express.Router();
        dataRoutes = express.Router();
 
    // Auth Routes
    apiRoutes.use('/auth', authRoutes);
 
    authRoutes.post('/register', AuthenticationController.register2);
    // authRoutes.post('/register', AuthenticationController.register2);
    authRoutes.get('/login', requireLoginBasic, AuthenticationController.login);
 
    authRoutes.get('/protected', requireAuth, function(req, res){
        res.send({ content: 'Success'});
    });
 
    // Data Routes
    apiRoutes.use('/data', dataRoutes);
    dataRoutes.post('/save', DataController.insertData);
    dataRoutes.get('/allLestest', DataController.getLatestData);
    dataRoutes.get('/period', DataController.findDataByType)
    dataRoutes.get('/latest', DataController.findLatestDataByType)

    // Role Routes
    apiRoutes.use('/roles', roleRoutes);



    // roleRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['doctor','patient','relative']), RoleController.getRoles);
    // roleRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['doctor','patient']), RoleController.getRoles);
    // roleRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['patient']), RoleController.getRoles);


    // Todo Routes
    // apiRoutes.use('/todos', todoRoutes);
 
    // todoRoutes.get('/', requireAuth, AuthenticationController.roleAuthorization(['reader','creator','editor']), TodoController.getTodos);
    // todoRoutes.post('/', requireAuth, AuthenticationController.roleAuthorization(['creator','editor']), TodoController.createTodo);
    // todoRoutes.delete('/:todo_id', requireAuth, AuthenticationController.roleAuthorization(['editor']), TodoController.deleteTodo);
 
    // Set up routes
    app.use('/api', apiRoutes);
 
}