/*
    The function formSubmit() is called when the form "myform" is submitted.
    It should run some validations and show the output.
*/
function formSubmit(){
    var errors='';
    //POSTCODE
    var postcode=document.getElementById('postcode').value;
    var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;
    if(!postcodeRegex.test(postcode)){
    errors+='Postcode is not correct<br>';
    }
    if(errors){
        document.getElementById('errors').innerHTML=errors;
    }else{
        document.getElementById('formResult').innerHTML+=`Postcode:${postcode}`;
        document.getElementById('errors').innerHTML='';
    }
    //phonenumber
    var phone=document.getElementById('phone').value;
    var phoneRegex = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/;
    if(!phoneRegex.test(phone)){
    errors+='Phone number is not correct<br>';
    }
    if(errors){
        document.getElementById('errors').innerHTML=errors;
        document.getElementById('formResult').innerHTML=`Phone:${phone}`;
    }else{
        
        document.getElementById('errors').innerHTML='';
    }

    //Write your code here



    // Return false will stop the form from submitting and keep it on the current page.
    return false;
}