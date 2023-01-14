var bg,bgImg;
var player, shooterImg, shooter_shooting;
var heart1, heart2, heart3
var heart1Img, heart2Img, heart3Img
var zombieGroup, ZombieImg
var bullets = 10
var gameState = "fight"
var win ,lose,explosion
var life=3
var score=0


function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  heart1Img = loadImage("assets/heart_1.png")
  heart2Img = loadImage("assets/heart_2.png")
  heart3Img = loadImage("assets/heart_3.png")
  ZombieImg = loadImage("assets/zombie.png")
  win = loadSound("assets/win.mp3")
  lose = loadSound("assets/lose.mp3")
  explosion = loadSound("assets/explosion.mp3")

  bgImg = loadImage("assets/bg.jpeg")

}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
   heart1 = createSprite(displayWidth-280,40, 20,20)
   heart1.visible = false
   heart1.addImage("heart1",heart1Img)
   heart1.scale = 0.5
   heart2 = createSprite(displayWidth-200,40, 20,20)
   heart2.visible = false
   heart2.addImage("heart2",heart2Img)
   heart2.scale = 0.5
   heart3 = createSprite(displayWidth-280,40, 20,20)
   heart3.visible = false
   heart3.addImage("heart3",heart3Img)
   heart3.scale = 0.5
   zombieGroup = new Group()
   bulletGroup = new Group()
   
   


}

function draw() {
  background(0);
  if(gameState==="fight"){
    if(life===3)
    {
      heart3.visible = true
      heart1.visible = false
      heart2.visible = false
    }
    if(life===2)
    {
      heart2.visible = true
      heart1.visible = false
      heart3.visible = false
    }
    if(life===1)
    {
      heart1.visible = true
      heart3.visible = false
      heart2.visible = false
    }
    if(life===0){
      gameState="lost"
    }
    if(score===100){
      gameState="won"
      win.play()
    }
    
  }





  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
  bullet= createSprite(displayWidth-1150,player.y-30,20,20)
  bullet.velocityX= 30
  bulletGroup.add(bullet)
  player.depth= bullet.depth
  player.depth=player.depth+1
  player.addImage(shooter_shooting)
  bullets=bullets-1
  
}
else if(keyWentUp("space")){
 
  player.addImage(shooterImg)

 
}
if(bullets===0){
  gameState="bullet"
  lose.play()
}
if(zombieGroup.isTouching(bulletGroup)){
  {for(var i=0;i<zombieGroup.length;i++)
    {
      if(zombieGroup[i].isTouching(bulletGroup)){
        zombieGroup[i].destroy()
        bulletGroup.destroyEach()
        explosion.play()
        score=score+10
      }
    }
}
}
//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(player))
{lose.play()
  for(var i=0;i<zombieGroup.length;i++)
{
  if(zombieGroup[i].isTouching(player)){
    zombieGroup[i].destroy()
    life=life-1
  }
}
}
enemy()
drawSprites();
textSize(25)
fill("white")
text("bullets="+bullets,displayWidth-210,displayHeight/2-250)
text("score="+score,displayWidth-200,displayHeight/2-220)
text("lives="+life,displayWidth-200,displayHeight/2-280)
if(gameState== "lost"){
  textSize(100)
  fill("yellow")
  text("you lost",400.400)
  zombieGroup.destroyEach()
    player.destroy()
  
}
else if(gameState== "won"){
  textSize(100)
  fill("blue")
  text("you won",400.400)
  zombieGroup.destroyEach()
    player.destroy()
  
}
else if(gameState== "bullet"){
  textSize(100)
  fill("red")
  text("you ran out of bullet",473.410)
  zombieGroup.destroyEach()
    player.destroy()
  bulletGroup.destroyEach()
}
}

function enemy(){
  if(frameCount%50===0){
    zombie=createSprite(random(599,2000),random(100,600),40,40)
    zombie.addImage(ZombieImg)
    zombie.scale= 0.15
    zombie.velocityX= -6
    zombie.lifetime= 400
    zombieGroup.add(zombie)
  }
}