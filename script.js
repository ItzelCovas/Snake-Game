let blockSize = 22;
let total_row = 22; //total row number
let total_col = 22; //total column number
let board;
let context;

let snakeX = blockSize * 6;
let snakeY = blockSize * 6;

// Set the total number of rows and columns
let speedX = 0;  //speed of snake in x coordinate.
let speedY = 0;  //speed of snake in Y coordinate.

let snakeBody = [];

let foodX;
let foodY;

let gameOver = false;

window.onload = function () {
    // Set board height and width
    board = document.getElementById("board");
    board.height = total_row * blockSize;
    board.width = total_col * blockSize;
    context = board.getContext("2d");

    placeFood();
    document.addEventListener("keyup", changeDirection);  //for movements
    // Set snake speed
    setInterval(update, 1800 / 10);
}

function update() {
    if (gameOver) {
        location.reload(); //recarga la pagina
        return;
    }

    // Background of a Game
    for (let row = 0; row < total_row; row++) {
        for (let col = 0; col < total_col; col++) {
            if ((row + col) % 2 === 0) {
                context.fillStyle = "#f8c5d1"; //rosa clarito
            } else {
                context.fillStyle = "#f4a0b6"; //rosa más fuerte
            }
            context.fillRect(col * blockSize, row * blockSize, blockSize, blockSize);
        }
    }

    context.fillStyle = "red";
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, Math.PI *2);
    context.fill();

    //Set food color and position
    context.fillStyle = "purple";
    context.beginPath();
    context.arc(foodX + blockSize / 2, foodY + blockSize / 2, blockSize / 2, 0, Math.PI * 2);
    context.fill();

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        placeFood();
    }

    // body of snake will grow
    for (let i = snakeBody.length - 1; i > 0; i--) {
        // it will store previous part of snake to the current part
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "olive";
    snakeX += speedX * blockSize; //updating Snake position in X coordinate.
    snakeY += speedY * blockSize;  //updating Snake position in Y coordinate.

    // Dibuja cabeza de la serpiente como círculo
let headGradient = context.createRadialGradient(
    snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 10,
    snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2
);

headGradient.addColorStop(0, "#fff0f6");
headGradient.addColorStop(1, "#006400");

context.beginPath();
context.arc(snakeX + blockSize / 2, snakeY + blockSize / 2, blockSize / 2.2, 0, Math.PI * 2);
context.fillStyle = headGradient;
context.fill();


// Dibuja cuerpo
for (let i = 0; i < snakeBody.length; i++) {
    let centerX = snakeBody[i][0] + blockSize / 2;
    let centerY = snakeBody[i][1] + blockSize / 2;

    //degradado radial (círculo con brillo)
    let gradient = context.createRadialGradient(
        centerX, centerY, blockSize / 10,   // centro, radio interno
        centerX, centerY, blockSize / 2     // centro, radio externo
    );

    // Colores del degradado
    gradient.addColorStop(0, "white");   // centro (rosita claro)
    gradient.addColorStop(1, "#a45ee9");   // borde (rosita más fuerte)

    context.beginPath();
    context.ellipse(
        centerX, centerY,
        blockSize / 2.2, blockSize / 2.5,
        0, 0, Math.PI * 2
    );
    context.fillStyle = gradient;
    context.fill();
}

    if (snakeX < 0 
        || snakeX > total_col * blockSize 
        || snakeY < 0 
        || snakeY > total_row * blockSize) { 
        
        // Out of bound condition
        gameOver = true;
        alert("Game Over");
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) { 
            
            // Snake eats own body
            gameOver = true;
            alert("Game Over");
        }
    }
}

// Movement of the Snake - We are using addEventListener
function changeDirection(e) {
    if (e.code == "ArrowUp" && speedY != 1) { 
        // If up arrow key pressed with this condition...
        // snake will not move in the opposite direction
        speedX = 0;
        speedY = -1;
    }
    else if (e.code == "ArrowDown" && speedY != -1) {
        //If down arrow key pressed
        speedX = 0;
        speedY = 1;
    }
    else if (e.code == "ArrowLeft" && speedX != 1) {
        //If left arrow key pressed
        speedX = -1;
        speedY = 0;
    }
    else if (e.code == "ArrowRight" && speedX != -1) { 
        //If Right arrow key pressed
        speedX = 1;
        speedY = 0;
    }
}

// Randomly place food
function placeFood() {
    // in x coordinates.
    foodX = Math.floor(Math.random() * total_col) * blockSize; 
    
    //in y coordinates.
    foodY = Math.floor(Math.random() * total_row) * blockSize; 
}
