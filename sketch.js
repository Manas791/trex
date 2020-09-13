var cloudgo,gameove,g2,o1,o2,o3,o4,o5,o6,rset,tr,tc;
var trex,ground,invisibleground,hifi,hyper,playerscore,gamestate,gameover,reset;
var highsky,obstacle,select
playerscore=0;
  gamestate="play"
function preload(){
cloudgo=loadImage( "cloud.png");
gameove=loadImage( "gameOver.png");
g2=loadImage( "ground2.png");
o1=loadImage( "obstacle1.png");
o2=loadImage( "obstacle2.png");
o3=loadImage( "obstacle3.png");                  
o4=loadImage( "obstacle4.png");       
o5=loadImage( "obstacle5.png");
o6=loadImage( "obstacle6.png");
rset=loadImage( "restart.png");
tr=loadAnimation( "trex1.png","trex3.png","trex4.png");
tc=loadAnimation("trex_collided.png");

}
function setup(){
createCanvas(600,200);
trex = createSprite(50,180,20,50);
trex.addAnimation("trex",tr);
trex.addAnimation("trex_collided",tc);
  trex.scale=0.5;
 ground = createSprite(200,180,400,20);
ground.addImage(g2);

 invisibleground = createSprite(200,190,400,10);
invisibleground.visible=false


//trex.debug=true
//trex.setCollider("circle",0,0,40)

 hifi = createGroup();
 hyper = createGroup();
 

 gameover = createSprite(200,100)
gameover.addImage(gameove);
 reset = createSprite(200,155)
reset.addImage(rset);
gameover.visible=false;
reset.visible=false;
}
  
function draw() {
background("white");
text(playerscore,330,40);
if (gamestate=="play") {
ground.velocityX=-(6+playerscore/100);

playerscore=playerscore+Math.round(frameCount/100);
if (playerscore%100==0&& playerscore>0) {
//playSound("sound://category_points/vibrant_game_collect_jewel_1_down.mp3");
    
}

if (keyDown("space")&& trex.y>150 ) {
 trex.velocityY=-12  
//playSound("sound://category_explosion/puzzle_game_break_magic_02.mp3");
}
if (ground.x<0) {
ground.x=ground.width/2 
}
cloud();
cactus();

if (trex.isTouching(hyper)) {
//playSound("sound://category_male_voiceover/game_over_male.mp3");
trex.changeAnimation("trex_collided",tc);
gamestate="end";


  }
}
  else if (gamestate=="end"){
  ground.velocityX=0
hyper.destroyEach()
hifi.destroyEach()
hyper.setVelocityXEach(0);
hifi.setVelocityXEach(0);
 hyper.setLifetimeEach(-1);
hifi.setLifetimeEach(-1);
 //trex. velocitX=0;
//trex.velocityY=0;
 
 gameover.visible=true;
 reset.visible=true;
if (mousePressedOver(reset)) {
gamestate="play"; 
 trex.changeAnimation("trex",tr); 
 reset.visible=false;
  gameover.visible=false;  
playerscore=0
  
}
 }
  trex.velocityY=trex.velocityY+0.5
 
  trex.collide(invisibleground);
  drawSprites();
  

 
  
}
function cloud(){
if (frameCount%60==0) {
  

 highsky=createSprite(600,Math.round(random(80,120)),10,10);

highsky.addImage(cloudgo);
highsky.velocityX=-(6+playerscore/100);
highsky.lifetime=210
hifi.add(highsky);
    
}
}
function cactus(){
if (frameCount%120==0) {
 obstacle = createSprite(600,165,10,10);
obstacle.scale=0.4;
 select = Math.round(random(1,6))
switch (select){
  case 1:obstacle.addImage(o1);
break;    
case 2:obstacle.addImage(o2);
break;   
case 3:obstacle.addImage(o3);
break;
case 4:obstacle.addImage(o4);
break;
case 5:obstacle.addImage(o5);
break;
case 6:obstacle.addImage(o6);
break;
default:break;}
obstacle.velocityX=-(6+playerscore/100);
obstacle.depth=trex.depth
trex.depth=trex.depth+1
obstacle.lifetime=210
hyper.add(obstacle);
    
}  
}