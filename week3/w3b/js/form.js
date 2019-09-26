function processForm(){
    var myOutput = '';
    var errors = '';
    //alert('form submitted');

    //fetch tickets and validate
    var tickets = document.getElementById('tickets').value;
    if(tickets.trim() === ''){
        //document.getElementById('errors').innerHTML ='Please enter a Name';
        errors += 'Please enter tickets <br>';
    }
    else if(isNaN(tickets)){ //check if the tickets are a string
        errors += 'Please enter tickets as a number only<br>';
    }
    else{
        tickets = parseInt(tickets);
        if(tickets <= 0){
            errors += 'Please enter more than 0 tickets<br>';
        }
    }


    //fetch name and validate
    var userName = document.getElementById('userName').value;
    if(userName.trim() === ''){
        //document.getElementById('errors').innerHTML ='Please enter a Name';
        errors += 'Please enter your name <br>';
    }

    var userEmail = document.getElementById('userEmail').value;
    if(userEmail.trim() === ''){
        //document.getElementById('errors').innerHTML ='Please enter an email';
        errors += 'Please enter your email <br>';
    }

    var userPhone = document.getElementById('userPhone').value;
    if(userPhone.trim() === ''){
        //document.getElementById('errors').innerHTML ='Please enter a Phone';
        errors += 'Please enter your phone <br>';
    }

    var userAddress = document.getElementById('userAddress').value;
    if(userAddress.trim() === ''){
        //document.getElementById('errors').innerHTML ='Please enter an Address';
        errors += 'Please enter your adress <br>';
    }

    if(errors){
        document.getElementById('errors').innerHTML = errors;
    }
    else{
        //myOutput += 'Name: '+userName+'<br>';
        cost = tickets * 20;
        myOutput = `
                    Name: ${userName}<br>
                    Email: ${userEmail}<br>
                    Phone: ${userPhone}<br>
                    Address: ${userAddress}<br>
                    Cost: $${cost}<br>
        `; 
        document.getElementById('result').innerHTML = myOutput;
    }
    //alert(userEmail);
    return false; //stops the form from submitting
}