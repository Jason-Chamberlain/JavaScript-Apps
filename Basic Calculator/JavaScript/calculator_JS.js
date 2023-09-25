/* This JavaScript document provides logic and functionality to calculator.html */

// Creates an object to keep track of values
const Calculator = {
    Display_Value: '0',
    First_Operand: null,
    Wait_Second_Operand: false,
    operator: null,
};

// Modifies values each time a button is clicked
function Input_Digit(digit) {
    const { Display_Value, Wait_Second_Operand } = Calculator;

    // If Wait_Second_Operand is true, sets Display_Value to clicked key value and sets
    // Wait_Second_Operand to false
    if (Wait_Second_Operand === true) {
        Calculator.Display_Value = digit;
        Calculator.Wait_Second_Operand = false;
    } else {
        // If Display_Value is 0, overwrites display value with clicked key value
        // If not, it appends Display_value with clicked key value
        Calculator.Display_Value = Display_Value === '0' ? digit : Display_Value + digit;
    }
}

// Handles Decimal Point click
function Input_Decimal(dot) {
    // Prevents accidental Decimal Point clicks from causing bugs in operation
    if (Calculator.Wait_Second_Operand === true) return;

    // Adds Decimal Point only if one does not already exist
    if (!Calculator.Display_Value.includes(dot)) {
        Calculator.Display_Value += dot;
    }
}

// Handles Operators
function Handle_Operator(NextOperator) {
    const { First_Operand, Display_Value, operator } = Calculator;

    // When Operator is pressed, convert the Display_Value to a number and
    // store in Calculator.First-Operand
    const Value_of_Input = parseFloat(Display_Value);

    // If Operator exists and Wait_Second_Operand is true, updates the operator and
    // exits the function allowing user to change operator without performing the 
    // calculation with the previous operator
    if (operator && Calculator.Wait_Second_Operand) {
        Calculator.operator = NextOperator;
        return;
    }

    // If First_Operand is null, Value_of_Input assigned to First_Operand 
    if (First_Operand == null) {
        Calculator.First_Operand = Value_of_Input;
    }

    // Checks if operator already exists
    else if (operator) {
        const Value_Now = First_Operand || 0;

        // If operator exists, matching operator function in Perform_Calculation 
        // object is performed
        let result = Perform_Calculation[operator](Value_Now, Value_of_Input);

        // Add fixed amount of numbers after Decimal Point
        result = Number(result).toFixed(9);

        // Removes trailing zeros
        result = (result * 1).toString();
        Calculator.Display_Value = parseFloat(result);
        Calculator.First_Operand = parseFloat(result);
    }
    Calculator.Wait_Second_Operand = true;
    Calculator.operator = NextOperator;
}

// Object containing Operator Functions
const Perform_Calculation = {
    '/': (First_Operand, Second_Operand) => First_Operand / Second_Operand,
    '*': (First_Operand, Second_Operand) => First_Operand * Second_Operand,
    '+': (First_Operand, Second_Operand) => First_Operand + Second_Operand,
    '-': (First_Operand, Second_Operand) => First_Operand - Second_Operand,
    '=': (First_Operand, Second_Operand) => Second_Operand
};

// Resets Calculator to its initial state
function Calculator_Reset() {
    Calculator.Display_Value = '0';
    Calculator.First_Operand = null;
    Calculator.Wait_Second_Operand = false;
    Calculator.operator = null;
}

// Updates Calculator screen with Display_Value
function Update_Display() {
    const display = document.querySelector('.calculator-screen');
    display.value = Calculator.Display_Value;
}

Update_Display();

// Monitors for button clicks
const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', (event) => {
    const { target } = event;  // target is object that represents element that was clicked

    // If clicked element not a button, function exits
    if (!target.matches('button')) {
        return;
    }
    // Calls Handle_Operator function
    if (target.classList.contains('operator')) {
        Handle_Operator(target.value);
        Update_Display();
        return;
    }
    // Calls Input_Decimal function
    if (target.classList.contains('decimal')) {
        Input_Decimal(target.value);
        Update_Display();
        return;
    }
    // Resets Calculator
    if (target.classList.contains('all-clear')) {
        Calculator_Reset();
        Update_Display();
        return;
    }

    // Calls Input_Digit function
    Input_Digit(target.value);
    Update_Display();
})