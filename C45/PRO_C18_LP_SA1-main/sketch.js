var play = 1;
var end = 0;
var gameState = play;
var score 

var boy, boy_running, boy_falling;
var ghost, ghost_running;

var ground, invisibleGround, groundImage;
var cloud, cloudsGroup, cloudImage;
var pointsGroup, points;
var obstacleGroup, obstacle;
var gameOver, restart
var goldCoin
var stones
var bullet

function preload(){
    boy_running = loadAnimation("running1.png", "running2.png", "running3.png", "running4.png", "running5.png")
    boy_falling = loadImage("falling3.png");
    ghost_running = loadAnimation("ghost1.png", "ghost2.png", "ghost3.png");
    ghost_win = loadImage("ghost1.png")

    groundImage = loadImage("ground.png");
    backGround = loadImage("backgroundImg.png");
    cloudImage = loadImage("cloud.png");
    restartImg = loadImage("restart.png");
    gameOverImg = loadImage("gameOver.png");
    sunImage = loadImage("sun.png");
    goldCoinImage = loadImage("goldCoin.png")
    bulletImage = loadImage("SkullBullet.png");

    jumpSound = loadSound("jump.wav");
    fallSound = loadSound("collided.wav");
}

function setup(){
    createCanvas(1000,210);

   //create ground
   ground = createSprite(200,260,800,15);
   ground.addImage("ground",groundImage);
   ground.x = width/2
   ground.velocityX = 0
   ground.scale=0.8; 
 
 //create boy sprite
 boy = createSprite(530,150,20,50);
 boy.addAnimation("running", boy_running);
 //boy.addAnimation("falling", boy_falling);
 boy.scale = 0.3;

 //create ghost sprite
 ghost = createSprite(40,140,20,50);
 ghost.addAnimation("running2", ghost_running);
 ghost.scale = 0.4;

 /*//create sun sprite
 sun = createSprite(width-50,100,10,10);
  sun.addAnimation("sun", sunImage);
  sun.scale = 0.1*/
  
 
  //create invisible ground
  invisibleGround = createSprite(width/2,height+55,width,125);  
  invisibleGround.shapeColor = "#F4CBAA";
  invisibleGround.visible = false;
  
  bulletGroup = createGroup();

  //boy.debug = true;


  score = 0;
  score1 = 0;


}

function draw(){
    background("black");
    text("Score: "+score1, 40,40)

    if(gameState === play) {
        ground.velocityX = -(1.5+score/100)
        if (ground.x < 0) {
            ground.x = ground.width/10
        }
        boy.changeAnimation("running", boy_running)
        score=score+Math.round(frameCount/60);
        shootBullets();

        if(keyDown("space")&& boy.y >= 100){
            boy.velocityY = -12;
            //score1 = score1 +1
            jumpSound.play();
        }

        if(bulletGroup.y - boy.y > 100) {
            score1 = score1 + 1
        }

        boy.velocityY = boy.velocityY + 0.9;

        if(bulletGroup.isTouching(boy)){
            gameState = end;

        }
    }
    else if(gameState === end) {
     
        boy2 = createSprite(530,165,20,50);
        boy2.addImage("falling", boy_falling);
        boy2.scale= 0.3;
        boy.visible = false;
        ground.velocityX = 0; 
        boy.velocityY = 0;
        bulletGroup.setLifetimeEach(-1);
        bulletGroup.destroyEach();
        ghost.visible = false;
        ghost2 = createSprite(530, 90, 20, 50)
        ghost2.addImage("ghostwin", ghost_win)
        ghost2.scale = 0.4
        fill(0);
        stroke("white");
       textSize(25);
       text("Game Over! You got hit!",160,120);
       
    }
    boy.collide(invisibleGround)
    drawSprites();
   
  
}

function shootBullets() {
    if(frameCount % 60 === 0) {
        bullet = createSprite(ghost.x + 10, ghost.y+20, 20,10)
        bullet.addImage(bulletImage) 
        bullet.scale = 0.13;
        bullet.velocityX = 5+score/100;
        bullet.lifetime = 500;
        bulletGroup.add(bullet);
    } 
}