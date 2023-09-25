let activePlayer;                           // Represents the active player ('X' or 'O')
let selectedSquares;                        // Stores the selected squares on the board
let endGame;                                // Indicates if the game has ended or not
resetVariables();                           // Reset the game variables to their initial state

function placeXorO(squareNumber) {
    if (selectedSquares.some(element => element.includes(squareNumber))) { return false; }
	
    // Check if the selected square is already occupied
    let select = document.getElementById(squareNumber);
	
	// Place 'X' image on the selected square
    if (activePlayer === 'X') {
        select.style.backgroundImage = 'url("./images/x.png")';   
    } 
	
	// Place 'O' image on the selected square
	else {
        select.style.backgroundImage = 'url("./images/o.png")';   
    }
	
	// Play a sound effect
    audio('./media/place.mp3');   
	
	// Add the selected square to the array with the player's symbol
    selectedSquares.push(squareNumber + activePlayer);   
	
	// If there is a win condition, reset the game
    if (checkWinConditions()) {
        resetGame();   
        return true;
    }
	
	// Switch to the other player
    if (activePlayer === 'X') {
        activePlayer = 'O';   
    } else {
        activePlayer = 'X';
    }

    if (activePlayer === 'O') {
        disableClick();                     // Disable clicking while it's the computer's turn
        computersTurn();                    // Let the computer make its move
    }

    return true;

    function computersTurn() {
        let success = false;
        let pickASquare;

        while (!success) {
            pickASquare = String(Math.floor(Math.random() * 9));

            if (placeXorO(pickASquare)) {
                success = true;             // The computer successfully made its move
            };
        }		
		
        if (!endGame) { enableClick(); }    // Enable clicking after the computer's turn
    }
}

// Disable clicking on the game board
function disableClick() {
    body.style.pointerEvents = 'none';   
}

// Enable clicking on the game board
function enableClick() {
    body.style.pointerEvents = 'auto';   
}

// Play specified audio file
function audio(audioURL) {
    let audio = new Audio(audioURL);	
    audio.play();   
}

// Clear the background image of each square on the board
function clearBoard() {
    for (let index = 0; index < 9; index++) {
        let square = document.getElementById(String(index));
        square.style.backgroundImage = '';   
    }    
}

// Reset the game to it's initial state
function resetGame() {
    resetVariables();   
}    

// Reset the game variables
function resetVariables() {
    selectedSquares = [];                   // Clear the selected squares array
    activePlayer = "X";                     // Set the active player to 'X'
    endGame = false;                        // Set the endGame flag to false
}

function checkWinConditions() {
    endGame = true;                         // Assume the game has ended

    if (arrayIncludes('0X', '1X', '2X')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3X', '4X', '5X')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6X', '7X', '8X')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0X', '3X', '6X')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1X', '4X', '7X')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2X', '5X', '8X')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6X', '4X', '2X')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0X', '4X', '8X')) { drawWinLine(100, 100, 520, 520) }
    else if (arrayIncludes('0O', '1O', '2O')) { drawWinLine(50, 100, 558, 100) }
    else if (arrayIncludes('3O', '4O', '5O')) { drawWinLine(50, 304, 558, 304) }
    else if (arrayIncludes('6O', '7O', '8O')) { drawWinLine(50, 508, 558, 508) }
    else if (arrayIncludes('0O', '3O', '6O')) { drawWinLine(100, 50, 100, 558) }
    else if (arrayIncludes('1O', '4O', '7O')) { drawWinLine(304, 50, 304, 558) }
    else if (arrayIncludes('2O', '5O', '8O')) { drawWinLine(508, 50, 508, 558) }
    else if (arrayIncludes('6O', '4O', '2O')) { drawWinLine(100, 508, 510, 90) }
    else if (arrayIncludes('0O', '4O', '8O')) { drawWinLine(100, 100, 520, 520) }
    else if (selectedSquares.length >= 9) {
        audio('./media/tie.mp3');           // Play a tie sound effect
        clearBoard();                       // Clear the board
        enableClick();                      // Enable clicking
    }
    else { endGame = false; }               // The game has not ended

    return endGame;                         // Return the endGame flag
}

// Check if the array includes all three specified elements
function arrayIncludes(squareA, squareB, squareC) {
    const a = selectedSquares.includes(squareA);
    const b = selectedSquares.includes(squareB);
    const c = selectedSquares.includes(squareC);	
    if (a === true && b === true && c === true) { return true; }   
}

function drawWinLine(coordstartX, coordstartY, coordendX, coordendY) {
    const canvas = document.getElementById("win-lines");
    const c = canvas.getContext('2d');
    let startX = coordstartX,               // Starting X-coordinate of the line
        startY = coordstartY,               // Starting Y-coordinate of the line
        endX = coordendX,                   // Ending X-coordinate of the line
        endY = coordendY,                   // Ending Y-coordinate of the line
        currentX = startX,                  // Current X-coordinate being drawn
        currentY = startY;                  // Current Y-coordinate being drawn

    function animateLineDrawing() {
        const animationLoop = requestAnimationFrame(animateLineDrawing);
        c.clearRect(0, 0, 608, 608);        // Clear the canvas
        c.beginPath();
        c.moveTo(startX, startY);           // Move to the starting position of the line
        c.lineTo(currentX, currentY);       // Draw a line to the current position
        c.lineWidth = 7;                    // Set the line width
        c.strokeStyle = 'rgba(70, 255, 33, .8)'; // Set the line color
        c.stroke();

        // Update the current position until the line reaches the end coordinates
        if (startY <= endY) {
            if (currentX < endX) { currentX += 10; }
            if (currentY < endY) { currentY += 10; }
            if (currentX >= endX && currentY >= endY) { endLineDrawing(animationLoop); }
        }

        if (startY > endY) {
            if (currentX < endX) { currentX += 10; }
            if (currentY > endY) { currentY -= 10; }
            if (currentX >= endX && currentY <= endY) { endLineDrawing(animationLoop); }
        }
    }

    function clearLine() {
        const animationLoop = requestAnimationFrame(clearLine);
        c.clearRect(0, 0, 608, 608);        // Clear the canvas
        cancelAnimationFrame(animationLoop); // Stop the animation loop
    }

    function endLineDrawing(animationLoop) {
        cancelAnimationFrame(animationLoop); // Stop the animation loop
        clearLine();                        // Clear the line on the canvas
        clearBoard();                       // Clear the game board
        enableClick();                      // Enable click on the game board
    }

    disableClick();                         // Disable click on the game board
    audio('./media/winGame.mp3');           // Play a win sound effect
    animateLineDrawing();                   // Animate drawing the winning line
}