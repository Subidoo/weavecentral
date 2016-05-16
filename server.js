var express = require('express');
var session = require('express-session');
var cors = require('cors');
var bodyParser = require('body-parser');
var mongojs = require('mongojs');
var mongoose = require('mongoose');


// Node Server
var app = express();
app.set('port', process.env.PORT || 8000);
var port = 8000;


// Middleware
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(cors());

// Controllers

var DirectoryController = require('./api/controllers/directory_controller');
var HelpDeskController = require('./api/controllers/helpdesk_controller');

//Endpoints
// Directory

app.get('/api/people', DirectoryController.findAll);

app.get('/api/people/:id', DirectoryController.findOne);

app.post('/api/people', DirectoryController.create);

app.put('/api/people/:id', DirectoryController.update);

app.delete('/api/people/:id', DirectoryController.destroy);

// Help Desk

app.get('/api/helpDesk', HelpDeskController.findAll);

app.get('/api/helpDesk/:id', HelpDeskController.findOne);

app.post('/api/helpDesk', HelpDeskController.create);

app.put('/api/helpDesk/:id', HelpDeskController.update);

app.delete('/api/helpDesk/:id', HelpDeskController.destroy);





// // // MongoDB
var mongoUri = 'mongodb://localhost:27017/weaveConnect';
mongoose.connect(mongoUri);



// // Start Database
var db = mongojs('weaveConnect', ['people', 'helpDesk']);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function() {
    console.log('connected to db at ' + mongoUri)
});


// Start Server
app.listen(port, function() {
    console.log('Server listening on port ' + port);
});
