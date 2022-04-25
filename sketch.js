//variaveis

var trex ,trex_running, trex_collided;                                  
var solo,soloimg, soloinv ;
var cloud , cloud_png ;
var Obstacles , obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6
var score = 0 ;
var GP_obstacles;
var GP_clouds;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var gameover, gameoverimg, restart, restarimg;
var jump
var die
var checkpoint;


//funcao de carregamento de imagens e animacoes


function preload(){
  trex_running = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  soloimg= loadImage("ground2.png");
   cloud_png= loadImage("cloud.png");
   obstacle1= loadImage("obstacle1.png");
   obstacle2= loadImage("obstacle2.png");
   obstacle3= loadImage("obstacle3.png");
   obstacle4= loadImage("obstacle4.png");
   obstacle5= loadImage("obstacle5.png");
   obstacle6=loadImage("obstacle6.png");
   trex_collided=loadImage("trex_collided.png");
   gameoverimg=loadImage("gameOver.png");
   restartimg=loadImage("restart.png");
   jump=loadSound("jump.mp3");
   die=loadSound("die.mp3");
   checkpoint=loadSound("checkpoint.mp3");
  
  
  }
//funcao de configuracao de um jogo


function setup(){
  createCanvas(windowWidth,windowHeight);
  
  
  var rand = Math.round(random(10,60));
  console.log(rand);
  
  trex = createSprite(50,height-100,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("trex_collided.png",trex_collided);
  trex.scale = 0.5
  trex.x = 20
  trex.debug=false;
  trex.setCollider("circle",0,0,40);
  gameover=createSprite(width/2,height/2-50);
  gameover.addImage(gameoverimg);
  restart=createSprite(width/2,height/2); 
  restart.addImage(restartimg); 
  
  //sprite solo
  solo = createSprite(width/2,height-95,width,20);
    
  solo.addImage(soloimg);
  solo.x=width/2

 soloinv = createSprite(width/2,height-90,width,10);
 soloinv.visible = false ;

GP_obstacles=new Group();
GP_clouds=new Group();

}

//funcao de todos os elementos que se repetem dentro do jogo

function draw(){
  background("white")
  textSize(20)
  text("score:"+score,200,50);
  
  
 
 //condicional do estado de jogo PLAY
 
  if(gamestate===PLAY){
    solo.velocityX = -5;
//instrucao para redefinir o solo

if(solo.x<width/2){
  solo.x = solo.width/2;}
  
  score= score+Math.round(getFrameRate()/60);
// instrucao salto do trex
 
if(score>0&& score%100===0){

checkpoint.play();


}

if(touches.length>0 || keyDown("space") && trex.y>=height-120){
  trex.velocityY=-10;
  jump.play();
  touches=[];

}
  
  //gravidade do trex
  
  trex.velocityY=trex.velocityY+0.5
  spawnClouds();
  spawnObstacles();
   if(trex.isTouching(GP_obstacles)){
  die.play();
   
  gamestate=END

   }
  gameover.visible=false
  restart.visible=false





}


  
  
  //condicional do estado do jogo END
  
else if(gamestate===END){

    solo.velocityX=0;
    trex.velocityY=0;
    trex.changeAnimation("trex_collided.png",trex_collided);
    GP_obstacles.setVelocityXEach(0);
    GP_clouds.setVelocityXEach(0);
    GP_clouds.setLifetimeEach(-1);
    GP_obstacles.setLifetimeEach(-1);

    gameover.visible=true;
   restart.visible=true;
  
  }
 
 
 
  
//instrucao de colisao do trex

trex.collide(soloinv);

//instrucao para redefinir o solo

if(touches.length>0 || mousePressedOver(restart)){

  reset ()
  touches=[];


}






drawSprites();
}

//funcao de spawnar nuvens

function spawnClouds(){
if(frameCount%60===0){



  cloud=createSprite(width+20,height-300,40,10);
  cloud.velocityX = -3
 cloud.y= Math.round(random(10,60));
 cloud.addImage(cloud_png);
  cloud.lifetime=width/cloud.velocityX;
 trex.depth = cloud.depth ;
  trex.depth = trex.depth+1 ;
  GP_clouds.add(cloud);
  

}
 //cloud=createSprite(610,100,40,10);
//cloud.velocityX = -3
}




//funcao de spawnar obstacles

function spawnObstacles(){

if(frameCount%60===0){

Obstacles=createSprite(width+20,height-98,10,40);

Obstacles.velocityX = -5 




//declaracao de troca das imagens do obstaculo para sair de forma aleatoria

var rand=Math.round(random(1,6)); 
 switch(rand){
  
  case 1 : Obstacles.addImage(obstacle1);
  break;
  case 2 : Obstacles.addImage(obstacle2);
break;
case 3 : Obstacles.addImage(obstacle3);
break;
case 4 : Obstacles.addImage(obstacle4);
break;
case 5 : Obstacles.addImage(obstacle5);
break;
case 6 : Obstacles.addImage(obstacle6);
break;
default:break ;

 }

Obstacles.scale=0.5
Obstacles.lifetime=width/Obstacles.velocityX;
GP_obstacles.add(Obstacles);




}

}

function reset(){

gamestate=PLAY 
GP_obstacles.destroyEach()
GP_clouds.destroyEach()
trex.changeAnimation("running", trex_running)
score=0



}

