/*
    The function formSubmit() is called when the form "myform" is submitted.
    It should run some validations and show the output.
*/
function formSubmit(){
    var errors='';
    var name=document.getElementById('name').value;
    if(name.trim()==''){
        errors+='name is required<br>';
    }
    var lunch=document.getElementByName('lunch');
    var lunchValue='';
    for(var i=0;i<lunch.length;i++){
        if(lunch[i].checked){
            lunchValue=lunch[i].value
        }
        if(ByteLengthQueuingStrategy==''){
            errors+='lunch is required'
        }
        console.log(lunch);
    }

    var tickets=document.getElementById('tickets');

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
        var totalCost=tickets*10;
        if(lunchValue=='yes'){
            totalCost+=60;
        }
        var tax=totalCost*0.13;
        var total=totalCost+tax;
        document.getElementById('errors').innerHTML='';

        document.getElementById('formResult').innerHTML=`Name:${name}<br>
                                                        Postcode:${postcode}<br>
                                                        Tickets:${tickets}<br>
                                                        Subtotal${totalCost}<br>
                                                        withTax${totalCost}<br>`;
    }

    //Write your code here



    // Return false will stop the form from submitting and keep it on the current page.
    return false;
}