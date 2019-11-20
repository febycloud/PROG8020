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
 myApp.post('/result',[
    check('name','enter a name').not().isEmpty(),
    check('email','enter a vailed email').isEmail(),
    check('address','enter an vailed address').not().isEmpty(),
    check('phone','enter a vail phone').isMobilePhone(),
    check('city','enter a vail city').not().isEmpty(),
    check('address','enter a vail address').not().isEmpty(),
    check('quantities','at least get choose a car').not().isEmpty(),

    check('postcode').custom(value=>{
        var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
        if(!postcodeRegex.test(value)){
            throw new Error('postcode is not correct')
        }
        return true;}
       )


],function(req, res){
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        var errorData={
            errors:errors.array()
        
        }
        res.render('index',errorData)
       
    }else{
    var name=req.body.name;
    var phone=req.body.phone;
    var email=req.body.email;
    var address=req.body.address;
    var city=req.body.city;
    var postcode=req.body.postcode;
    var province=req.body.province;
    var day=req.body.day;
    var quantities=req.body.quantities;
    var tax={'Alberta':5,
            'BritishColumbia':12,
            'Manitoba':12,
            'Saskatchewan':11,
            'Ontario':13,
            'Quebec':15,
            'Nunavut':5};
    var dday={ '1day':30,'2day':25,'3day':20,'4day':15};
    var price=0;
    var cars={'CHR':12990,'GTR':27890,'VIZIO':32950};
    var car=req.body.car
if(car=='CHR'){price=cars['CHR'];}
else if(car=='GTR'){price=cars['GTR'];}
else if(car=='VIZIO'){price=cars['VIZIO'];}
var ptax=tax[province];
var dayprice=dday[day];
var total=price*((ptax+100)/100)*quantities+dayprice;
    total=total.toFixed(2);
       var pageData={
        name:name,
        phone:phone,
        email:email,
        postcode:postcode,
        address:address,
        city:city,
        province:province,
        quantities:quantities,
        day:day,
        car:car,
        ptax:ptax,
        price:price,
        total:total    
    }
    res.render('result',pageData);
}
});
myApp.listen(8080);

console.log('Server started at 8080 for mywebsite...');