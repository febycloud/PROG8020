var score=0;
  document.getElementById("score").innerHTML="Your score is: 0"
    function showqz1(){
        var txt;
  if (confirm("The largest country in the world is Russia")) {
    txt = "Correct";
    document.getElementById("ans1").style.color="green";
    score++;
    document.getElementById("score").innerHTML="Your score is:"+score;
  } else {
    txt = "Incorrect";
    document.getElementById("ans1").style.color="red";
  }
  document.getElementById("ans1").innerHTML = txt;
  document.getElementById("button1").disabled=true;
}
    function showqz2() {
      var ans=prompt("Johnny’s mother had three children. The first child was named April. The second child was named May. What was the third child’s name?");
      if(ans.toLowerCase()=="johnny"){
        txt = "Correct";
        document.getElementById("ans2").style.color="green";
        score++;
        document.getElementById("score").innerHTML="Your score is:"+score;
      }else{
        txt = "Incorrect";
        document.getElementById("ans2").style.color="red";
      }
      document.getElementById("ans2").innerHTML = txt;
      document.getElementById("button2").disabled=true;
}

    function showqz3() {
      var ans=prompt("7 X 8 - 7 =");
      if(parseFloat(ans).toString()=="NaN"){
        alert("please input a Number")
        }else{
          if(parseInt(ans)==49){
            txt = "Correct";
            document.getElementById("ans3").style.color="green";
            score++;
            document.getElementById("score").innerHTML="Your score is:"+score;
          }else{
            txt = "Incorrect";
            document.getElementById("ans3").style.color="red";
          }
          document.getElementById("ans3").innerHTML = txt;
          document.getElementById("button3").disabled=true;
          
      }
      
}

function showqz4() {
      var ans=prompt("What word in the English language is always spelled incorrectly?");
      if(ans.toLowerCase()=="Incorrectly"){
        txt = "Correct";
        document.getElementById("ans4").style.color="green";
        score++;
        document.getElementById("score").innerHTML="Your score is:"+score;
      }else{
        txt = "Incorrect";
        document.getElementById("ans4").style.color="red";
      }
      document.getElementById("ans4").innerHTML = txt;
      document.getElementById("button4").disabled=true;
}

function showqz5() {
      var ans=prompt("What kind of room has no doors or windows");
      if(ans.toLowerCase()=="mushroom"){
        txt = "Correct";
        document.getElementById("ans5").style.color="green";
        score++;
        document.getElementById("score").innerHTML="Your score is:"+score;
      }else{
        txt = "Incorrect";
        document.getElementById("ans5").style.color="red";
      }
      document.getElementById("ans5").innerHTML = txt;
      document.getElementById("button5").disabled=true;
}

