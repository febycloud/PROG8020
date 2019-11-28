const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mywebsite', {
    useNewUrlParser: true
});

const fileUpload=require('express-fileupload'); //use fileupload model
const Contact = mongoose.model('Contact',{
    name: String,
    phone: String,
    qty: String,
    message: String,
    mypic:String
} );

const session=require('express-session');

const Admin=mongoose.model('Admin',{
    username:String,
    password:String
});

var myApp = express();

myApp.use(session({
    secret:'secretmessage',
    resave:false,
    saveUninitialized:true
}));
myApp.use(fileUpload()); //use fileupload api
myApp.use(bodyParser.urlencoded({ extended:false}));

myApp.use(bodyParser.json())

myApp.set('views', path.join(__dirname, 'views'));
myApp.use(express.static(__dirname+'/public'));
myApp.set('view engine', 'ejs');


//---------------- Routes ------------------

myApp.get('/',function(req, res){
    res.render('index');
});

myApp.get('/contact',function(req, res){
    res.render('contactform');
});

myApp.post('/contact',[
    check('name', 'Please enter the name').not().isEmpty(),
    check('phone', 'Please enter a valid phone').isMobilePhone(),
    check('confirmphone').custom((value, {req}) => {
        if(value !== req.body.phone){
            throw new Error('Numbers do not match');
        }
        return true;
    }),
    check('qty').custom(value => {
        value = parseInt(value)
        if(value < 0){
            throw new Error('Negative value found');
        }
        return true;
    })
],function(req, res){
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        var errorsData = {
            errors: errors.array()
        }
        res.render('contactform',errorsData);
    }
    else{
        var mypicName=req.files.mypic.name;
        var pic=req.files.mypic;
        var picpath='public/contact_images/'+mypicName;
        pic.mv(picpath,function(err){
            console.log(err)
            
        });
        var name = req.body.name;
        var phone = req.body.phone;
        var qty = req.body.qty;
        var message = req.body.message;
        qty = parseInt(qty);
        var cost = qty * 99;
        var myContact = new Contact({
            name: name,
            phone: phone,
            qty: qty,
            message: message,
            mypic:mypicName
        });
        myContact.save().then( ()=>{
            console.log('New contact created');
        });
        var pageData = {
            name: name,
            phone: phone,
            qty: qty,
            cost: cost,
            message: message
        };
        res.render('contactthanks',pageData);
    }
});

// ------------ New Routes ---------------------

myApp.get('/login',function(req, res){
    res.render('login');
});
myApp.post('/login',function(req, res){
    //res.render('login');
    var username=req.body.username;
    var password=req.body.password;
    Admin.findOne({username:username,password:password}).exec(function(err,admin) {
        req.session.username=admin.username;
        req.session.userLoggin=true;
        //console.show(session.userLoggin);
        res.redirect('/allcontacts');
    })
});

myApp.get('/logout',function(req, res){
    res.render('logout');
});

myApp.get('/allcontacts',function(req, res){
    if(req.session.userLoggin){
    //res.render('allcontacts');
    Contact.find({}).exec(function (err,contacts) {
        res.render('allcontacts',{contacts:contacts});    
    });
}
else{res.render('login')
}
});




myApp.get('/edit/:id',function(req, res){
    var id=req.params.id; //fetch with /:name part
    //res.send(name);
    Contact.findOne({_id:id}).exec(function (err,contact){
        res.render('edit',{contact:contact})
    });
    //res.render('singlecontact');
});


myApp.get('/delete',function(req, res){
    res.render('delete');
});

myApp.get('/:name',function(req, res){
    var name=req.params.name; //fetch with /:name part
    //res.send(name);
    Contact.findOne({name:name}).exec(function (err,Contact){
        res.render('singlecontact',{Contact:Contact})
    });
    //res.render('singlecontact');
});


//----------- Start the server -------------------

myApp.listen(8080);
console.log('Server started at 8080 for mywebsite...');