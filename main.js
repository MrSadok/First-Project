const canvas = document.getElementById("pongCanvas");
const ctx= canvas.getContext("2d");
//Set the paddle properties
const paddleWidth= 10, paddleHeight= 100;
const ballSize= 10;
var paddleSpeed= 5,ballSpeedX= 5,ballSpeedY= 5
var leftPaddleY= canvas.height/2,rightPaddleY=canvas.height/2

var leftPaddleSpeed=0,rightPaddleSpeed=0;
//Ball Properties
var ballY=canvas.height/2,ballX=canvas.width/2
//Set the initial Score
let leftScore = 0, rightScore = 0;

function drawBall(){
    ctx.fillStyle='#fff'
    ctx.fillRect(ballX,ballY,ballSize,ballSize)
}
function drawPaddles(){
    ctx.fillRect(0,leftPaddleY,paddleWidth,paddleHeight)
    ctx.fillRect(canvas.width-paddleWidth,rightPaddleY,paddleWidth,paddleHeight)
}
function movePaddles(){
    leftPaddleY+=leftPaddleSpeed;
    rightPaddleY+=rightPaddleSpeed
    if(leftPaddleY<0){
        leftPaddleY=0
    }
    if(leftPaddleY>canvas.height-paddleHeight){
        leftPaddleY=canvas.height-paddleHeight
    }
   
    if(rightPaddleY>canvas.height-paddleHeight){
        rightPaddleY=canvas.height-paddleHeight
    }
    if(rightPaddleY<0){
        rightPaddleY=0
    }
    
    }
    // Set ball mouvement
    function moveBall(){
        ballX+=ballSpeedX
        ballY+=ballSpeedY
        if( ballY<=ballSize/2 || ballY>=canvas.height-ballSize/2){  
            ballSpeedY=-ballSpeedY
        }
        if (ballX-ballSize <= paddleWidth && ballY >= leftPaddleY && ballY <= leftPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    
        if (ballX+ballSize/2 >= canvas.width-paddleWidth && ballY >= rightPaddleY&& ballY <= rightPaddleY + paddleHeight) {
            ballSpeedX = -ballSpeedX;
        }
    
        
        if(ballX+ballSize/2>=canvas.width){  // scored on right side
            leftScore++
            resetBall()
        }
        if(ballX-ballSize/2<=0){            // scored on left side
            rightScore++
            resetBall()
        }
    }

    function resetBall(){
        ballX=canvas.width/2
        ballY=canvas.height/2
        ballSpeedX=-ballSpeedX
        ballSpeedY=Math.random()
        }

    function drawScore() {
            ctx.font = "20px Georgia";
            ctx.fillText(leftScore, canvas.width / 4, 50);
            ctx.fillText(rightScore, canvas.width - canvas.width / 4, 50);
        }

    function update() {
        draw();
        movePaddles();
        moveBall();
        } 
    function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddles();
    drawScore();
}
document.addEventListener("keydown", (event) => {
    if (event.key == "ArrowUp") rightPaddleSpeed = -paddleSpeed; // Right paddle up
    if (event.key == "ArrowDown") rightPaddleSpeed = paddleSpeed; // Right paddle down
    if (event.key == "w") leftPaddleSpeed = -paddleSpeed; // Left paddle up
    if (event.key == "s") leftPaddleSpeed = paddleSpeed;  // Left paddle down
});

document.addEventListener("keyup", (event) => {
    if (event.key == "w" || event.key == "s") leftPaddleSpeed = 0; // Stop left paddle
    if (event.key == "ArrowUp" || event.key == "ArrowDown") rightPaddleSpeed = 0; // Stop right paddle
});
    
function gameLoop() {
    update();
    requestAnimationFrame(gameLoop); // Calls the gameLoop again to continue the animation
}
gameLoop();



