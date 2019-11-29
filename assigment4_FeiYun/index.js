const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/fksys', {
    useNewUrlParser: true
});

const fileUpload = require('express-fileupload');
const session = require('express-session');

const Contact = mongoose.model('Contact',{
    tag:String,
    name:String,
    message:String,
    myimage:String,
} );
const Logo = mongoose.model('Logo',{
    myimage:String
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
        
            Contact.find({}).exec(function(err, contacts){
            res.render('index', {contacts:contacts});
        
    });
         
});

myApp.get('/contact',function(req, res){
    res.render('contactform');
});

myApp.post('/contact',[
    check('name', 'Please enter the name').not().isEmpty(),
    check('tag','Please input a slug').not().isEmpty(),
    check('tag').custom(value => {
        var Regex = /^[A-z]{1}[a-z]{1,4}$/;
        if(!Regex.test(value)){
            throw new Error('Input a value with pattern Abcde')
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
        var tag=req.body.tag;
        var message = req.body.message;
      
        var myContact = new Contact({
            name: name,
            tag:tag,
            message: message,
            myimage: imageName
        });
        myContact.save().then( ()=>{
            console.log('New contact created');
        });
        var pageData = {
            name: name,
            tag:tag,
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
        var tag=req.body.tag;
        var message = req.body.message;
     
        //fetch the contact with the id from URL from the database
        Contact.findOne({_id:id}).exec(function(err, contact){
            contact.name = name;
            contact.tag=tag;
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

// ----------------------change logo-----------------------
myApp.get('/logo',function(req, res){
    res.render('logoform');
});

myApp.post('/logo',function(req,res){
    var id = '5de08469ffc92503686c7718';
    var imageName = 'logo.png';
    var image = req.files.myimage;
    var imagePath = 'public/contact_logos/logo.png';
    image.mv(imagePath,function(err){
        console.log(err);
    });
       //fetch the contact with the id from URL from the database
    Logo.findOne({_id:id}).exec(function(err, logo){
        logo.myimage = imageName;
        //save the updated contact into the database
        logo.save().then(()=>{
            console.log('logo updatedx')
        });
    });
    res.redirect('/allcontacts')
})
//--------------------------------------------------------------
myApp.get('/delete/:id',function(req, res){
    var id = req.params.id;
    Contact.findByIdAndDelete({_id:id}).exec(function(err, contact){
        res.render('delete')
    });
});


myApp.get('/:tag',function(req, res){
    var tag = req.params.tag;
    Contact.findOne({tag:tag}).exec(function(err, contact){
        res.render('singlecontact', {contact:contact})
    });
});

myApp.get('/',function(req,res){
    Logo.findOne({}).exec(function(err, logo){
        res.render('index', {logo:logo})
    });
});


//----------- Start the server -------------------

myApp.listen(8080);
console.log('Server started at 8080 for mywebsite...');