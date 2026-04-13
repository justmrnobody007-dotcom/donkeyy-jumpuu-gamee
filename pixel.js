const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let score = 0;
let gameOver = false;
let gameStarted = false;
let gravity = 0.6;
let isJumping = false;

let playerImage = new Image();
playerImage.src = "donkeyy.png";

let animals = ["donkeyy.png","blackcar.png","bee.png"];

let options = ["isDonkey", "isCat" , "isBee"];

for(let i = 0; i < options.length; i++){
    let button = document.getElementById(options[i]);

    button.onclick = function(){
        playerImage.src = animals[i];

        button.blur();
    }
}

let player = {
    x:50,
    y:110,
    width:80,
    height:80,
    dy:0
};

let cactus = { 
    x: 600, 
    y: 130, 
    width: 60, 
    height: 60, 
    speed: 3 
};


document.addEventListener('keydown', function(event) {
    if (event.code === 'Space' ) {
        if (!gameStarted && !gameOver) {
            gameStarted = true;
        } 
        else if (gameStarted && !isJumping) {
            player.dy = -20; 
            isJumping = true;
        }
    }
});

function update(){
    if(gameOver || !gameStarted) 
        return;

    player.dy += gravity;
    player.y += player.dy;

    if (player.y >= 110){
        player.y = 110;
        isJumping = false;
        player.dy = 0;
    }

    cactus.x -= cactus.speed;

    if(cactus.x < -40){
        cactus.x = 600;
        score ++;
        cactus.speed += 0.05;
    }

    if (player.x < cactus.x + cactus.width &&
        player.x + player.width > cactus.x &&
        player.y < cactus.y + cactus.height &&
        player.y + player.height > cactus.y) {
        
        gameOver = true;
        alert("Game Over! Final Score: " + score + "\nRefresh the page to try again.");
    }
};

function huhu(){

    ctx.clearRect(0,0, canvas.width,canvas.height);

    ctx.beginPath();
    ctx.moveTo(0, 190); 
    ctx.lineTo(600, 190);
    ctx.stroke();

    ctx.drawImage(playerImage, player.x, player.y, player.width, player.height);

    if (gameStarted) {
        // Draw the Cactus
        ctx.fillStyle = 'red';
        ctx.fillRect(cactus.x, cactus.y, cactus.width, cactus.height);

        // Draw the Score
        ctx.fillStyle = 'white'; 
        ctx.font = '20px "Press Start 2P"'; 
        ctx.fillText('Score: ' + score, 10, 30);
    } else if (!gameOver) {
        // Draw the Start Screen Instructions
        ctx.fillStyle = 'white'; 
        ctx.font = '15px "Press Start 2P"'; 
        ctx.fillText('Select character & press SPACE', 70, 100);
    }
}

function gameLoop() {
    update();
    huhu();
    
    if (!gameOver) {
    
        requestAnimationFrame(gameLoop);
    }
}

gameLoop();
