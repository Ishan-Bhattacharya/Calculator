document.addEventListener('DOMContentLoaded', () => {
    let screen = document.querySelector('#screen');
    let currentNumber = '';
    let currentOperator = null;
    let previousNumber = null;
  
    // Select all buttons using class
    let buttons = document.querySelectorAll('.one, .two, .three, .four, .five, .six, .seven, .eight, .nine, .zero, .add, .minus, .multi, .divide, .clear, .clearall, .equal');
  
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        handleButtonClick(e.target.innerText);
      });
    });
  
    // Handle keyboard events
    document.addEventListener('keydown', (e) => {
      if (e.key >= 0 && e.key <= 9) {
        handleButtonClick(e.key);
      } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        handleButtonClick(e.key);
      } else if (e.key === 'Enter') {
        handleButtonClick('=');
      } else if (e.key === 'Backspace') {
        handleButtonClick('Back');
      } else if (e.key === 'Escape') {
        handleButtonClick('CA');
      }
    });
  
    function handleButtonClick(buttonText) {
      if (buttonText === 'x') {
        buttonText = '*'; // Handle multiplication symbol
      }
  
      console.log("Button Text:", buttonText);
  
      if (buttonText >= 0 && buttonText <= 9) {
        // If a number button is pressed, append it to the current number
        currentNumber += buttonText;
        screen.textContent = currentNumber;
        console.log("Current Number:", currentNumber);

      } else if (buttonText === '+' || buttonText === '-' || buttonText === '*' || buttonText === '/') {

        // If an operator button is pressed, store the current number and operator
        // Reset the current number
        if (currentNumber !== '') {
          previousNumber = currentNumber;
          currentOperator = buttonText;
          currentNumber = '';
        }
        console.log("Previous Number:", previousNumber);
        console.log("Current Operator:", currentOperator);
      } else if (buttonText === 'CA') {
        // Clear all: reset all variables
        currentNumber = '';
        currentOperator = null;
        previousNumber = null;
        screen.textContent = '0';
      } else if (buttonText === 'Back') {
        // Backspace: remove the last character from the current number
        if (currentNumber !== '0') {
          currentNumber = currentNumber.slice(0, -1);
          screen.textContent = currentNumber;
        }
        if (currentNumber.length === 1) {
            currentNumber = '0';
            screen.textContent = '0';
            }
      } else if (buttonText === '=') {
        // Calculate the result
        if (previousNumber !== null && currentOperator !== null && currentNumber !== '') {
          console.log("Previous Number:", previousNumber); // Log previous number
          console.log("Current Operator:", currentOperator); // Log current operator
          console.log("Current Number:", currentNumber); // Log current number
  
          let result;
          switch (currentOperator) {
            case '+':
              result = parseFloat(previousNumber) + parseFloat(currentNumber);
              break;
            case '-':
              result = parseFloat(previousNumber) - parseFloat(currentNumber);
              break;
            case '*':
              result = parseFloat(previousNumber) * parseFloat(currentNumber);
              break;
            case '/':
              result = parseFloat(previousNumber) / parseFloat(currentNumber);
              break;
            default:
              break;
          }
  
          console.log("Result:", result); // Log the calculated result
  
          screen.textContent = result; // Update the screen textContent after calculating the result
          currentNumber = result.toString();
          previousNumber = null;
          currentOperator = null;
        }
      }
    }
  });