var express = require('express');
var router = express.Router();
var usr = require('dao/dbConnect');

 var express = require('express');
 var router = express.Router();
 var usr=require('dao/dbConnect');
 
 /* GET home page. */ 
 router.route('/')
     .get(function(req, res) {
         if(req.session.islogin){
             res.locals.islogin=req.session.islogin;
         }
 
         if(req.cookies.islogin){
             req.session.islogin=req.cookies.islogin;
         }
         res.render('login');
     })
     .post(function(req, res) {
         if(req.body.subject==="signIn"){
             client=usr.connect();
             result=null;
             usr.selectFun(client,req.body.username, function (result) {
                    if(result[0]===undefined){
                    res.session.error="not find user";
                    res.redirect('/');
                    }else{
                          if(result[0].password===req.body.password){
                          req.session.islogin=req.body.username;
                          res.locals.islogin=req.session.islogin;
                          res.cookie('islogin',res.locals.islogin,{maxAge:60000});
                          res.redirect('/info');
                          }else
                              {      
                               //res.sesion.error='密码错误';
                               res.redirect('/');
                               }
                          }
            });
         }
         else{
                     client = usr.connect();
                     result=null;
                     usr.selectFun(client,req.body.username, function (result) {
                         if(result[0]===undefined){
                              usr.insertFun(client,req.body.username ,req.body.password, function (err) {
                              if(err) throw err;
                              res.redirect('/info');
                              });
                         }else{  
                                 //res.sesion.error='该用户已存在，请重新输入用户名';
                                 res.redirect('/');
                             }
                            
                     });


         }
         
     });

router.get('/info',function(req, res){
  if(req.session.islogin){
         res.locals.islogin=req.session.islogin;
     }
     if(req.cookies.islogin){
         req.session.islogin=req.cookies.islogin;
     }
     res.render('info', {user:res.locals.islogin, level:1, correctness:2, bestgenre:"haha"});
});
 

   
 


module.exports = router;
