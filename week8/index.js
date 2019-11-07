var express=require('express');
var path=require('path');
var myApp=express();

myApp.set('views',path.join(__dirname,'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine','ejs');
myApp.get('/',function(req,res){
    res.render('index');
});
myApp.get('/newpage',function(req,res){
    res.render('newpage');
});

myApp.listen(8080);
console.log('server start at 8080');