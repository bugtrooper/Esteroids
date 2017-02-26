"use strict";
const renderer = PIXI.autoDetectRenderer(1200, 800);
document.body.appendChild(renderer.view);
const stage = new PIXI.Container();
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

  let player; 						//init
  let state;
  let space;
  let bullet;
  let rock1;
  let rock2;
  let rock3;
  let rock4;
  let container;
  let missle;
  let inspectBullet;
  
  const rock2point={};				//init
 rock2point.x=0;
 rock2point.y=0;
  
function setup() {					//init
	bullet=[];
	rock1=[];
	rock2=[];
	rock3=[];
	rock4=[];
	container=[];
	missle=[];
	
	space = new PIXI.Sprite(PIXI.loader.resources["space.png"].texture);		//initial placement
	stage.addChild(space);
	
	// floating rock add
	rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock1.png"].texture));	
	stage.addChild(rock1[0]);
	rock1[0].x=Math.floor((Math.random() * 100) + 1)*8;
	rock1[0].y=Math.floor((Math.random() * 100) + 1)*6;
	rock1[0].vx=Math.floor((Math.random() * 10) - 5)/3;		
	rock1[0].vy=Math.floor((Math.random() * 10) - 5)/3;
	
		rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock1.png"].texture));
	stage.addChild(rock1[0]);
	rock1[0].x=Math.floor((Math.random() * 100) + 1)*8;
	rock1[0].y=Math.floor((Math.random() * 100) + 1)*6;
	rock1[0].vx=Math.floor((Math.random() * 10) - 5)/3;		
	rock1[0].vy=Math.floor((Math.random() * 10) - 5)/3;
	
		rock1.unshift(new PIXI.Sprite(PIXI.loader.resources["rock1.png"].texture));
	stage.addChild(rock1[0]);
	rock1[0].x=Math.floor((Math.random() * 100) + 1)*8;
	rock1[0].y=Math.floor((Math.random() * 100) + 1)*6;
	rock1[0].vx=Math.floor((Math.random() * 10) - 5)/3;		
	rock1[0].vy=Math.floor((Math.random() * 10) - 5)/3;
	
    //Create the `player` sprite 
  player = new PIXI.Sprite(PIXI.loader.resources["player.png"].texture);
  player.x = 96; 
  player.y = 96; 
  player.pivot.x = 25;
  player.pivot.y = 25;
  player.rotation = 0;
  player.vx = 0;
  player.vy = 0;
  player.vrot = 0;
  stage.addChild(player);

  container[0] = new PIXI.Sprite(PIXI.loader.resources["trap_container.png"].texture);
  container[0].x = 296; 
  container[0].y = 296;
  stage.addChild(container[0]);
    window.onkeydown = function(e) {							//player input
		e.preventDefault();
    switch (e.keyCode) {
        case 37:
			player.vrot -= 0.05;
            break;
        case 38:
            player.vx += Math.cos(player.rotation);
			player.vy += Math.sin(player.rotation);  
            break;
        case 39:
			player.vrot += 0.05;
            break;
        case 40:
			player.vx -= Math.cos(player.rotation);
			player.vy -= Math.sin(player.rotation);
            break;
		case 17:
			bullet.unshift(new PIXI.Sprite(PIXI.loader.resources["bullet.png"].texture));
			stage.addChild(bullet[0]);
				bullet[0].x=player.x+Math.cos(player.rotation)*2.5+7.5;
				bullet[0].y=player.y+Math.sin(player.rotation)*2.5-7.5;
				bullet[0].vx=Math.cos(player.rotation)*5;
				bullet[0].vy=Math.sin(player.rotation)*5;		
            break;
    }
};   
  //Set the game state
  state = play;
 
  //Start the game loop
  gameLoop();
}

function gameLoop(){

  //Loop this function 60 times per second
  requestAnimationFrame(gameLoop);

  //Update the current game state
  state();

  //Render the stage
  renderer.render(stage);
}

function play() {						//game loop

  //Use the player's velocity to make it move
  player.x += player.vx;
  player.y += player.vy;
  player.rotation += player.vrot;
  if(player.x>=1200)
		player.x=1;
	if(player.y>=800)
		player.y=1;
	if(player.x<=0)
		player.x=1199;
	if(player.y<=0)
		player.y=799;
  bullet.forEach(bulletTravel);
  bullet = bullet.filter(bulletDestruct);
  rock1.forEach(rockTravel);
  rock2.forEach(rockTravel);
  container.forEach(bulletTravel);
  missle.forEach(missleTravel);
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
	
	if(rock2point.x!=0)						// spawning if needed
		{
			rock2.unshift(new PIXI.Sprite(PIXI.loader.resources["rock2.png"].texture));
			stage.addChild(rock2[0]);
			rock2[0].x=rock2point.x;
			rock2[0].y=rock2point.y;
			rock2[0].vx=Math.floor((Math.random() * 10) - 5)/3;		
			rock2[0].vy=Math.floor((Math.random() * 10) - 5)/3;	
			
			rock2.unshift(new PIXI.Sprite(PIXI.loader.resources["rock2.png"].texture));
			stage.addChild(rock2[0]);
			rock2[0].x=rock2point.x;
			rock2[0].y=rock2point.y;
			rock2[0].vx=Math.floor((Math.random() * 10) - 5)/3;		
			rock2[0].vy=Math.floor((Math.random() * 10) - 5)/3;	
			rock2point.x=0;
		}
}
function rockDestruct(actualRock)		//collision and destruction
{
	let i;
	if((actualRock.x <= bullet[inspectBullet].x + 0 && actualRock.x >= bullet[inspectBullet].x - 60 )&&( actualRock.y <= bullet[inspectBullet].y + 0 && actualRock.y >= bullet[inspectBullet].y - 60))
	{
		stage.removeChild(bullet[inspectBullet]);
		rock2point.x=actualRock.x;
		rock2point.y=actualRock.y;
		
		actualRock.garbage=true;		
		stage.removeChild(actualRock);	
		
		i=Math.floor((Math.random() * 10));
		if(1) 								//spawning
		{
			container.unshift(new PIXI.Sprite(PIXI.loader.resources["trap_container.png"].texture));
			stage.addChild(container[0]);
			container[0].x=rock2point.x;
			container[0].y=rock2point.y;
			container[0].vx=Math.floor((Math.random() * 10) - 5)/12;		
			container[0].vy=Math.floor((Math.random() * 10) - 5)/12;	
			container[0].rotation=Math.floor((Math.random() * 180));
			
		missle.unshift(new PIXI.Sprite(PIXI.loader.resources["trap_rocket.png"].texture));
			stage.addChild(missle[0]);
			missle[0].x=rock2point.x;
			missle[0].y=rock2point.y;
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
	if(actualBullet.x >= 800 || actualBullet.x <= 0 || actualBullet.y >= 600 || actualBullet.y <= 0)
	{
		stage.removeChild(actualBullet);
		return false;
	}
	inspectBullet = i;
	rock1.forEach(rockDestruct);
	return true;
}
