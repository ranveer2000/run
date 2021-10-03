var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;
var mylogo,mylogoimg;
var intro;
var huh;
var play,how,cred,logo;
var playimg,howimg,credimg,logoimg;
var theme,menu,die;
var back1,back1img,back2,back2img;
//Game States
var PLAY=2;
var END=0;
var NO = 1;
var gameState=1;
var ANI1 = 3;
var ANI2= 4;
var NOPE=5;
var menuState=3;
function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  mylogoimg = loadImage("mylogo.png");
  intro = loadSound("intro.mp3");
  playimg = loadImage("play.png");
  howimg = loadImage("how.png");
  credimg = loadImage("cred.png");
  logoimg = loadImage("logo.png");
  theme = loadSound("theme.mp3");
  back1img = loadImage("credi.png");
  back2img = loadImage("howto.png");
  menu = loadSound("menu.mp3")
  die = loadSound("die.mp3");
}

function setup(){
  
//create a canvas

// createCanvas(window,window);
 createCanvas(windowWidth,windowHeight);
// createCanvas(width,height);
// createCanvas(200,200);

// Moving background

path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4;
path.visible=false;

//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.visible=false;
  
mylogo=createSprite(width+200,height/2)
mylogo.addImage(mylogoimg);
mylogo.velocityX=-width/150;

logo = createSprite(width/2,height/4/2)
logo.addImage(logoimg);
logo.visible= false;

play = createSprite(width/2,height/2.5)
play.addImage(playimg);
play.visible= false;

how = createSprite(width/2,height/1.7)
how.addImage(howimg);
how.visible= false;

cred = createSprite(width/2,height/1.27)
cred.addImage(credimg);
cred.visible= false;

back1 = createSprite(width/2,height/2,windowWidth,windowHeight);
back1.addImage(back1img);
back1.scale = 1.35;
back1.visible= false;

back2 = createSprite(width/2,height/2,windowWidth,windowHeight);
back2.addImage(back2img);
back2.scale = 1.35;
back2.visible= false;
  
huh = createSprite(-400,height/2,1,height);

cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background(255);
  drawSprites();
  if(mylogo.isTouching(huh)){
    intro.play();
    huh.destroy();
    mylogo.destroy();
    menu.loop();
    menuState=ANI2;
  }
  if(menuState===ANI2){
    logo.visible=true;
    play.visible=true;
    how.visible=true;
    cred.visible=true;
    if(mousePressedOver(play)){
      menu.stop();
      logo.visible=false;
    play.visible=false;
    how.visible=false;
    cred.visible=false;
    menuState=NOPE;
    path.visible = true;
    boy.visible=true;
    gameState= PLAY;
    theme.loop();
    }
    if(mousePressedOver(cred)){
back1.visible=true;
    }
    if(mousePressedOver(how)){
      back2.visible=true;
          }
          
  }
  if(keyDown("BACKSPACE")){
    menuState=ANI2;
    treasureCollection = 0;
    back1.visible = false;
    back2.visible=false;
    gameState = NO;
    boy.visible=false;
    path.visible= false;
    play.visible=true;
how.visible= true;
cred.visible=true;
logo.visible=true;
theme.stop();
menu.stop();
die.stop();
menu.play();
cashG.destroyEach();
jwelleryG.destroyEach();
diamondsG.destroyEach();
swordGroup.destroyEach();
  }
  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background

  // if(path.x > height ){
  //   path.x = height/2;
  // }

  // if(path.y > height ){
  //   path.x = height/2;
  // }

  // if(path.x > height ){
  //   path.y = height;
  // }

   if(path.y > height ){
     path.y = height/2;
   }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection=treasureCollection + 50;
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection=treasureCollection + 100;
      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection= treasureCollection + 150;
      
    }else{
      if(swordGroup.isTouching(boy)) {
        gameState=END;
        
        theme.stop();

        die.play();

        boy.addAnimation("SahilRunning",endImg);
        boy.x=width/2;
        boy.y=height/2;
        boy.scale=0.6;
        
        cashG.destroyEach();
        diamondsG.destroyEach();
        jwelleryG.destroyEach();
        swordGroup.destroyEach();
        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        jwelleryG.setVelocityYEach(0);
        swordGroup.setVelocityYEach(0);
     
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Treasure: "+ treasureCollection,width-150,30);
  }
}

function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}