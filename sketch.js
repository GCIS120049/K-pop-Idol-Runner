START=1;
PLAY=2;
END=3;
INSTRUCTIONS=4;
var gameState = 1;
var coins,score;
var logoImg,logo;
var startImg,start;
var howImg,how;
var rules,rulesImg;
var x,xImg;
var player,playerImg;
var musicImg,music,musicGroup;
var alien,alien1,alien2,alien3,alien4,alienGroup;
var canvas2;
var coin,coinImg,coinGroup;
var sound;
var ques,quesImg,quesGroup;
var gameOverImg,gameOver;
var restart,restartImg;
var s;
var cp;
var die;
var bg1,bg2,bg3,bg4;

function preload(){

	logoImg=loadImage("logo.png");
	startImg=loadImage("start.png");
	howImg=loadImage("how.png");
	rulesImg=loadImage("rules2.png");
	xImg=loadImage("x.png");
	playerImg=loadImage("woman.png");
	musicImg=loadImage("music.png");
	alien1=loadImage("alien1.png");
	alien2=loadImage("alien2.png");
	alien3=loadImage("alien3.png");
	alien4=loadImage("alien4.png");
	coinImg=loadImage("coin.png");
	quesImg=loadImage("question.png");
	sound=new Audio("Lovesick Girls - BLACKPINK.mp3");
	s=new Audio("2017-04-14_-_Happy_Dreams_-_David_Fesliyan.mp3");
	die=new Audio("die.mp3");
	cp=new Audio("checkpoint.mp3");
	gameOverImg=loadImage("gameover.png");
	restartImg=loadImage("restart.png");
	bg1=loadImage("2.jpg");
	bg2=loadImage("3.jpg");
	bg3=loadImage("4.jpg")
	bg4=loadImage("1.jpg");
	
	}

function setup() {
  var canvas =createCanvas(1275, 600);
  canvas2= createSprite(637.5,300,450,600);
  canvas2.shapeColor="Purple";

  musicGroup=new Group();
  alienGroup=new Group();
  coinGroup=new Group();
  quesGroup=new Group();
	
  logo=createSprite(637.5,100);
  logo.addImage(logoImg);
 //logo.scale=1.1;

  start=createSprite(637.5,350);
  start.addImage(startImg);
  start.scale=0.3;

  how=createSprite(637.5,500,300,100);
  how.addImage(howImg);
  how.scale=0.7;

  rules=createSprite(637.5,300);
  rules.addImage(rulesImg);
  rules.scale=1.01;

  x=createSprite(1200,50);
  x.addImage(xImg);
  x.scale=0.3;

  player=createSprite(650,550);
  player.addImage(playerImg);
  player.scale=0.15;
  //player.debug=true;
  player.setCollider("rectangle",-100,0,500,1200);

  gameOver=createSprite(637.5,200);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.1;

  restart=createSprite(637.5,450);
  restart.addImage(restartImg);
  restart.scale=0.2;

  score = 0;

  coins=0;
}



