var AWS = require('aws-sdk'); 
var express = require('express');
app = express();
AWS.config.update({
	accessKeyId: 'J8aPAKcK9TafeYO9YhVE',
	secretAccessKey: 'opDKChX0NwT5AvQkS9lbOgjiKhaReYgmiUuhAgr3',
});
var s3 = new AWS.S3({endpoint: 's3-api.us-geo.objectstorage.softlayer.net'} ); 
var parms = { Bucket: 'takeyan'} ;
var st;

app.get('/', function(req, res) {

 s3.listObjects(parms, function (err, data) {
  if(err){
      st = err;
      console.log("### ERROR:" + st);
  }
  st = data;
  console.log(st);
 });
 
 res.send('### Response from ICOS:' + JSON.stringify(st));
});

var port = process.env.PORT || 3000;
app.listen(port);
console.log('listening at:', port);