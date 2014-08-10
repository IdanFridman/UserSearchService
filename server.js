var app = require('./app');
var webSocketService=require('./services/webSocketService');

app.set('port', process.env.PORT || 3000);
var server = app.listen(app.get('port'), function() {
    console.log((new Date()) + ' Server is listening on port 3000');
    webSocketService.initWebSockets(server);
});




