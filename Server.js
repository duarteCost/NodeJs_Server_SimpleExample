/**
 * Created by duarte on 30/06/2017.
 */
var Http = require('http');
var Router = require('router');
var BodyParser = require('body-parser');
router = new Router();
router.use(BodyParser.urlencoded({extended:true}));

var counter = 0;
var messages = {};

var server = Http.createServer(function(request, response){
	router(request, response, function(error){
		if(error){
			respose.writeHead(404);
			console.log('error');
		}
	})

});

server.listen(8080, function(){
	console.log('Listening on port 8080!!!');
});


function createMessage(request, response){
	var id = counter += 1;
	var message = request.body;
	messages[id] = message;	
	console.log("Create Message"+id.toString()+":", message);
	console.log(messages);
	response.end("message"+id.toString()+":"+JSON.stringify(message));

}

function getAllMessages(request, response)
{
	if(messages.length != 0)
	{
		console.log("Messages: ", messages);
		response.end("Messages: "+JSON.stringify(messages));
	}
	else
	{
		console.log('Not fund any messages');
		response.end('Not fund any messages');
	}
	
}

function getSingleMessage(request, response){
	var id = request.params.id;
	var message = messages[id]

	if(message != null)
	{
		console.log("Message: ", message);
		response.end("Message: "+JSON.stringify(message));
	}
	else
	{
		console.log('Not fund message');
		response.end('Not fund message');
	}
}

function deleteSingleMessage(request, response){
	var id = request.params.id;
	var message = messages[id];

	if(message == null)
	{
		console.log('Messase does not exist');
		response.end('Messase does not exist');
	}
	else
	{
		messages[id] = null;
		console.log('Messase was deleted sucessfuly. You have this messages: ', messages);
		response.end('Messase was deleted sucessfuly. You have this messages: '+JSON.stringify(messages));
	}
}










//routes
router.post('/message', createMessage);
router.get('/messages', getAllMessages);
router.get('/message/:id', getSingleMessage);
router.delete('/message/:id', deleteSingleMessage);