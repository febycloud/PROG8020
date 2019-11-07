function Car(make,model,year){
    this.make=make;
    this.model=model;
    this.year=year;
}
 
var myCar=new Car('Toyota','CHR',2019);
 console.log(myCar.model);

 class herCar{
     constructor(make,model,year){
    this.make=make;
    this.model=model;
    this.year=year;
    }

    printDetail(){
        console.log(`
        Make:${this.make}
        Model:${this.model}
        Year:${this.year}`);
        
    }
}

var thisCar=new herCar('hanxueBaoma','CRV',2018);
thisCar.printDetail();

function addNum(num1,num2){
    return num1+num2;
}
console.log(addNum(3,5));

const addArrow =(num1,num2)=>{return num1+num2;}
console.log(addArrow(5,8));

addArrow2 =(num1,num2)=>{return num1+num2;}
console.log(addArrow2(5,8));