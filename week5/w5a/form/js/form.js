/*
    The function formSubmit() is called when the form "myform" is submitted.
    It should run some validations and show the output.
*/
function formSubmit(){

    var errors = '';

    var name = document.getElementById('name').value;
    if(name.trim() == ''){ // check if name is empty
        errors += 'Name is required<br>';
    }

    var lunch = document.getElementsByName('lunch');//fetch all elements for lunch
    var lunchValue = '';
    for(var i = 0; i < lunch.length; i++){
        if(lunch[i].checked){// check if this is the input user checked
            lunchValue = lunch[i].value; //fetch the checked value
        }
    }
    if(lunchValue == ''){
        errors += 'Lunch is required<br>';
    }

    var tickets = document.getElementById('tickets').value;

    console.log(lunch);


    var postcode = document.getElementById('postcode').value;
    var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;

    if(!postcodeRegex.test(postcode)){
        errors += 'Postcode is not in correct format<br>';
    }

    // testing phone number
    var phone = document.getElementById('phone').value;
    var phoneRegex = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/;

    if(!phoneRegex.test(phone)){
        errors += 'Phone is not in correct format<br>';
    }

    if(errors){
        document.getElementById('errors').innerHTML = errors;
    }
    else{

        var totalCost = tickets*10;
        if(lunchValue == 'yes'){
            totalCost += 60;
        } 
        var tax = totalCost * 0.13;

        var total = totalCost + tax;
        document.getElementById('errors').innerHTML = '';
        document.getElementById('formResult').innerHTML = `
                                                    Name: ${name}<br>
                                                    Postcode: ${postcode}<br>
                                                    Tickets: ${tickets}<br>
                                                    Sub Total: $${totalCost}<br>
                                                    with Tax: $${total}
                                                    `;
    }

    //Write your code here



    // Return false will stop the form from submitting and keep it on the current page.
    return false;
}