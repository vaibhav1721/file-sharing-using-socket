var express = require('express');
var app = express();
var http = require('http');
var socketIo = require('socket.io');
var fs =require ('fs');
var path = require('path')
var port = process.env.PORT || 3000;
var server ,io;

app.get('/', function(req, res){
res.sendFile(__dirname + '/index.html');
});
server = http.Server(app);
server.listen(port);
io = socketIo(server);
io.on('connection', function(socket){
const stats = fs.statSync("./2.jpg");
const fileSizeInBytes = stats.size;
console.log("fileSizeInBytes", fileSizeInBytes);
var i=0;
for(i=0; i<fileSizeInBytes; i+1000){	

var readst =fs.createReadStream(path.resolve(__dirname, './2.jpg'),{
encoding:'binary', start : i , end : i+1000
}),chunks =[];

readst.on('readable',() =>{
console.log("Image loading");
})
readst.on('data',(chunk) =>{
console.log("chunks >>>>>>>>"+ i, chunk)
socket.emit('img-chunk',chunk);
})
readst.on('end',() =>{
console.log("Image loaded");
})
}
});
