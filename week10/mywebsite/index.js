const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {check,validationResult}=require('express-validator');
var myApp = express();

myApp.use(bodyParser.urlencoded({extended:false}))
myApp.use(bodyParser.json())

myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

 myApp.get('/',function(req, res){
     res.render('index');
 });
// myApp.get('/contact',function(req, res){
//     res.render('contactform');
// });
myApp.post('/contact',[
    check('name','enter a name').not().isEmpty(),
    check('email','enter a vail email').isEmail()
],function(req, res){
    const errors=validationResult(req);
    if(!errors.isEmpty()){

    }else{
    var name=req.body.name;
    var phone=req.body.phone;
    var qty=req.body.qty;
    var pageData={
        name:name,
        phone:phone,
        qty:qty
    }
    res.render('contactthanks',pageData);
}
});

myApp.listen(8080);
console.log('Server started at 8080 for mywebsite...');