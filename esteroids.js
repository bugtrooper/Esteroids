"use strict";
const renderer = PIXI.autoDetectRenderer(1200, 800);
const stage = new PIXI.Container();
const bulletTime = new TimeDiff();
const bulletLife = new TimeDiff();
let keycodes = 
{
	37:"turnleft",
	38:"thurstforward",
	39:"turnright",
	40:"thurstbackward",
	17:"fire",
    27:"escape",
    13:"enter"
};

const controlStates = 
{
	"turnleft":			false,
	"thurstforward":	false,
	"turnright":  		false,
	"thurstbackward":	false,
	"fire":				false,
    "escape":           false,
    "enter":            false
};

const menuControlStates = 
{
	"turnleft":			false,
	"thurstforward":	false,
	"turnright":  		false,
	"thurstbackward":	false,
	"fire":				false,
    "escape":           false,
    "enter":            false
};
let annotation=[];	
let background=[];
let scoreBoard;
let menuSelector = 0;
let menuItem=[];
let bullets=[];
const rock1=[];						//köveket összetömbölni
const container=[];
const missle=[];

const rock2spawnPoint={x:0, y:0, level:0, count:0};

let score=0;

let player; 						//init
let state;
let inspectBullet;
	
document.body.appendChild(renderer.view);

PIXI.loader							//init
	.add("space.png")
	.add("player.png")
	.add("bullet.png")
	.add("rock1.png")
	.add("rock2.png")
	.add("rock3.png")
	.add("rock4.png")
	.add("trap_container.png")
	.add("trap_rocket.png")
    .add("esteroids_starscape.png")
    .add("esteroids_starscape.json")
	.load(setup);
  
function keyDownHandler(keydownEvent)
{
	keydownEvent.preventDefault();
	controlStates[keycodes[keydownEvent.keyCode]]=true;	
} 
 
function keyUpHandler(keyupEvent)
{
	keyupEvent.preventDefault();
	controlStates[keycodes[keyupEvent.keyCode]]=false;	
}



function setup () 
{	
    randomBackground();
	
	rockspawn(3,1);	// spawnx , spawny, count , level
    
        
    scoreBoard = new PIXI.Text("Score:", {font:"50px  Courier New", fill:"red"});
    stage.addChild(scoreBoard);
	
	player = new PIXI.Sprite(PIXI.loader.resources["player.png"].texture);
	player.x = 96; 
	player.y = 96; 
	player.pivot.x = 32;
	player.pivot.y = 32;
	player.rotation = 0;
	player.vx = 0;
	player.vy = 0;
	player.vrot = 0;
	stage.addChild(player);
	
	window.addEventListener("keydown",keyDownHandler);
	window.addEventListener("keyup",keyUpHandler);
    
	window.addEventListener("keyup",controlMenu);

  //Set the game state
	state = play;
 
  //Start the game loop
	let kaki=true;
	gameLoop();
}

function gameLoop()
{
  //Loop this function 60 times per second
	requestAnimationFrame(gameLoop);

  //Update the current game state
	state();

  //Render the stage
	renderer.render(stage);
}

function play() 
{						//game loop 
	controlPlayer();
	entityTravel(player);
    bullets.forEach(entityTravel);
    rock1.forEach(entityTravel);
	bullets = bullets.filter(bulletDestruct);
	rock1.forEach(rockTravel);
	missle.forEach(missleTravel);
    if(bulletLife.hasElapsed())
        {
            bullets.forEach(bulletDevouer);
        }
    scoreUpdate();    
}

function pause()
{
    pauseOutput();
}

function scoreUpdate()
{
    scoreBoard.setText("Score:" + score);
}

function missleTravel(actualMissle)				//translation resolve
{
	actualMissle.x += actualMissle.vx;
	actualMissle.y += actualMissle.vy;
	const targetDir = Math.atan2((player.y-actualMissle.y),(player.x-actualMissle.x));	//Seeking AI
	actualMissle.rotation=Math.atan2((player.y-actualMissle.y),(player.x-actualMissle.x));	
	if(actualMissle.rotation>targetDir)
		actualMissle.rotation-=0.001;
	if(actualMissle.rotation<targetDir)
		actualMissle.rotation+=0.001;
	actualMissle.vx=Math.cos(actualMissle.rotation)*3;		//velocity correction
	actualMissle.vy=Math.sin(actualMissle.rotation)*3;
}
    
function bulletDevouer(actualBullet)
{
    if(actualBullet.life===0)
        {
            stage.removeChild(actualBullet);
            actualBullet.garbage=true;
        }
    actualBullet.life--;        
}
function rockTravel(actualRock,i,t)			
{
	if(t[i].garbage===true)					//garbage collection
	{
		t.splice(i,1);
	}
	if(rock2spawnPoint.level!=0)						// spawning if needed
		{
			rockspawn(rock2spawnPoint.count,rock2spawnPoint.level,rock2spawnPoint.x,rock2spawnPoint.y);
		}
}
function rockDestruct(actualRock)		//collision and destruction
{
	let i; 
	if(bullets[inspectBullet].garbage!==true && inDistance(actualRock,bullets[inspectBullet]))
	{
        score += 5;
		if(actualRock.level===1)
		{
			rock2spawnPoint.x=actualRock.x;
			rock2spawnPoint.y=actualRock.y;
			rock2spawnPoint.level=2;
			rock2spawnPoint.count=2;
		}
		if(actualRock.level===2)
		{
			rock2spawnPoint.x=actualRock.x;
			rock2spawnPoint.y=actualRock.y;
			rock2spawnPoint.level=3;
			rock2spawnPoint.count=2;
		}
		if(actualRock.level===3)
		{
			rock2spawnPoint.x=actualRock.x;
			rock2spawnPoint.y=actualRock.y;
			rock2spawnPoint.level=4;
			rock2spawnPoint.count=2;
		}
		actualRock.garbage=true;		
		stage.removeChild(actualRock);	
		stage.removeChild(bullets[inspectBullet]);
        bullets[inspectBullet].garbage=true;
		
		i=Math.floor((Math.random() * 10));
		if(0) 								//spawning
		{
			container.unshift(new PIXI.Sprite(PIXI.loader.resources["trap_container.png"].texture));
			stage.addChild(container[0]);
			container[0].x=rock2spawnPoint.x;
			container[0].y=rock2spawnPoint.y;
			container[0].vx=Math.floor((Math.random() * 10) - 5) / 12;		
			container[0].vy=Math.floor((Math.random() * 10) - 5) / 12;	
			container[0].rotation=Math.floor((Math.random() * 180));
			
			missle.unshift(new PIXI.Sprite(PIXI.loader.resources["trap_rocket.png"].texture));
			stage.addChild(missle[0]);
			missle[0].x=rock2spawnPoint.x;
			missle[0].y=rock2spawnPoint.y;
			missle[0].rotation=container[0].rotation;
			missle[0].vx=Math.cos(missle[0].rotation)*3;		
			missle[0].vy=Math.sin(missle[0].rotation)*3;
			missle[0].pivot.x=20;
			missle[0].pivot.y=20;
		}		
	}	
}

function bulletDestruct(actualBullet,i,t)				//destruction upon boundary quitting
{		
	inspectBullet = i;
	rock1.forEach(rockDestruct);
	return true;
}