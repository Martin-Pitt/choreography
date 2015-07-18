/// Require necessary dependencies
var fs = require('fs');
var koa = require('koa');
var server = koa();
var serve = require('koa-static');


/// API for fetching Roles DB
/*server.use(function *(next) {
	if(this.request.path !== '/api/roles') return yield next;
	
	var data = yield function (next) {
		fs.readFile(__dirname + '/roles.json', function(err, data) {
			if(err) next(err, null);
			else next(null, JSON.parse(data));
		});
	};
	
	this.body = data;
});*/


/// Redirect non-file-ish queries to index
server.use(function* (next) {
	if(this.request.path.length && /^(\/[\-_a-z0-9]+)+\/?$/i.test(this.request.path))
	{
		this.request.path = '/';
	}
	
	yield next;
});


/// Define a static directory to serve
server.use(serve('./frontend'));


if(!module.parent)
{
	/// Launch the server locally
	var port = process.env.PORT || 8045;
	server.listen(port);
	console.log('Launching webserver at localhost:' + port);
}
else
{
	/// Export the koa server
	module.exports = server;
}
