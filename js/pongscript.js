var canvas = document.getElementById("pongScreen");
var ctx = canvas.getContext("2d");

var x = canvas.width/2;
var y = canvas.height/2;

var dx = 0.0001;
var dy = -1;

var ballRadius = 15;

var paddleHeight = 10;
var paddleWidth = 74;
var paddleX1 = (canvas.width-paddleWidth)/2;
var paddleX2 = (canvas.width-paddleWidth)/2;

var right1Pressed = false;
var left1Pressed = false;

var right2Pressed = false;
var left2Pressed = false;

var speedInc = 0.2;

var scoreGreen = 0;
var scoreBlue = 0;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if(e.keyCode == 39) {
        right1Pressed = true;
    }
    else if(e.keyCode == 37) {
        left1Pressed = true;
    }

    if(e.keyCode == 68){
        right2Pressed = true;
    }
    else if (e.keyCode == 65){
        left2Pressed = true;
    }
}

function keyUpHandler(e) {
    if(e.keyCode == 39) {
        right1Pressed = false;
    }
    else if(e.keyCode == 37) {
        left1Pressed = false;
    }

    if(e.keyCode == 68){
        right2Pressed = false;
    }
    else if (e.keyCode == 65){
        left2Pressed = false;
    }
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#f44248";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle1() {
    ctx.beginPath();
    ctx.rect(paddleX1, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawPaddle2() {
    ctx.beginPath();
    ctx.rect(paddleX2, 0, paddleWidth, paddleHeight);
    ctx.fillStyle = "#4ef442";
    ctx.fill();
    ctx.closePath();
}

function reset() {
    x = canvas.width/2;
    y = canvas.height/2;
    
    dx = 0.0001;
    dy = -1;

    paddleHeight = 10;
    paddleWidth = 74;
    paddleX1 = (canvas.width-paddleWidth)/2;
    paddleX2 = (canvas.width-paddleWidth)/2;

    speedInc = 0.2;
}

function drawScores() {
  ctx.font = "100px serif";
  ctx.fillStyle = "rgba(78,244,66,0.3)";
  ctx.fillText(scoreGreen, canvas.width/2-25, 150);
  ctx.fillStyle = "rgba(0,149,221,0.3)";
  ctx.fillText(scoreBlue, canvas.width/2-25, canvas.height-100);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawScores();
    drawBall();
    drawPaddle1();
    drawPaddle2();

    if(x > canvas.width-ballRadius || x < ballRadius)
        dx = -dx;
    if(y > canvas.height-ballRadius) {
        if(x > paddleX1 - 10 && x < paddleX1 + paddleWidth/2 + 10) {
            dy = -dy;
            dy = dy - speedInc;
            if(dx > 0){
                dx = -dx;
                dx = dx - speedInc;
            }
        }
        else if(x > paddleX1 + paddleWidth/2 - 5 && x < paddleX1 + paddleWidth + 5) {
            dy = -dy;
            dy = dy - speedInc;
            if(dx < 0){
                dx = -dx;
                dx = dx + speedInc;
            }
        }
        else if (x > paddleX1 + paddleWidth/2 - 5 && x < paddleX1 + paddleWidth/2 + 5)
            dy = -dy;
        else {
            scoreGreen += 1;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            reset();
            dy = -dy;
        }
    }
    else if(y < ballRadius){
        if(x > paddleX2 - 10 && x < paddleX2 + paddleWidth/2 + 10) {
            dy = -dy;
            dy = dy + speedInc;
            if(dx > 0){
                dx = -dx;
                dx = dx - speedInc;
            }
        }
        else if(x > paddleX2 + paddleWidth/2 - 5 && x < paddleX2 + paddleWidth + 5) {
            dy = -dy;
            dy = dy + speedInc;
            if(dx < 0){
                dx = -dx;
                dx = dx + speedInc;
            }
        }
        else if (x > paddleX2 + paddleWidth/2 - 5 && x <paddleX2 + paddleWidth/2 + 5)
            dy = -dy;
        else {
            scoreBlue += 1;        
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            reset();
            
        }        
    }

    if(right1Pressed && paddleX1 < canvas.width-paddleWidth) {
        paddleX1 += 7;
    }
    if(left1Pressed && paddleX1 > 0) {
        paddleX1 -= 7;
    }

    if(right2Pressed && paddleX2 < canvas.width-paddleWidth) {
        paddleX2 += 7;
    }
    if(left2Pressed && paddleX2 > 0) {
        paddleX2 -= 7;
    }

    x += dx;
    y += dy;
}

setInterval(draw, 10);