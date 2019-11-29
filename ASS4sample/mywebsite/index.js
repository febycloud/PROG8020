const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mywebsite', {
    useNewUrlParser: true
});

const fileUpload = require('express-fileupload');
const session = require('express-session');

const Contact = mongoose.model('Contact',{
    name: String,
    phone: String,
    qty: String,
    message: String,
    myimage: String
} );

const Admin = mongoose.model('Admin', {
    username: String,
    password: String
});

var myApp = express();
myApp.use(session({
    secret: 'superrandomsecret',
    resave: false,
    saveUninitialized: true
}));
myApp.use(fileUpload());
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
        var imageName = req.files.myimage.name;
        var image = req.files.myimage;
        var imagePath = 'public/contact_images/'+imageName;
        image.mv(imagePath,function(err){
            console.log(err);
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
            myimage: imageName
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
    var username = req.body.username;
    var password = req.body.password;

    Admin.findOne({username:username, password: password}).exec(function(err, admin){
        req.session.username = admin.username;
        req.session.userLoggedIn = true;
        res.redirect('/allcontacts');
    });
});

myApp.get('/logout',function(req, res){
    res.render('logout');
});

myApp.get('/allcontacts',function(req, res){
    if(req.session.userLoggedIn){
        Contact.find({}).exec(function(err, contacts){
            res.render('allcontacts', {contacts:contacts});
        });
    }
    else{
        res.redirect('/login');
    }
});


myApp.post('/edit/:id',function(req,res){
        var id = req.params.id;
        var imageName = req.files.myimage.name;
        var image = req.files.myimage;
        var imagePath = 'public/contact_images/'+imageName;
        image.mv(imagePath,function(err){
            console.log(err);
        });
        var name = req.body.name;
        var phone = req.body.phone;
        var qty = req.body.qty;
        var message = req.body.message;
        qty = parseInt(qty);
        //fetch the contact with the id from URL from the database
        Contact.findOne({_id:id}).exec(function(err, contact){
            contact.name = name;
            contact.phone = phone;
            contact.qty=qty;
            contact.message = message;
            contact.myimage = imageName;
            //save the updated contact into the database
            contact.save().then(()=>{
                console.log('contact updatedx')
            });
        });
        res.redirect('/allcontacts')
    })


myApp.get('/edit/:id',function(req, res){
    var id = req.params.id;
    Contact.findOne({_id:id}).exec(function(err, contact){
        res.render('edit', {contact:contact})
    });
});

myApp.get('/delete/:id',function(req, res){
    var id = req.params.id;
    Contact.findByIdAndDelete({_id:id}).exec(function(err, contact){
        res.render('delete')
    });
});


myApp.get('/:name',function(req, res){
    var name = req.params.name;
    Contact.findOne({name:name}).exec(function(err, contact){
        res.render('singlecontact', {contact:contact})
    });
});


//----------- Start the server -------------------

myApp.listen(8080);
console.log('Server started at 8080 for mywebsite...');