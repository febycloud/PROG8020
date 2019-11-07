function placeOrder{
    var errors = '';

    //name block
    var name = document.getElementById('name').value;
    if(name.trim() == ''){ // check if name is empty
        errors += 'Name is required<br>';
    }

    //postcode block
    var postcode = document.getElementById('postcode').value;
    var postcodeRegex = /^[A-Z][0-9][A-Z]\s[0-9][A-Z][0-9]$/;

    if(!postcodeRegex.test(postcode)){
        errors += 'Postcode is not in correct format<br>';
    }

    //phonenumber block
    var phone = document.getElementById('phone').value;
    var phoneRegex = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/;

    if(!phoneRegex.test(phone)){
        errors += 'Phone is not in correct format<br>';
    }
    
}
