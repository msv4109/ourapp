var express    = require("express");
 var mysql      = require('mysql');
 var connection = mysql.createConnection({
   host     : 'dbquiz.co3gmgt1vgtz.us-east-1.rds.amazonaws.com',
   user     : 'dbproject',
   password : '12345678',
   database : 'dbquiz'
 });
 var app = express();
 
 connection.connect(function(err){
 if(!err) {
     console.log("Database is connected ... \n\n");  
 } else {
     console.log("Error connecting database ... \n\n");  
 }
 });
 
 app.get("/",function(req,res){
 connection.query('SELECT * from Genre', function(err, rows, fields) {
 connection.end();
   if (!err)
     console.log('The solution is: ', rows);
   else
     console.log('Error while performing Query.');
   });
 });
 
 app.listen(3000);