var towerImg, tower;
var door, doorImg, doorsGroup;
var climber, climberImg, climbersGroup;
var ghost, ghostImg;
var invisibleBlock, invisibleBlocksGroup;
var gameState = "play";
var gameSound;

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  gameSound = loadSound("gamesound.aac");
}

function setup(){
  createCanvas(600,600);
  
  tower = createSprite(300,300);
  tower.addImage(towerImg);
  tower.velocityY = 1;
  
  ghost = createSprite(300,300);
  ghost.addImage(ghostImg);
  ghost.scale = 0.3;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlocksGroup = new Group();
}

function draw(){

  camera.x = ghost.x;
  camera.y = ghost.y;
  background(0);
  
  if(gameState === "play"){
    
  if(tower.y>600){
    tower.y = 300;
  }
  
  if(keyDown("left_arrow")){
    ghost.x = ghost.x-5;
  }
  
  if(keyDown("right_arrow")){
    ghost.x = ghost.x+5;
  }

  if(keyDown("space")){
    ghost.velocityY = -5;
  }
  ghost.velocityY = ghost.velocityY+0.8;
  
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY = 0;
  }
  
  if(invisibleBlocksGroup.isTouching(ghost) || ghost.y>600){
    ghost.destroy();
    gameState = "end";
  }
    
    //gameSound.loop();
  
  spawnDoors();
  
  drawSprites();
  }
  
  if(gameState === "end"){
    fill("green");
    textSize(30);
    text("Game Over!!!", 230,300);
  }
}

function spawnDoors(){
  if(frameCount%240 === 0){
    door = createSprite(200,-50);
    door.addImage(doorImg);
    
    door.x = Math.round(random(100,500));
    door.velocityY = 1;
    
    climber = createSprite(200,10);
    climber.addImage(climberImg);
    climber.x = door.x;
    climber.velocityY = 1;
    climber.lifetime = 700;
    ghost.depth = door.depth+1;
    
    invisibleBlock = createSprite(200,15);
    invisibleBlock.width = climber.width;
    invisibleBlock.height = 2;
    invisibleBlock.lifetime = 700;
    invisibleBlock.x = door.x;
    invisibleBlock.velocityY = 1;
    invisibleBlock.visible = false;
    
    door.lifetime = 700;
    doorsGroup.add(door);
    climbersGroup.add(climber);
    invisibleBlocksGroup.add(invisibleBlock);
  }
}