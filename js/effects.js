const calculatorBody = document.querySelector(".body");
const numberButtons = calculatorBody.querySelectorAll(".number");
const operationButtons = calculatorBody.querySelectorAll(".operations");
const topButtons= calculatorBody.querySelectorAll('.topButton');

const numbersButtonsArray = Array.from(numberButtons);
const operationButtonsArray = Array.from(operationButtons);
const topButtonsArray = Array.from(topButtons)


numbersButtonsArray.map((number) => {
                        number.addEventListener("mouseenter", mouseOnNumber);
                        number.addEventListener("mouseleave", mouseLeaveNumber);
                        number.addEventListener("click", clicked);
                        //number.addEventListener("mouseup", unclicked);
                        //number.addEventListener("click", green);
                    });
operationButtonsArray.map((operation) => {
                        operation.addEventListener("mouseenter", mouseOnOperation);
                        operation.addEventListener("mouseleave", mouseLeaveOperation);
                        operation.addEventListener("click", clicked);
                        //operation.addEventListener("mouseup", unclicked);
                    });

topButtonsArray.map((button)=> {
                        button.addEventListener("mouseenter", mouseOnOperation);
                        button.addEventListener("mouseleave", mouseLeaveOperation);
                        button.addEventListener("click", clicked);
                        //button.addEventListener("mouseup", unclicked);
                    });                    


function mouseOnNumber(e){
    const numberSelected = e.target;
    numberSelected.classList.add('mouseOnNumber');
}

function mouseLeaveNumber(e){
    const numberSelected = e.target;
    numberSelected.classList.remove('mouseOnNumber');
}

function mouseOnOperation(e){
    const operationSelected = e.target;
    operationSelected.classList.add('mouseOnOperation');
}

function mouseLeaveOperation(e){
    const operationSelected = e.target;
    operationSelected.classList.remove('mouseOnOperation');    
}

function clicked(e){
    const clickedButton = e.target;
    clickedButton.classList.add('clicked');
    setTimeout(deleteClass, 50, clickedButton);
}

function deleteClass(clickedButton){
    clickedButton.classList.remove('clicked');  
}

function green(e){
    const clickedButton = e.target;
    clickedButton.classList.add('green');  

}
