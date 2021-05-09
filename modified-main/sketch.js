var migrant;
var obstacle1, obstacle2, obstacle3;
var ground, groundImage;
var backgroundImg;
var migrantImg;
var obstacleGroup;
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var gameOver, reset;




function preload(){
 
 backgroundImg = loadImage("Morning Landscape.jpg");
groundImage = loadImage("ground2.png");
  migrantImg= loadImage("migrant.png");
  obstacle1 = loadImage("snakeObstacle.png");
  obstacle2 = loadImage("stoneObstacle.png");
  obstacle3 = loadImage("grenadeObstacle.png");
  resetImg = loadImage("reset.png");
gameOverImg = loadImage("gameOver.png");
  
}

function setup() {
  createCanvas(1440, 700);
  
  migrant = createSprite(200,645);
  migrant.addImage(migrantImg);
  migrant.scale = 0.3;
  
  ground = createSprite(600,650,1440,20);
  ground.addImage("ground", groundImage);
  ground.x = ground.width /2;
  
  
invisibleGround = createSprite(600,665,1440,20);
invisibleGround.visible = false;

  
  obstaclesGroup = new Group();
  
  score = 0;

  gameOver = createSprite(720,350);
  gameOver.addImage(gameOverImg);
  
  reset = createSprite(720,370);
  reset.addImage(resetImg);
  
  gameOver.scale = 0.7;
  restart.scale = 0.7;

  gameOver.visible = false;
  reset.visible = false;
}

function draw() {

  background(backgroundImg);
  textSize (20);
  fill ("black")
  text("Score: "+ score, 100,50);

  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    ground.velocityX = -4;

    if (ground.x < 100){
      ground.x = ground.width/2;
    }
    if(keyDown(UP_ARROW)&& migrant.y>=500) {
      migrant.velocityY = -10;
    }
    
    migrant.velocityY = migrant.velocityY + 0.8
    console.log(ground.x);
    migrant.collide(invisibleGround);
  
  spawnObstacles();
  if(obstaclesGroup.isTouching(migrant)){
    gameState = END;
}
  }
  else if (gameState === END) {
    gameOver.visible = true;
    reset.visible = true;
    

    ground.velocityX = 0;
    migrant.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(reset)) {
      restart();
    }
  }

  drawSprites();  
}


function spawnObstacles() {
  if(frameCount % 100 === 0) {
    var obstacle = createSprite(1440, 645);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 400;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function restart(){
  gameState = PLAY;
  gameOver.visible = false;
  reset.visible = false;
  
  obstaclesGroup.destroyEach();

  
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }  
  score = 0;
  
}