var AWS = require('aws-sdk'); 
AWS.config.update({
	accessKeyId: 'J8aPAKcK9TafeYO9YhVE',
	secretAccessKey: 'opDKChX0NwT5AvQkS9lbOgjiKhaReYgmiUuhAgr3',
});
var s3 = new AWS.S3({endpoint: 's3-api.us-geo.objectstorage.softlayer.net'} ); 
var parms = { Bucket: 'takeyan'} ;
s3.listObjects(parms, function (err, data) {
 if(err)throw err;
 console.log(data);
 });
