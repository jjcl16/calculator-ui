/* identify items on document*/
const calculator = document.querySelector(".body");
const topScreen = calculator.querySelector(".topScreen");
const bottomScreen = calculator.querySelector(".bottomScreen");
const clearButton = calculator.querySelector(".clear");
const deleteButton = calculator.querySelector(".delete");

const numbers = calculator.querySelectorAll(".number");

const operations = calculator.querySelectorAll(".operations")

const numbersArray = Array.from(numbers);
const operationsArray = Array.from(operations);

const objOperation = {
    number1: null,
    operation: "",
    number2: null,
    result: "0",
};

document.addEventListener("keydown", keyPressed)

numbersArray.map(events =>events.addEventListener("click", isClickingNumber));
operationsArray.map(events => events.addEventListener("click",isClickingOperations));

clearButton.addEventListener("click", clear);
deleteButton.addEventListener("click", deleteNumber);

bottomScreen.textContent = 0;

function keyPressed(e){
    //console.log(e.key);

    if (!isNaN(e.key) || e.key == "."){
        enterNumber(e.key)
    } else if (e.key === "Enter"){
        e.preventDefault();
        enterOperator("=");
    } else if(e.key === "+" || e.key === "-" || e.key === "*" || e.key === "/"|| e.key === "="){
       
        switch(e.key){
            case "/":
                //console.log("divide");
                enterOperator("÷");
                break;
            
            case "*":
                //console.log("multiplica");
                enterOperator("×");
                break;
    
            case "-":
                //console.log("resta");
                enterOperator("−");
                break;
            
            case "+":
                //console.log("suma");
                enterOperator("+");
                break;
    
            default:
                //console.log("igual");
                objOperation.result=number1;
    
        }
    } else if(e.key==="Backspace"){
        deleteNumber();
    }else if(e.key==="Delete"){ 
        clear();
    }
}

function isClickingNumber(e){

    const clicked = e.target.textContent;    
    enterNumber(clicked) ;
}

function enterNumber(number){
    if(objOperation.result != "0") clear();

    if (bottomScreen.textContent.length < 8 ){
        if( number == "." && bottomScreen.textContent == "0"){
            bottomScreen.textContent = bottomScreen.textContent.concat(number);
        } else if (bottomScreen.textContent == "0" && number != "."){
            bottomScreen.textContent = number;
        } else if (!bottomScreen.textContent.includes(".") ){
            bottomScreen.textContent = bottomScreen.textContent.concat(number);
        } else if ( bottomScreen.textContent.includes(".") && number!= "."){
            bottomScreen.textContent = bottomScreen.textContent.concat(number);
        }
    }


    
}

function isClickingOperations(e){
    
    const clicked = e.target.textContent;
    enterOperator(clicked);
   /*
    EventClickOperation(clicked);
    topScreen.textContent = (clicked != "=") ?   bottomScreen.textContent.concat(clicked)  : "" ;
    
    
    bottomScreen.textContent = objOperation.result;
    */
}

function enterOperator(operator){
    EventClickOperation(operator);
    topScreen.textContent = (operator != "=") ?   bottomScreen.textContent.concat(operator)  : "" ;
    bottomScreen.textContent = objOperation.result;
}

function clear(){
    objOperation.number1 = null;
    objOperation.number2 = null;
    objOperation.result = "0";
    objOperation.operation="";
    bottomScreen.textContent = objOperation.result;
    topScreen.textContent= "";
    
}

function deleteNumber(){
    bottomScreen.textContent = returnWithoutLast(bottomScreen.textContent);
}


function returnWithoutLast(number){
    let newNumber;
    if (number.length > 1){
        newNumber = number.slice(0, number.length-1);
        return newNumber;
    }else return "0";
}

function countDecimals(number){
    if(typeof number === "string"){        
        let numeros = number.split(".");
        let decimals = (numeros[1]) ? numeros[1].length : 0;
        return decimals;
    } else return 0;
}


function mathematic(){
    
    let decimals = countDecimals(objOperation.number1) + countDecimals(objOperation.number2);
    //console.log({decimals});
    let number1 = Number(objOperation.number1);
    let number2 = Number(objOperation.number2);

    switch(objOperation.operation){
        case "÷":
            //console.log("divide");
            
            objOperation.result=(decimals > 0) ? (number1*decimals)/(number2*decimals) : (number1*100)/(number2*100);
            break;
        
        case "×":
            //console.log("multiplica");
            objOperation.result=(decimals > 0) ? (number1*number2)*(decimals/decimals) : (number1*number2);
            break;

        case "−":
            //console.log("resta");
            objOperation.result=(decimals > 0) ? (number1*decimals-number2*decimals)/decimals : number1-number2;
            break;
        
        case "+":
            //console.log("suma");
            objOperation.result=(decimals > 0) ? (number1*decimals+number2*decimals)/decimals : number1+number2;
            break;

        default:
            //console.log("igual");
            objOperation.result=number1;

    }

    objOperation.result = ( !isNaN(objOperation.result) && (objOperation.result < 99999999) ) ? checkLength(objOperation.result) : "Error";
    // inicializar 
    
    objOperation.number1 = null;
    objOperation.number2 = null;
    objOperation.operation="";
    return objOperation;
}

function checkLength(number){

    let  numbers = number.toString().split(".");



    return  (numbers[1] && numbers[0].length<7) ? number.toFixed(2) :
            (numbers[1] && numbers[0].length<8) ?  number.toFixed(1) :
            (numbers[0].length<9 && typeof (numbers[1]) === "undefined") ? number : "Error";
}

function EventClickOperation(operation) {
    objOperation.result=0;
    if (operation === "=" && objOperation.number1 != null && operation != ""){
        objOperation.number2 = bottomScreen.textContent;
        //console.log('llama a math');
        mathematic();
    } else if (operation === "=" && objOperation.number1 === null){
        objOperation.number1 = bottomScreen.textContent;
        //console.log('llama a math');
        mathematic();
    } else if (objOperation.operation === "" && objOperation.number2 === null){ //agregar numero y operation
        //addNumber1();
        objOperation.number1 = bottomScreen.textContent;
        //addOperation(operation); 
        objOperation.operation = operation;    
        //console.log(objOperation);           
    } else if (objOperation.operation != "" && bottomScreen.textContent === "0"){ //solo se puede cambiar de operation si no hay number2  
        //replaceOperation();
        //console.log(objOperation);
        objOperation.operation = operation;  
    } else if (objOperation.operation != "" ){  //siempre que este lleno operation
        objOperation.number2 = bottomScreen.textContent;
        //console.log("llama a math");    
        mathematic();
    }
 }
