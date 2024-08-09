/* VARIABLES */
let walls, object, screen, beginButton, demo, demoSprite, display;
let nextObject, currentObjects;
let win;
let phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8;

/* PRELOAD LOADS FILES */
function preload(){
  phase1 = loadImage("assets/phase1.png");
  phase2 = loadImage("assets/phase2.png");
  phase3 = loadImage("assets/phase3.png");
  phase4 = loadImage("assets/phase4.png");
  phase5 = loadImage("assets/phase5.png");
  phase6 = loadImage("assets/phase6.png");
  phase7 = loadImage("assets/phase7.png");
  phase8 = loadImage("assets/phase8.png");
  demo = loadImage("assets/demos.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(500,500);
  screen = 0;
  
  phase1.resize(40,40);
  phase2.resize(60,60);
  phase3.resize(80,80);
  phase4.resize(100,100);
  phase5.resize(120,120);
  phase6.resize(140,140);
  phase7.resize(160,160);
  phase8.resize(180,180);
  demoSprite = new Sprite(430, 260, 60, 500, "n");
  demoSprite.image = demo;
  demoSprite.visible = false;

  display = new Group();
  
  walls = new Group();
  walls.color = "#4a5759";
  walls.stroke = "#4a5759";
  walls.collider = "s";
  
  currentObjects = new Group();
  
  nextObject = new Sprite(200,30,80,30); 
  nextObject.color = "#f7e1d7";
  nextObject.stroke = "#d66575";
  nextObject.collider = "k";
  nextObject.text = "Click to begin";
  nextObject.visible = false;
  
  world.gravity.y = 50;
  beginButton = new Sprite(width / 2, height / 2 + 100, 100, 50, 'kinematic');
  win = false;
  
  new walls.Sprite(250,500,500,1,"s");
  new walls.Sprite(0,250,1,500,"s");
  new walls.Sprite(500,250,1,500,"s");
  walls[0].visible = false;
  walls[1].visible = false;
  walls[2].visible = false;
  
  let arr = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8]
  for(let i = 0; i < random(3, 5); i++){
    let temp = Math.floor(random(8));;
    new display.Sprite(random(50, 450), random(30, 300), 0, 0, "d")
    print(temp);
    display[i].diameter = (temp+1)*20 + 15;
    display[i].image = arr[temp];
    //display[i].vel.y = random(-10,-5);
    display[i].overlaps(beginButton);
  }
  
}

/* DRAW LOOP REPEATS */
function draw() {
  textAlign(CENTER);
  textSize(20);
  noStroke();
  
  ms = millis();
  //print("screen: "+screen);
  
  //Splash Screen
  if(screen == 0){
    win = false;
    background('#f7e1d7');
    //new display.Sprite(30, 30, 30, 30, "d")
    //display[0].image = phase1;
    for (let i = 0; i < display.length; i++) {
      if(display[i].mouse.pressing()){
        display[i].x = mouseX; display[i].y = mouseY;
      }
    }
    
    beginButton.color = "#edafb8";
    beginButton.stroke = "#edafb8";
    showScreen0();
    if (beginButton.mouse.pressing()) {
      //delay(2000);
      showScreen1();
      screen = 1;
    }
  }


  //game screen
  if(screen == 1){
    background('#dedbd2');
    if(mouseX < 35+nextObject.w/2) nextObject.x = 30+nextObject.w/2;
    else if(mouseX > 345-nextObject.w/2) nextObject.x = 345-nextObject.w/2;
    else nextObject.x = mouseX;
    beginButton.visible = false;
    beginButton.collider = "n";
    nextObject.visible = true;
    for (let i = 0; i < display.length; i++) {
      display[i].visible = false;
      display[i].collider = "n";
    }
    
    //detect collision
    for (let i = 0; i < currentObjects.length; i++) {
      let temp = currentObjects[i];
      temp.colliding(currentObjects, collision);
      if(temp.y < 20){
        screen = 2;
        showScreen2();
        break;
      }
    }
    if(win){
      screen = 2;
      showScreen2();
    }
  }

  //win/lose screen
  if(screen == 2){
    beginButton.visible = true;
    beginButton.text = "Play Again";
    beginButton.collider = "k";
    //print(beginButton.mouse.pressing());
    if (beginButton.mouse.pressing()) {
      /*let arr = [phase1, phase2, phase3, phase4, phase5, phase6, phase7, phase8]
      for(let i = 0; i < random(3, 5); i++){
        let temp = Math.floor(random(8));;
        new display.Sprite(random(50, 450), random(30, 300), 0, 0, "d")
        print("againnn");
        display[i].diameter = (temp+1)*20 + 15;
        display[i].image = arr[temp];
        display[i].vel.y = random(5,10);
        display[i].overlaps(beginButton);
        display[i].visible = true;
      }*/
      screen = 0;
      showScreen0();
      win = false;
      
    }
  }

}

