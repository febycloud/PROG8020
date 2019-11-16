
 var car;
 function getc(e){
    car=e.getAttribute("id");
    document.getElementById("youcar").innerHTML='You choosed '+car;
    //alert(car);
}
function placeOrder(){
    var errors = '';

    //name block
    var name = document.getElementById('name').value;
    if(name.trim() == ''){ // check if name is empty
        errors += 'Name is required<br>';
        document.getElementById('name').focus();
    }
    var address=document.getElementById('address').value;
    var city=document.getElementById('city').value;
    if(address.trim()==''||city.trim()==''){
        errors += 'address is required<br>';
        document.getElementById('city').focus();
    }
    //postcode block
    var postcode = document.getElementById('postcode').value;
    var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;

    if(!postcodeRegex.test(postcode)){
        errors += 'Postcode is not in correct format<br>';
        document.getElementById('postcode').focus();
    }

    //phonenumber block
    var phone = document.getElementById('phone').value;
    var phoneRegex = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/;

    if(!phoneRegex.test(phone)){
        errors += 'Phone is not in correct format<br>';
        document.getElementById('phone').focus();
    }

    //email block
    var email = document.getElementById('email').value;
    var emailRegex = /^[0-9a-z]{1,}@[0-9a-z.]{1,}$/;

    if(!emailRegex.test(email)){
        errors += 'Email is not in correct format<br>';
        document.getElementById('email').focus();
    }

    //Cars
    var cars={'CHR':12990,'GTR':27890,'VIZIO':32950};
    // location tax
    var tax={'Alberta':5,
            'BritishColumbia':12,
            'Manitoba':12,
            'Saskatchewan':11,
            'Ontario':13,
            'Quebec':15,
            'Nunavut':5};
    var province=document.getElementById('province').value;
    var ptax=tax[province];
    var quantities=document.getElementById('quantities').value;
    var quanRogex=/^[0-9]$/;
    if(!quanRogex.test(quantities)){
        errors+='Quantities is not in correct format<br>'
    }
    //delivery day
    var dday={'1day':40,
                '2day':30,
                '3day':20,
                '4day':10};
    var price=0;
    //choose car
    if(car=='CHR'){price=cars['CHR'];}
    else if(car=='GTR'){price=cars['GTR'];}
    else if(car=='VIZIO'){price=cars['VIZIO'];}
    else{errors+='please choose a car';}
    //get the day
    var day=document.getElementById('delivery').value;
    var dayprice=dday[day];
    var total=price*((ptax+100)/100)*quantities+dayprice;
    total=total.toFixed(2);

    }
   