function draw() {
  rectMode(CENTER);
  background(255);

   if(gameState===START){

	   s.play();

	   //canvas2.shapeColor="purple";
	   canvas2.addImage(bg1);
	   
	   background(255);
	   player.visible=false;
	   x.visible=false;
	   rules.visible=false;
	   logo.visible=true;
	   start.visible=true;
	   how.visible=true;
	   gameOver.visible=false;
	   restart.visible=false;
	 
	 if(mousePressedOver(start)){
		 gameState=PLAY;
	 }

	 if(mousePressedOver(how)){
		 gameState=INSTRUCTIONS;
	 }
	
	}else if(gameState===INSTRUCTIONS){
		canvas2.addImage(bg2);

		x.visible=true;
		rules.visible=true;
		logo.visible=false;
		start.visible=false;
		how.visible=false;
		player.visible=false;
		gameOver.visible=false;
		restart.visible=false;

		if(mousePressedOver(x)){
			gameState=START;
		}

	}else if(gameState===PLAY){

		canvas2.addImage(bg3);

		s.pause();

		canvas2.shapeColor="deepPink";
		background(255);
		x.visible=false;
		rules.visible=false;
		logo.visible=false;
		start.visible=false;
		how.visible=false;
		player.visible=true;
		gameOver.visible=false;
		restart.visible=false;
		
		sound.play();
		if(sound.currentTime>201){
			sound.pause();
			sound=new Audio("Dynamite - BTS.mp3");
			sound.play();
		}
		
		
		textSize(30);
		fill(0);
		stroke("pink");
		strokeWeight(3);
		text("Coins:"+coins,870,100);

		score = score + Math.round(getFrameRate()/60);
		textSize(30);
		fill(0);
		stroke("pink");
		strokeWeight(3);
		text("Score:"+score,870,50);

		if(player.x===650){
			if(keyDown("right")){
				player.x=800;
			}

			if(keyDown("left")){
				player.x=500;
			}
		}

		if(player.x===800 && keyDown("left")){
			player.x=650;
		}

		if(player.x===500 && keyDown("right")){
			player.x=650;
		}

		if(player.isTouching(musicGroup)){
			cp.play();
			coins=coins+3;
			musicGroup.destroyEach();
		}else{
			cp.pause();
		}

		if(player.isTouching(alienGroup)){
			die.play();
			//alienGroup.destroy();
			//coinGroup.destroy();
			//musicGroup.destroy();
			//quesGroup.destroy();
			gameState=END;
		}else{
			die.pause();
		}

		if(player.isTouching(coinGroup)){
			cp.play();
			coinGroup.destroyEach();
			coins=coins+30;
		}else{
			cp.pause();
		}

		if(player.isTouching(quesGroup)){
			cp.play();
			quesGroup.destroyEach();
			ra=Math.round(random(1,2));

			if(ra==1){
				score=score*2;
			}else if(ra==2){
				score=score/2;
			}
		}else{
			cp.pause();
		}


		Music();
		Alien();
		coinP();
		quesP();
		//playSound();

}else if(gameState==END){

	background(255);
	//canvas2.shapeColor=rgb(0, 21, 61);
	canvas2.addImage(bg4);

	x.visible=false;
	rules.visible=false;
	logo.visible=false;
	start.visible=false;
	how.visible=false;
	player.visible=false;
	gameOver.visible=true;
	restart.visible=true;

	sound.pause();

	textSize(30);
	fill("pink");
	stroke(0);
	strokeWeight(10);
	text("Score:"+score,880,50);
	text("Coins:"+coins,880,100);

	if(mousePressedOver(restart)){
		gameState=START;
	}


}
  
  drawSprites();
 
}

function Music(){
	if(frameCount%100===0){
		music=createSprite(650,0);
		music.addImage(musicImg);
		music.scale=0.065;
		music.velocityY=3+score/500;
		music.lifetime=180;
		//music.debug=true;
		music.depth=player.depth;
		player.depth=player.depth+1;

		musicGroup.add(music);
		var r = Math.round(random(1,3));

		if(r==1){
			music.x=650;
		}

		if(r==2){
			music.x=500;
		}

		if(r==3){
			music.x=800;
		}
    }
}

function Alien(){
	if(frameCount%200===0){
		alien=createSprite(650,0);

		var lane=Math.round(random(1,3));
		
		if(lane==1){
			alien.x=500;
		}else if(lane==2){
			alien.x=650;
		}else if(lane==3){
			alien.x=800;
		}

		var rand=Math.round(random(1,4));

		if(rand==1){
			alien.addImage(alien1);
		}else if(rand==2){
			alien.addImage(alien2);
	    }else if(rand==3){
			alien.addImage(alien3);
		}else{
			alien.addImage(alien4);
		}

		alien.scale=0.4;
		alien.velocityY=3+score/500;
		alien.lifetime=180;
		alienGroup.add(alien);

		alien.depth=player.depth;
		player.depth=player.depth+1;
	}
}

function coinP(){
	if(frameCount%1600===0){
		coin=createSprite(650,0);
		coin.addImage(coinImg);
		coin.scale=1.5;
		coin.velocityY=3+score/500;

		var l=Math.round(random(1,3));
		
		if(l==1){
			coin.x=500;
		}else if(l==2){
			coin.x=650;
		}else if(l==3){
			coin.x=800;
		}

		coin.lifetime=150;
		coinGroup.add(coin);

		coin.depth=player.depth;
		player.depth=player.depth+1;
	}
	
}
function quesP(){
	if(frameCount%2000===0){
		ques=createSprite(650,0);
		ques.addImage(quesImg);
		ques.scale=0.07;
		//stroke(0);
		ques.velocityY=3+score/500;

		var la=Math.round(random(1,3));
		
		if(la==1){
			ques.x=500;
		}else if(la==2){
			ques.x=650;
		}else if(la==3){
			ques.x=800;
		}

		ques.lifetime=150;
		quesGroup.add(ques);

		ques.depth=player.depth;
		player.depth=player.depth+1;

		
		
		
		
	}
}
