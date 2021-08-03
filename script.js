"use strict"
const clearBtn = document.getElementById('clear-btn')
const calcDisplay = document.getElementById('calc-display')
const calcBtns = document.querySelectorAll('button')
/////////////////////////////////////////////////////////////////////////////

let firstValue = 0
let operatorValue = ''
let awaitingNextValue = false

//Calculate first and second values depending on operator
const calculate = {
  '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
  '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
  '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
  '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
  '=': (firstNumber, secondNumber) => secondNumber,
}

//Functions

function addCommas(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function sendNumberValue(number) {
  calcDisplay.classList.remove('animated')
  //If current display value is 0, replace it, if not add number
  if(awaitingNextValue) {
    calcDisplay.textContent = number
    awaitingNextValue = false
  } else {
    const displayValue = calcDisplay.textContent
    calcDisplay.textContent = displayValue === '0' ? number : displayValue + number
  }
}

//Add decimal to display
function addDecimal() {
  //If operator pressed, don't add decimal
  if(awaitingNextValue) return
  //If no decimal, add one
  if(!calcDisplay.textContent.includes('.')) {
    calcDisplay.textContent = `${calcDisplay.textContent}.`
  }
}

function useArithmetic(operator) {
  const currentValue = Number(calcDisplay.textContent)
  //Prevent multiple operators
  if(operatorValue && awaitingNextValue) {
    operatorValue = operator
    return
  }

  if(!firstValue) {
    firstValue = currentValue
  } else {
    const calculation = calculate[operatorValue](firstValue, currentValue)
    console.log(calculation);
    firstValue = calculation
    calcDisplay.textContent = addCommas(calculation)
  }
  //Ready for second value, store operator
  awaitingNextValue = true
  operatorValue = operator
}

//Clear Calculator and reset values
function clearCalculator() {
  calcDisplay.textContent = '0'
  calcDisplay.classList.add('animated')
  firstValue = 0
  operatorValue = ''
  awaitingNextValue = false
}

//Add Event Listeners for numbers, arithmetic, decimal buttons\
calcBtns.forEach(btn => {
  if(btn.classList.length === 0) {
    btn.addEventListener('click', () => sendNumberValue(btn.value))
  } else if (btn.classList.contains('arithmetic')) {
    btn.addEventListener('click', () => useArithmetic(btn.value))
  } else if (btn.classList.contains('decimal')){
    btn.addEventListener('click', () => addDecimal())
  }
})
 
clearBtn.addEventListener('click', clearCalculator)