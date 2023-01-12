const buttons = document.querySelectorAll('.btn');
const reset = document.querySelector('  #reset');
const inputs = document.querySelectorAll('.input');
const customTip = document.querySelector('.input-custom');
const buttonSelected = document.getElementsByClassName('active');
const resultTip = document.querySelector('#result-tip');
const resultTotal = document.querySelector('#result-total');
const number = document.querySelector('#number');
const bill = document.querySelector('#bill');
const errorMessage = document.querySelector(' .errorMsge ');


customTip.addEventListener('click', calculatecust);

buttons.forEach((button) => {
    button.addEventListener('click', Tip);
})

//Reset
reset.addEventListener('click', resetAll)

reset.addEventListener('mouseenter', ()=>{
    reset.style.backgroundColor = 'var(--Light-grayish-cyan)';
});



//Oninput

bill.oninput = function(event){
    dealWithResetButton();

    if(customTip.value !== '' && (number.value !== '' || number.value > 0) ){
        calculate();
    }
    
}

customTip.oninput = function(){  
    dealWithResetButton();
    
    if((bill.value !== '' || bill.value < 0) && (number.value !== '' || number.value > 0) ){
        calculate();
    }
}

number.oninput = function(){
    
    dealWithResetButton();

    if(number.value <= 0 || number.value === ''){
        errorMessage.innerText = `can't be zero`;
        errorMessage.style.color = 'red';
        number.style.borderColor = 'red';
        resultTip.innerText = '----';
        resultTotal.innerText = '----';
    }else{
        errorMessage.innerText = ``;
        number.style.borderColor = '';
        calculate();
    }   
}

//functions

function calculate(){
    let tipPerPerson;
    let totalPerPerson;
    let tipPercentage;

    if(buttonSelected.length == 0){
        tipPercentage = 0;
    }else{
        if(customTip.classList.contains('active')){
            tipPercentage = customTip.value;
        }else{
            tipPercentage = buttonSelected[0].value;
        }    
    }
    
    tipPerPerson = (bill.value * tipPercentage * 0.01)/number.value;
    totalPerPerson = (bill.value/number.value) + tipPerPerson;
    tipPerPerson = tipPerPerson.toFixed(2);   
    totalPerPerson = totalPerPerson.toFixed(2);

    resultTip.innerText = tipPerPerson;
    resultTotal.innerText = totalPerPerson;
}

// calculate Tip

function Tip(){
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    this.classList.add('active');
    customTip.classList.remove('active');
    calculate();
}

// calculate Custom Tip
function calculatecust(){
    buttons.forEach((button) => {
        button.classList.remove('active');
    });
    this.classList.add('active');
    
    if((bill.value !== '' || bill.value < 0) && (number.value !== '' || number.value > 0) ){
        calculate();
    }
}

//Reset

function dealWithResetButton(){
    if(customTip.value === '' && bill.value === '' && number.value === ''){
        reset.disabled = true;
        reset.classList.remove('has-reset-activated');
        number.style.borderColor = '';
    }else{
        reset.disabled = false;
        reset.classList.add('has-reset-activated');       
    }
}


function resetAll(){
    buttons.forEach((button) => {
        button.classList.remove('active');
    });

    inputs.forEach((input) => {
        input.value = '';
    });

    resultTip.innerText = '0.00';
    resultTotal.innerText = '0.00';

    reset.disabled = true;
    errorMessage.innerText = ``;
    number.style.borderColor = ''
    reset.classList.remove('has-reset-activated');
    reset.style.backgroundColor = '';
}