function myform(){
    var error="";
    var name=document.getElementById('name').value;
    var nameRegex = /^[A-Za-z]{1,}\s[A-Za-z]{1,}$/;
    if(!nameRegex.test(name)){
        error+='Name format is not correct<br>';
    }
    var email=document.getElementById('email').value;
    var emailRegex = /^[0-9a-z]{1,}@[0-9a-z.]{1,}$/;;
    if(!emailRegex.test(email)){
        error+='Email format is not correct<br>';
    }
    var phone = document.getElementById('phone').value;
    var phoneRegex = /^[0-9]{3}\s?[0-9]{3}\s?[0-9]{4}$/;

    if(!phoneRegex.test(phone)){
        error += 'Phone format is not in correct <br>';
        
    }
  var mark1=document.getElementById('mark1').value;
  var mark2=document.getElementById('mark2').value;
  var mark3=document.getElementById('mark3').value;
  var makrRegex=/^(?:[1-9]?\d|100)$/;
  if(!makrRegex.test(mark1)||!makrRegex.test(mark2)||!makrRegex.test(mark3)){
      error+='inpute marks as number from 0-100';
  }

  var avrscor=(parseInt(mark1)+parseInt(mark2)+parseInt(mark3))/3;
  var gpascor=avrscor/10%10;
  if(avrscor<55){gpascor=4;}
  if(avrscor==100){gpascor=9;}
  var gpa={9:'A+',8:'A',7:'B+',6:'B',5:'C',4:'D'};
  var gparank=gpa[Math.floor(gpascor)];

  if(error){
    document.getElementById('error').innerHTML=error;
  }
  else{
    document.getElementById('result').innerHTML=`Avrange score:${avrscor}<br>
                                                GPA:${gparank}<br>`;
  }


  return false;
}