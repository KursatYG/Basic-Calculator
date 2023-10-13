const screen = document.querySelector(".screen");

let starterValue = 0;
let screenValue = "0";
let previousOperator;

function buttonClick(value) {
  if (isNaN(value)) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  screen.innerText = screenValue;
}

function handleSymbol(symbol) {
  switch (symbol) {
    case "C":
      screenValue = "0";
      starterValue = 0;
      break;
    case "=":
      if (previousOperator === null) {
        return
      }
      flushOperator(parseInt(screenValue));
      previousOperator = null;
      screenValue = starterValue;
      starterValue = 0;
      break;
    case "←":
      if (screenValue.length === 1) {
        screenValue = "0";
      } else {
        screenValue = screenValue.substring(0, screenValue.length - 1);
      }
      break;
    case "+":
    case "−":
    case "×":
    case "÷":
      handleMath(symbol);
      break;
  }
}

function handleMath(symbol) {
  if (screenValue === 0) {
    return;
  }
  const intScreenValue = parseInt(screenValue);

  if (starterValue === 0) {
    starterValue = intScreenValue;
  } else {
    flushOperator(intScreenValue);
  }
  previousOperator = symbol;
  screenValue = "0";
}

function flushOperator(intScreenValue) {
  if (previousOperator === "+") {
    starterValue += intScreenValue;
  } else if (previousOperator === "−") {
    starterValue -= intScreenValue;
  } else if (previousOperator === "×") {
    starterValue *= intScreenValue;
  } else if (previousOperator === "÷") {
    starterValue /= intScreenValue;
  }
}

function handleNumber(numberString) {
  if (screenValue === "0") {
    screenValue = numberString;
  } else {
    screenValue += numberString;
  }
}

function init(){
    document.querySelector('.calc-buttons').addEventListener('click', function(event){
        buttonClick(event.target.innerText);
    })
}

init();
console.log(buttonClick);
