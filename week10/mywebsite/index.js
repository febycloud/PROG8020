const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {check,validationResult}=require('express-validator');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/mywebsite',{
    useNewUrlParser:true
})

const Contact=mongoose.model('contacts',{
    name:String,
    phone:String,
    qty:String,
    message:String
});
var myApp = express();

myApp.use(bodyParser.urlencoded({extended:false}))
myApp.use(bodyParser.json())

myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');

 myApp.get('/',function(req, res){
     res.render('index');
 });
 myApp.get('/contact',function(req, res){
     res.render('contactform');
 });
myApp.post('/contact',[
    check('name','enter a name').not().isEmpty(),
    check('phone','enter a vail phone').isMobilePhone(),
    check('qty').custom(value=>{
        value=parseInt(value)
        if(value<0){
            throw new Error('value>0 needed')
        }
        return true;
    })
],function(req, res){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        var errorData={
            errors:errors.array()
        }
        res.render('contactform',errorData)
    }else{
    var name=req.body.name;
    var phone=req.body.phone;
    var qty=req.body.qty;
    var message=req.body.message;
    var mycontact=new Contact({
        name:name,
        phone:phone,
        qty:qty,
        message:message
    });
    mycontact.save().then(()=>console.log('new contact made'));
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