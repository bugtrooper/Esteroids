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
                rock1[0].vrot=Math.random() / 20 - 0.025;
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
                rock1[0].vrot=Math.random() / 20 - 0.025;
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
                rock1[0].vrot=Math.random() / 20 - 0.025;
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
                rock1[0].vrot=Math.random() / 20 - 0.025;
			}
		}break;
	}
	rock2spawnPoint.x = 0;
	rock2spawnPoint.y = 0;
	rock2spawnPoint.level = 0;
	rock2spawnPoint.count = 0;
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
            bullets[0].vrot=0;
			bullets[0].size=5;
            bullets[0].garbage=false;
            bullets[0].life=2;
            score--;
		}			 
	}
    if(menuControlStates.escape===true)
	{
		state=pause;
        menuItem.unshift(new PIXI.Text("return",{font:"50px Arial", fill:"red"}));
        stage.addChild(menuItem[0]);
        menuItem[0].x=200;
        menuItem[0].y=200;
        menuItem.unshift(new PIXI.Text("settings",{font:"50px Arial", fill:"yellow"}));
        stage.addChild(menuItem[0]);
        menuItem[0].x=200;
        menuItem[0].y=400;
        menuItem.unshift(new PIXI.Text("back to main",{font:"50px Arial", fill:"yellow"}));
        stage.addChild(menuItem[0]);
        menuItem[0].x=200;
        menuItem[0].y=600;
        menuControlStates.escape=false;
	}
}

function controlMenu(keyupEvent)
{
    keyupEvent.preventDefault();
	if(keyupEvent.keyCode===38)
	{
        menuControlStates[keycodes[keyupEvent.keyCode]]=true;	
	}
	if(keyupEvent.keyCode===40)
	{
        menuControlStates[keycodes[keyupEvent.keyCode]]=true;	
	}
    if(keyupEvent.keyCode===27)
	{
        menuControlStates[keycodes[keyupEvent.keyCode]]=true;	
	}
}

function pauseOutput()
{
    if(menuControlStates.thurstforward===true)
        {
            menuSelector--;
            menuControlStates.thurstforward=false;
        }
       
    if(menuControlStates.thurstbackward===true)
        {
            menuSelector++;
            menuControlStates.thurstbackward=false;
        }
    if(menuSelector===0)
        menuSelector=3;
    if(menuSelector===4)
        menuSelector=1;
     switch(menuSelector)
            {
                case 1:
                menuItem[2].setStyle({font:"50px Arial", fill:"red"});
                menuItem[1].setStyle({font:"50px Arial", fill:"yellow"});
                menuItem[0].setStyle({font:"50px Arial", fill:"yellow"});
                    break;
                case 2:
                menuItem[2].setStyle({font:"50px Arial", fill:"yellow"});
                menuItem[1].setStyle({font:"50px Arial", fill:"red"});
                menuItem[0].setStyle({font:"50px Arial", fill:"yellow"});
                    break;
                case 3:
                menuItem[2].setStyle({font:"50px Arial", fill:"yellow"});
                menuItem[1].setStyle({font:"50px Arial", fill:"yellow"});
                menuItem[0].setStyle({font:"50px Arial", fill:"red"});
                    break;
            }
    if(menuControlStates.escape===true)
        {
            menuControlStates.escape=false;
            state=play;
            stage.removeChild(menuItem[2]);
            stage.removeChild(menuItem[1]);
            stage.removeChild(menuItem[0]);
        }
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

function inDistance(obj1,obj2)
{
	let eqX,eqY,eqD;
	eqX=(obj1.x-obj2.x) * (obj1.x-obj2.x);
	eqY=(obj1.y-obj2.y) * (obj1.y-obj2.y);
	eqD=Math.sqrt(eqX+eqY);
	return eqD<obj1.size+obj2.size;
}
function randomBackground()
{
    let i;
    let j;
    let k;
    for(i=0;i<800;i+=80)
        {
            for(j=Math.floor(Math.random() * 400);j<1200;j+=80+Math.floor(Math.random() * 400))
                {
                    k = Math.floor(Math.random() * 7);
                    background.unshift(new PIXI.Sprite(PIXI.loader.resources["esteroids_starscape.json"].textures["esteroids_starscape "+k+".png"]));
                    background[0].x=j;
                    background[0].y=i;
                }
        }
    for(i=0;i<3;i++)
        {
            k = Math.floor(Math.random() * 7 + 9);
            background.unshift(new PIXI.Sprite(PIXI.loader.resources["esteroids_starscape.json"].textures["esteroids_starscape "+k+".png"]));
            background[0].x=Math.floor(Math.random() * 1200);
            background[0].y=Math.floor(Math.random() * 800);
        }
    background.forEach(backgroundPlotter);
}

function backgroundPlotter(actualItem)
{
    stage.addChild(actualItem);
}