/* FUNCTIONS */
function showScreen0(){
  background('#f7e1d7');
  beginButton.textSize = 20;
  beginButton.text = "Begin";
  fill(0);
  textSize(50);
  text("grow", width / 2, height / 2 - 130);
  textSize(15);
  textStyle(NORMAL);
  text("Strategically merge matching plants to create \nlarger plants. Can you make an avocado?", width / 2, height / 2 - 100);
  textStyle(ITALIC);
  text("Use your mouse to place plants. \nIf any plants touch the top of the box the \ngame will end.", width / 2, height / 2 - 50);
  textSize(18);
  text("Hope lies in being able to grow yourself \nto reach your goals!", width / 2, height / 2 +  30);
  demoSprite.visible = false;

}

function showScreen1() {
  background('#dedbd2');
  new walls.Sprite(30, 245, 3, 410);  
  new walls.Sprite(350, 245, 3, 410);
  new walls.Sprite(190, 450, 320, 3);
  demoSprite.visible = true;
}

function showScreen2() {
  
  demoSprite.visible = false;
  for (let i = 0; i < currentObjects.length; i++) {
    let temp = currentObjects[i];
    temp.visible = false;
    temp.collider = "n";
  }
  for (let i = 3; i < walls.length; i++) {
    let temp = walls[i];
    temp.visible = false;
    temp.collider = "n";
  }
  nextObject.visible = false;
  background('#dedbd2');
  fill(0);
  textSize(50);
  if(win) text("You Win!!!", width / 2, height / 2 - 50);
  else text("You Lose :((", width / 2, height / 2 - 50);
}

function mouseClicked(){
  //print('(x, y) = (' + mouseX + ' , ' + mouseY + ')');
  if(screen == 1){
    nextObject.text = "";
  
    //make a new sprite of the previous object and drop it
    let newSprite;
    switch(object){
      case 1:
        newSprite = new Sprite(nextObject.x, 30);
        newSprite.color = "#f7e1d7";
        newSprite.diameter = 40;
        newSprite.image = phase1;
        newSprite.stroke = "#d66575";
        newSprite.collider = "d";
        newSprite.sleeping = false;
        //newSprite.friction = 0.5;
        newSprite.restitution = 0;
        currentObjects.add(newSprite);
        break;
      case 2:
        newSprite = new Sprite(nextObject.x, 30);
        newSprite.color = "#f0bbb4";
        newSprite.diameter = 60;
        newSprite.image = phase2;
        newSprite.stroke = "#d66575";
        newSprite.collider = "d";
        newSprite.sleeping = false;
        //newSprite.friction = 0.5;
        newSprite.restitution = 0;
        currentObjects.add(newSprite);
        break;
      case 3:
        newSprite = new Sprite(nextObject.x, 30);
        newSprite.color = "#e69a9c";
        newSprite.diameter = 80;
        newSprite.image = phase3;
        newSprite.stroke = "#d66575";
        newSprite.collider = "d";
        newSprite.sleeping = false;
        //newSprite.friction = 0.5;
        newSprite.restitution = 0;
        currentObjects.add(newSprite);
    }
  
    //generate random object
    let objects = [1,2,3];
    object = random(objects);
    print(object);
    //change the look of the next object
    switch(object){
      case 1:
        nextObject.color = "#f7e1d7";
        nextObject.stroke = "#d66575";
        nextObject.collider = "n";
        nextObject.diameter = 40;
        nextObject.image = phase1;
        //nextObject.addImage('transparent', phase1);
        //nextObject.shapeColor = color(250, 200, 150);
        break;
      case 2:
        nextObject.color = "#f0bbb4";
        nextObject.stroke = "#d66575";
        nextObject.collider = "n";
        nextObject.diameter = 60;
        nextObject.image = phase2;
        break;
      case 3:
        nextObject.color = "#e69a9c";
        nextObject.stroke = "#d66575";
        nextObject.collider = "n";
        nextObject.diameter = 80;
        nextObject.image = phase3;
    }
  }
}

//handle a collision between 2 objects of the same phase
function collision(sprite1, sprite2){
  if (sprite1.diameter == sprite2.diameter) {
    let nextPhase;
    switch(sprite1.diameter) {
      case 40:
        nextPhase = {color: "#f0bbb4", diameter: 60, image: phase2};
        break;
      case 60:
        nextPhase = {color: "#e69a9c", diameter: 80, image: phase3};
        //win = true; //delete later
        break;
      case 80:
        nextPhase = {color: "#e08092", diameter: 100, image: phase4};
        break;
      case 100:
        nextPhase = {color: "#d66575", diameter: 120, image: phase5};
        break;
      case 120:
        nextPhase = {color: "#cc495c", diameter: 140, image: phase6};
        break;
      case 140:
        nextPhase = {color: "#c22f44", diameter: 160, image: phase7};
        break;
      case 160:
        nextPhase = {color: "#000000", diameter: 180, image: phase8};
        break;
    }
    setTimeout(() => 
      {
        if (sprite1.removed || sprite2.removed) return;
        sprite2.remove();
        sprite1.diameter = nextPhase.diameter;
        sprite1.color = nextPhase.color;
        sprite1.image = nextPhase.image;
      },50);
    if(sprite1.diameter == 160){
      print("win!");
      setTimeout(() => {
          win = true;
      },1000);
    }
  }
}