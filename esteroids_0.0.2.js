"use strict";
const renderer = PIXI.autoDetectRenderer(1200, 800);
const stage = new PIXI.Container();
const bulletTime = new TimeDiff();
let keycodes = 
{
	37:"turnleft",
	38:"thurstforward",
	39:"turnright",
	40:"thurstbackward",
	17:"fire"
};

const controlStates = 
{
	"turnleft":			false,
	"thurstforward":	false,
	"turnright":  		false,
	"thurstbackward":	false,
	"fire":				false
};
	
let background;

let bullets=[];
const rock1=[];						//köveket összetömbölni
const rock2=[];
const rock3=[];
const rock4=[];
const container=[];
const missle=[];

const rock2spawnPoint={x:0, y:0, level:0, count:0};

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
	.load(setup);
	
function rockspawn(count,level,spawnX,spawnY)
{
	switch(level)
	{
		case 1:
		{
			for(;count>0;count--)
			{
				rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock1.png"].texture));
				stage.addChild(rock1[0]);
				if(spawnX!==undefined)
				{
					rock1[0].x = spawnX;
				}
				else
				{
					rock1[0].x=Math.floor((Math.random() * 100) + 1) * 8;
				}
				if(spawnY!==undefined)
				{
					rock1[0].y = spawnY;
				}
				else
				{
					rock1[0].y=Math.floor((Math.random() * 100) + 1) * 8;
				}
				rock1[0].vx=Math.floor((Math.random() * 10) - 5) / 3;		
				rock1[0].vy=Math.floor((Math.random() * 10) - 5) / 3;
				rock1[0].pivot.x=30;
				rock1[0].pivot.y=30;
				rock1[0].level=1;
				rock1[0].size=30;
			}
		}break;
		case 2:
		{
			for(;count>0;count--)
			{
				rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock2.png"].texture));
				stage.addChild(rock1[0]);
				if(spawnX!==undefined)
				{
					rock1[0].x = spawnX;
				}
				else
				{
					rock1[0].x=Math.floor((Math.random() * 100) + 1) * 8;
				}
				if(spawnY!==undefined)
				{
					rock1[0].y = spawnY;
				}
				else
				{
					rock1[0].y=Math.floor((Math.random() * 100) + 1) * 8;
				}
				rock1[0].vx=Math.floor((Math.random() * 10) - 5) / 3;		
				rock1[0].vy=Math.floor((Math.random() * 10) - 5) / 3;
				rock1[0].vrot=Math.random() * 0.1 - 0.05;
				rock1[0].pivot.x=30;
				rock1[0].pivot.y=30;
				rock1[0].level=2;
				rock1[0].size=15;
			}
		}break;
		case 3:
		{
			for(;count>0;count--)
			{
				rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock3.png"].texture));
				stage.addChild(rock1[0]);
				if(spawnX!==undefined)
				{
					rock1[0].x = spawnX;
				}
				else
				{
					rock1[0].x=Math.floor((Math.random() * 100) + 1) * 8;
				}
				if(spawnY!==undefined)
				{
					rock1[0].y = spawnY;
				}
				else
				{
					rock1[0].y=Math.floor((Math.random() * 100) + 1) * 8;
				}
				rock1[0].vx=Math.floor((Math.random() * 10) - 5) / 3;		
				rock1[0].vy=Math.floor((Math.random() * 10) - 5) / 3;
				rock1[0].vrot=Math.random() * 0.1 - 0.05;
				rock1[0].pivot.x=30;
				rock1[0].pivot.y=30;
				rock1[0].level=3;
				rock1[0].size=7;
			}
		}break;
		case 4:
		{
			for(;count>0;count--)
			{
				rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock4.png"].texture));
				stage.addChild(rock1[0]);
				if(spawnX!==undefined)
				{
					rock1[0].x = spawnX;
				}
				else
				{
					rock1[0].x=Math.floor((Math.random() * 100) + 1) * 8;
				}
				if(spawnY!==undefined)
				{
					rock1[0].y = spawnY;
				}
				else
				{
					rock1[0].y=Math.floor((Math.random() * 100) + 1) * 8;
				}
				rock1[0].vx=Math.floor((Math.random() * 10) - 5) / 3;		
				rock1[0].vy=Math.floor((Math.random() * 10) - 5) / 3;
				rock1[0].vrot=Math.random() * 0.1 - 0.05;
				rock1[0].pivot.x=30;
				rock1[0].pivot.y=30;
				rock1[0].level=4;
				rock1[0].size=3;
			}
		}break;
	}
	rock2spawnPoint.x = 0;
	rock2spawnPoint.y = 0;
	rock2spawnPoint.level = 0;
	rock2spawnPoint.count = 0;
}
  
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
{					//initial position
	background = new PIXI.Sprite(PIXI.loader.resources["space.png"].texture);		//initial placement
	stage.addChild(background);
	
	rockspawn(3,1);	// spawnx , spawny, count , level
	
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

function controlPlayer()
{
	
	if(controlStates["turnleft"])
	{
		player.rotation -= 0.08;
	}
	if(controlStates["turnright"])
	{
		player.rotation += 0.08;
	}
	if(controlStates["thurstforward"])
	{
		player.vx += Math.cos(player.rotation)/4;
		player.vy += Math.sin(player.rotation)/4;  
	}
	if(controlStates["thurstbackward"])
	{
		player.vx -= Math.cos(player.rotation)/4;
		player.vy -= Math.sin(player.rotation)/4;  
	}
	if(controlStates["fire"])
	{
		if(bulletTime.hasElapsed())
		{
			bullets.unshift(new PIXI.Sprite(PIXI.loader.resources["bullet.png"].texture));
			stage.addChild(bullets[0]);
			bullets[0].pivot.x = 5;
			bullets[0].pivot.y = 5;
			bullets[0].x=player.x+player.vx+Math.cos(player.rotation) * 12.5 ;
			bullets[0].y=player.y+player.vy+Math.sin(player.rotation) * 12.5 ;
			bullets[0].vx=player.vx+Math.cos(player.rotation) * 10;
			bullets[0].vy=player.vy+Math.sin(player.rotation) * 10;
			bullets[0].size=5;
		}			 
	}
}

function play() 
{						//game loop 
	controlPlayer();
	entityTravel(player);
	bullets.forEach(bulletTravel);
	bullets = bullets.filter(bulletDestruct);
	rock1.forEach(rockTravel);
	container.forEach(bulletTravel);
	missle.forEach(missleTravel);
}
function entityTravel(movingOne)
{
    movingOne.x += movingOne.vx;
    movingOne.y += movingOne.vy;
    movingOne.rotation += movingOne.vrot;
    if(movingOne.x>=1200)
		movingOne.x=1;
	if(movingOne.y>=800)
		movingOne.y=1;
	if(movingOne.x<=0)
		movingOne.x=1199;
	if(movingOne.y<=0)
		movingOne.y=799;
}
function bulletTravel(actualBullet)				//translation resolve
{
	actualBullet.x += actualBullet.vx;
	actualBullet.y += actualBullet.vy;
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
function rockTravel(actualRock,i,t)			
{
	if(t[i].garbage==true)					//garbage collection
	{
		t.splice(i,1);
	}
	actualRock.x += actualRock.vx;			//translation resolve
	actualRock.y += actualRock.vy;
	if(actualRock.x>=1200)					//mirror spawn
		actualRock.x=1;
	if(actualRock.y>=800)
		actualRock.y=1;
	if(actualRock.x<=0)
		actualRock.x=1199;
	if(actualRock.y<=0)
		actualRock.y=799;
	
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
	if(actualBullet.x >= 1200 || actualBullet.x <= 0 || actualBullet.y >= 800 || actualBullet.y <= 0 || actualBullet.garbage)
	{
		stage.removeChild(actualBullet);
        actualBullet.garbage=true;
		if(t[i].garbage==true)					//garbage collection
		{
			t.splice(i,1);
		}
		return false;
	}
	inspectBullet = i;
	rock1.forEach(rockDestruct);
	return true;
}

function inDistance(obj1,obj2)
{
	let eqX,eqY,eqD;
	eqX=(obj1.x-obj2.x) * (obj1.x-obj2.x);
	eqY=(obj1.y-obj2.y) * (obj1.y-obj2.y);
	eqD=Math.sqrt(eqX+eqY);
	return eqD<obj1.size+obj2.size;
}