var player, playerRunning, playerJumpping, playerFlying, playerStope;
var ground,groundImg,invisibleGround, bg,bgImg;
var canvas;
var obstacle,obstaclesGroup, ob1,ob2,ob2,ob4, ob1Img,ob2Img,ob3Img,ob4Img;
var tree,treesGroup, tree1,tree2,tree3, tree1Img,tree2Img,tree3Img;
var sun, sunImg;
var sanitizer, sanitizerGroup, sanitizerImg;
var rocket, rocketsGroup, rocketImg;
var score;
var lifes = 3;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var restart, restartImg;
var pointSound, gameoverSound, rocketSound, jumpSound;
localStorage["HighestScore"] = 0;


function preload(){
  playerRunning = loadAnimation("playerRun1.png", "playerRun2.png", "playerRun3.png");
  playerJumpping = loadAnimation("player3.png");
  playerStope = loadAnimation("playerRun1.png");
  playerFlying = loadAnimation("playerFlying.png");

  groundImg = loadImage("road.png");
  bgImg = loadImage("bgImage3.png");
  sunImg = loadImage("sun.png");

  sanitizerImg = loadImage("sanitizer.png");
  restartImg = loadImage("restart.png");
  rocketImg = loadImage("rocket.png");

  ob1Img = loadImage("ob1.png");
  ob2Img = loadImage("ob2.png");
  ob3Img = loadImage("ob3.png");
  ob4Img = loadImage("ob4.png");

  tree1Img = loadImage("tree1.png");
  tree2Img = loadImage("tree2.png");
  tree3Img = loadImage("tree3.png");

  pointSound = loadSound("point.mp3");
  gameoverSound = loadSound("gameover.mp3");
  rocketSound = loadSound("rocketSound.mp3");
  jumpSound = loadSound("jump.mp3");

}

function setup() {
canvas = createCanvas(1000,500);

sun = createSprite(500,150,10,10);
sun.addImage(sunImg);
sun.scale = 0.08

bg = createSprite(0,150,1000,500);
bg.addImage(bgImg);
bg.scale = 0.6

ground = createSprite(500,450,1400,1400);
ground.addImage(groundImg);
ground.scale = 1.5

player = createSprite(150,380,20,20);
player.addAnimation("Running", playerRunning);
player.addAnimation("jumping",playerJumpping);
player.addAnimation("stop",playerStope);
player.addAnimation("flying",playerFlying);
player.setCollider("rectangle", 0,0, 40, 120);

obstaclesGroup = createGroup();
treesGroup = createGroup();
sanitizersGroup = createGroup();
rocketsGroup = createGroup();
 
invisibleGround = createSprite(100,450,500,20);
invisibleGround.shapeColor="red"
invisibleGround.visible = false;

restart = createSprite(500, 250);
restart.addImage(restartImg);
restart.scale = 0.5;
restart.visible = false;

score = 0;

}

