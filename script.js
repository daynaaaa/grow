/* VARIABLES */
let walls, object, screen, beginButton;
let nextObject, currentObjects;
let win;
let phase1, phase2, phase3, phase4, phase5, phase6;

/* PRELOAD LOADS FILES */
function preload(){
  phase1 = loadImage("assets/phase1.png");
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(500,500);
  screen = 0;
  
  phase1.resize(40,40);
  
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
    if(mouseX < 40)nextObject.x = 40;
    else if(mouseX > 340) nextObject.x = 340;
    else nextObject.x = mouseX;
    beginButton.visible = false;
    beginButton.collider = "n";
    nextObject.visible = true;
    
    //detect collision
    for (let i = 0; i < currentObjects.length; i++) {
      let temp = currentObjects[i];
      temp.colliding(currentObjects, collision);
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
      screen = 0;
      showScreen0();
      print("pressed");
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
  text("Use your mouse to place objects above the box. \nIf any objects touch the top line of the box the \ngame will end.", width / 2, height / 2 - 50);
  textSize(18);
  text("Hope lies in being able to grow yourself \nto reach your goals!", width / 2, height / 2 +  30);

}

function showScreen1() {
  background('#dedbd2');
  new walls.Sprite(30, 245, 3, 410);  
  new walls.Sprite(350, 245, 3, 410);
  new walls.Sprite(190, 450, 320, 3);
}

function showScreen2() {
  for (let i = 0; i < currentObjects.length; i++) {
    let temp = currentObjects[i];
    temp.visible = false;
    temp.collider = "n";
  }
  for (let i = 0; i < walls.length; i++) {
    let temp = walls[i];
    temp.visible = false;
    temp.collider = "n";
  }
  nextObject.visible = false;
  background('#dedbd2');
  fill(0);
  textSize(50);
  if(win) text("You Win!!", width / 2, height / 2 - 50);
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
        //newSprite.image = phase1;
  
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
        newSprite.sleeping = false;
        newSprite.diameter = 60;
  
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
        //nextObject.image = phase1;
        //nextObject.addImage('transparent', phase1);
        //nextObject.shapeColor = color(250, 200, 150);
        break;
      case 2:
        nextObject.color = "#f0bbb4";
        nextObject.stroke = "#d66575";
        nextObject.collider = "n";
        nextObject.diameter = 60;
        break;
      case 3:
        nextObject.color = "#e69a9c";
        nextObject.stroke = "#d66575";
        nextObject.collider = "n";
        nextObject.diameter = 80;
    }
  }
}

//handle a collision between 2 objects of the same phase
function collision(sprite1, sprite2){
  if (sprite1.diameter == sprite2.diameter) {
    let nextPhase;
    switch(sprite1.diameter) {
      case 40:
        nextPhase = {color: "#f0bbb4", diameter: 60};
        break;
      case 60:
        nextPhase = {color: "#e69a9c", diameter: 80};
        //win = true; //delete later
        break;
      case 80:
        nextPhase = {color: "#e08092", diameter: 100};
        break;
      case 100:
        nextPhase = {color: "#d66575", diameter: 120};
        break;
      case 120:
        nextPhase = {color: "#cc495c", diameter: 140};
        break;
      case 140:
        nextPhase = {color: "#c22f44", diameter: 160};
        break;
      case 160:
        nextPhase = {color: "#000000", diameter: 180};
        break;
    }
    setTimeout(() => 
      {
        if (sprite1.removed || sprite2.removed) return;
        sprite2.remove();
        sprite1.diameter = nextPhase.diameter;
        sprite1.color = nextPhase.color;
      },50);
    if(sprite1.diameter == 160){
      print("win!");
      setTimeout(() => {
          win = true;
      },800);
    }
  }
}