function draw() {
  background("#4CB6FF");

  fill("black");
  textSize(40);
  text("Score: "+ score, 800,50);

  fill("black");
  textSize(40);
  text("Lifes: "+ lifes, 800,100);

  fill("black");
  textSize(22);
  text("Press up arrow key to jump : ", 10,20);


  if(gameState === PLAY)
  {
    ground.velocityX = -4;
    bg.velocityX = -2;

  if (ground.x < 400)
  {
    ground.x = ground.width/2;
  }
  if (bg.x < 0)
  {
    bg.x = bg.width/4;
  }
  




  if(player.y < 200){
    player.velocityY = player.velocityY + 1.5
    }


  if(keyDown("UP_ARROW") && player.y > 330){
     player.changeAnimation("jumping",playerJumpping)
     player.velocityY = -15; 
  }


  if((player.velocityY > 0) && player.y > 350){
  player.changeAnimation("Running", playerRunning);
  }


  if (player.isTouching(rocketsGroup))
  {
    score = score + 10;
    rocketsGroup[0].destroy();
    rocketSound.play();

    player.changeAnimation("flying",playerFlying);
    player.position.y = 250;
    player.velocityY = +0.4;
  }



  //camera.position.x = player.x+400;
  //camera.position.y = player.y-125;
  player.collide(invisibleGround);
 
 
  if (player.isTouching(obstaclesGroup))
  {
    gameoverSound.play();
    lifes = lifes-1;
    gameState=END;
  }
    
  if (player.isTouching(sanitizersGroup))
  {
    score = score + 1;
    sanitizersGroup[0].destroy();
    pointSound.play();
  }

  spawnobstacles()
  spawntrees()
  spawnsanitizers()
  spawnrocket()

} 
  else if (gameState === END)
{
  restart.visible=true;
  player.changeAnimation("stop",playerStope);
  ground.velocityX = 0;
  bg.velocityX = 0;
  player.velocityY=0;
  obstaclesGroup.setLifetimeEach(-1);
  sanitizersGroup.setLifetimeEach(-1);
  treesGroup.setLifetimeEach(-1);
  rocketsGroup.setLifetimeEach(-1);

  obstaclesGroup.destroyEach();
  sanitizersGroup.destroyEach();
  treesGroup.destroyEach();
  rocketsGroup.destroyEach();

  if (mousePressedOver(restart)) {
    if (lifes > 0) {
      reset();
    }
 }
}
drawSprites()
}

function spawnobstacles()
{

  if (frameCount % 60 === 0){
    var obstacle = createSprite(1200,450,10,40);
     obstacle.velocityX = -(6 + score/20);
     obstacle.y = Math.round(random(400,450));
     var rand = Math.round(random(1,4));
     switch(rand) {
       case 1: obstacle.addImage(ob1Img);
               obstacle.scale = 0.15;
               break;
       case 2: obstacle.addImage(ob2Img);
               obstacle.scale = 0.15;
               break;
       case 3: obstacle.addImage(ob3Img);
               obstacle.scale = 0.12;
               break;
       case 4: obstacle.addImage(ob4Img);
               obstacle.scale = 0.12;
               break;
       default: break;
     }


     obstacle.lifetime = 800;
     obstaclesGroup.add(obstacle);
  }
}

function spawntrees()
{
  if (frameCount % 300 === 0){
    var tree = createSprite(1400,240,10,40);
     tree.velocityX = -3;
     var rand = Math.round(random(1,3));
     switch(rand) {
       case 1: tree.addImage(tree1Img);
               tree.scale = 0.7;
               tree.position.y = 260;
               break;
       case 2: tree.addImage(tree2Img);
               tree.scale = 0.8;
               tree.position.y = 275;
               break;
       case 3: tree.addImage(tree3Img);
               tree.scale = 0.7;
               tree.position.y = 260;
               break;
       default: break;
     }
     tree.lifetime = 800;
     treesGroup.add(tree);
     player.depth=tree.depth;
     player.depth=player.depth+1;
  }
 
}

function spawnsanitizers()
{
  if (frameCount % 80 === 0){
    var sanitizer = createSprite(1400,240,10,40);
    sanitizer.velocityX = -5;
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: sanitizer.addImage(sanitizerImg);
               break;
       case 2: sanitizer.addImage(sanitizerImg);
               break;
       default: break;
     }

     sanitizer.scale = 0.2;
     sanitizer.lifetime = 800;
     sanitizersGroup.add(sanitizer);
  }
}

function reset() {

  gameState = PLAY;
  restart.visible = false;

  obstaclesGroup.destroyEach();
  sanitizersGroup.destroyEach();

  player.changeAnimation("Running", playerRunning);
  player.y = 380;

  if (localStorage["HighestScore"] < score) {
    localStorage["HighestScore"] = score;
  }

  score = 0;
 
}

function spawnrocket()
{
  if (frameCount % 250 === 0){
    var rocket = createSprite(1400,100,10,10);
    rocket.velocityX = -8;
     var rand = Math.round(random(1,2));
     switch(rand) {
       case 1: rocket.addImage(rocketImg);
               break;
       case 2: rocket.addImage(rocketImg);
               break;
       default: break;
     }

     rocket.scale = 0.3;
     rocket.lifetime = 800;
     rocketsGroup.add(rocket);
  }
}
