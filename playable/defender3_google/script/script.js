
var gameFunc = function() {	
	var CROSSBOW_WIDTH = 56;
    var CROSSBOW_HEIGHT = 77;
    var ARROW_WIDTH = 64;
    var ARROW_HEIGHT = 8;
    var PROGRESS_BAR_WIDTH = 167;
    var PROGRESS_BAR_HEIGHT = 26;
    var PROGRESS_WIDTH = 24;
    var PROGRESS_HEIGHT = 30;
//     var BEETLE_WIDTH = 58;
//     var BEETLE_HEIGHT = 48;
// 	var RABBIT_WIDTH = 107;
// 	var RABBIT_HEIGHT = 70;
// 	var MONSTER_WIDTH = 96;
// 	var MONSTER_HEIGHT = 86;
// 	var DRAGON_WIDTH = 98;
// 	var DRAGON_HEIGHT = 117;
// 	var FLAME_WIDTH = 100;
// 	var WARNING_WIDTH = 256;
// 	var WARNING_HEIGHT = 64;
// 	var WARNING_BAR_UNIT_WIDTH = 38;
// 	var WARNING_BAR_UNIT_HEIGHT = 18;
	var INSTALL_WIDTH = 170;
    var INSTALL_HEIGHT = 69;
    var CIRCLE_HEIGHT = 44;
	
	var preGame = {
		sWidth:480,
		sHeight:320,
		scale:1,
		rotated:false,
		width:480,
		height:320,
		castle:75,
		diffX:0,
		diffY:0,
		progress:52,
	    goal:36,
	    hp:1000,
	};

	var gameInfo = {
		touched:false,
	    paused:false,
	    tutorial:true,
	    tutorialShown:false,
	    counter:1,
	    gameover:false,
	    coin:0,
		angle:0,
	    kills:0,
	    currentHp:preGame.hp,
	    enemyTypes:1,
	    end:false,
	};

//     var FPS = 30;
//     var INTERVAL = 1000/FPS;
//     var STEP = INTERVAL/1000;
//     var timer = 0;
//     var arrows = [];
//     var enemies = [];
//     var arrowTick = 30;
    var bowLevel = 1;
    var levelFre = [1.5,2.5,3.5];
    var levelCoins = [10,20,80];
//     var dragonScale = 1.5; 
//     var l10n = {
// 	    tutorial: [
// 	        'Tap on the enemies to shoot!'
// 	    ] 
// 	};

// 	var enemyImages = {
//     	beetle: {
//     		run: beetleRun,
//     		attack: beetleAttack,
//     		death: beetleDeath, 
// 	    },
// 	    rabbit: {
// 		    run: rabbitRun,
// 		    attack: rabbitAttack,
// 		    death: rabbitDeath,
// 	    },
// 	    monster: {
// 		    run: monsterRun,
// 		    attack: monsterAttack,
// 		    death: monsterDeath,
// 	    }
//     };
//     var types = {
//     	beetle:0,
//     	rabbit:1,
//     	monster:2
//     }
	

	function drawBG(){
		drawImage(preGame.bgLayer,bgImage.src, 0, 0);
	}

	function drawCoin(){
		drawImage(preGame.uiLayer, coinImage.src, 138, 20);
		gameInfo.currentCoin = preGame.uiLayer.text(''+gameInfo.coin).font({fill: '#ffffff',family: 'Cooper',});
		myText(gameInfo.currentCoin, 14, 163, 26);
	}
	function drawLogo(){
		gameInfo.logo = drawImage(preGame.uiLayer, logoImage.src, preGame.sWidth-90, preGame.sHeight-54);
	}

	function drawInstallButton(){
		gameInfo.install = drawImage(preGame.uiLayer, installButtonImage.src,(preGame.sWidth-INSTALL_WIDTH*0.7)/2,2.5);//install按钮
		myScare(gameInfo.install, 0.7, 0.7);
		gameInfo.install.off('click').click(function() {
		  redictAd();
		});
	}

	function drawProgress() {//游戏进度条
        drawImage(preGame.uiLayer, progressBarImage.src, preGame.sWidth-PROGRESS_BAR_WIDTH-8, 8);
    	gameInfo.progressObj = drawImage(preGame.uiLayer, progressImage.src, preGame.sWidth-PROGRESS_WIDTH-125*gameInfo.counter/preGame.progress-25, 3);
    }

	function drawGameHp(){
		drawImage(preGame.uiLayer, hpBarImage.src, CIRCLE_HEIGHT+1, preGame.sHeight-36);
		gameInfo.hpfill = drawImage(preGame.uiLayer, hpFillImage.src, CIRCLE_HEIGHT, preGame.sHeight-36);
		drawImage(preGame.uiLayer, hpCircleImage.src, 8, preGame.sHeight-CIRCLE_HEIGHT-8);
		drawImage(preGame.uiLayer, hpAddImage.src, 19, preGame.sHeight-40);
		gameInfo.hptext = preGame.uiLayer.text(gameInfo.currentHp  + '/' +  preGame.hp).font({fill: '#ffffff',family: 'Cooper',});
		myText(gameInfo.hptext, 10, 95, preGame.sHeight-29);
	}

	function drawWeapon(){
		gameInfo.weapon = drawImage(preGame.gameLayer, crossbowImage[0].src, -20,preGame.sHeight/2-CROSSBOW_HEIGHT/2);//弓
		gameInfo.displayArrow = drawImage(preGame.gameLayer, arrowImage.src, -17, preGame.sHeight/2-ARROW_HEIGHT/2);//显示箭
	}

   function drawUpgradeBow(){
	   	if(typeof gameInfo.upgradeGroup === 'undefined'){
	   		gameInfo.upOpacity = 0;
			gameInfo.upOpacityAnim = 0.06;
	   		gameInfo.upgradeGroup = preGame.uiLayer.group();
	   		myMove(gameInfo.upgradeGroup, 8, 8);
	   		drawImage(gameInfo.upgradeGroup, upgradeBowImage.src, 0, 0);
	   		drawImage(gameInfo.upgradeGroup, coinImage.src, 51, 12);
			gameInfo.upbow = drawImage(gameInfo.upgradeGroup, crossIcon[0].src, 13, 4);
			gameInfo.coinText = gameInfo.upgradeGroup.text(''+levelCoins[bowLevel-1]).font({fill: 'red',family: 'Cooper',});
			myText(gameInfo.coinText, 14, 78, 18);
			gameInfo.upgradeRect = drawImage(gameInfo.upgradeGroup, upgradeMask.src, 0, 0).style({opacity:gameInfo.upOpacity});

	   	}else{
	   		if(gameInfo.coin >= levelCoins[bowLevel-1]){
	        	gameInfo.upgradeRect.show();
	        	gameInfo.upOpacity = gameInfo.upOpacity+gameInfo.upOpacityAnim;
	    		if(gameInfo.upOpacity < 0 || gameInfo.upOpacity > 0.8){
	    			gameInfo.upOpacityAnim = -gameInfo.upOpacityAnim;
	    		}
	    		gameInfo.upgradeRect.style({opacity:gameInfo.upOpacity});
	    		gameInfo.coinText.font({fill: '#ffffff',family: 'Cooper',});
	        }else{
	        	gameInfo.upgradeRect.hide();
	        }
	   	}

	    gameInfo.upgradeGroup.off('click').click(function() {
	  		upgradeBow();
		});
    }

	function drawPre(){
		preGame.bgLayer = SVG('bg').size(preGame.width, preGame.height);
		preGame.uiLayer = SVG('ui').size(preGame.width, preGame.height);
		preGame.gameLayer = SVG('game').size(preGame.width, preGame.height);//svg
		drawBG();
		drawCoin();
		drawInstallButton();
		drawLogo();
		drawProgress();
		drawGameHp();
		drawWeapon();
		//drawUpgradeBow();
		// createEnemy(1);
		// gameInfo.tenemy = enemies[0]
		// gameInfo.tenemy.x = 360;
		// gameInfo.tenemy.y = 150;
	}

//     function createEnemy(num){//怪
//     	enemyType = 0;
//     	if(gameInfo.enemyTypes == 2){ 
// 			enemyType = 1;
//     	}

//     	if(gameInfo.enemyTypes == 3){
// 			enemyType = 2;
//     	}
//     	for (var i = enemies.length - 1; i >= 0; i--) {
//     		enemy = enemies[i];
//     		if(!enemy.shown && enemyType === types[enemy.type]){
//     			switch(enemyType){
// 		    		case 0:
// 						enemy.y=Math.random()*(preGame.sHeight-BEETLE_HEIGHT-62)+40;
// 						enemy.currentHp=50;
// 			    		break;
// 			    	case 1:
// 						enemy.y=Math.random()*(preGame.sHeight-RABBIT_HEIGHT-62)+40;
// 						enemy.currentHp=120;
// 			    		break;
// 					case 2:
// 						enemy.y=Math.random()*(preGame.sHeight-MONSTER_HEIGHT-62)+40;
// 						enemy.currentHp=250;
// 						break;
// 		    	}
// 		    	for (var j = enemy.monster.length - 1; j >= 0; j--) {
// 		    		enemy.monster[j].hide();
// 		    	}
// 				enemy.x=preGame.sWidth;
// 		    	enemy.stance='run';
// 				enemy.stanceFrame=0;
// 				enemy.stanceFrames=enemyImages[enemy.type]['run'].length;
// 				enemy.monster=enemy.run;
// 				enemy.animTick=0;
// 				enemy.attackTick=0;
// 				enemy.hpbar.show();
// 		    	enemy.hpfill.show();
// 		    	enemy.shadow.show();
// 		    	enemy.hpfill.move(1,1);
// 		    	myScare(enemy.hpfill,1,1,1,1);
// 		    	enemy.shown=true;
// 		    	num--;
// 		    	if(num <= 0){
// 		    		break;
// 		    	}
//     		}
//     	}

//     	for (var j = num - 1; j >= 0; j--) {
//     		var group = preGame.gameLayer.group().hide();
// 	    	var monster = [];
// 	    	switch(enemyType){
//     		case 0:
//     			for (var i = 0; i <= enemyImages['beetle']['run'].length - 1; i++) {
//     				monster[i] = drawImage(group,enemyImages['beetle']['run'][i].src).move(0,0).hide();
//     			}
//     			enemies.push({
// 	    			type:'beetle',
// 	    			x:preGame.sWidth,
// 	    			y:Math.random()*(preGame.sHeight-BEETLE_HEIGHT-62)+40,
// 	    			speed:preGame.sWidth/(1000/150),
// 	    			stance:'run',
// 	    			stanceFrame:0,
// 	    			stanceFrames:4,
// 	    			hp:50,
// 	    			currentHp:50,
// 	    			attack:30,
// 	    			width:BEETLE_WIDTH,
// 	    			height:BEETLE_HEIGHT,
// 	    			animTick: 0,
// 				    attackTick: 0,
// 				    attackFre: 2,
// 	    			hpbar:drawImage(group,monsterHpBarImage.src,0,0),
// 					hpfill:drawImage(group,monsterHpBarFillImage.src,1,1),
// 					monster:monster,
// 					group:group,
// 					shown:true,
// 					run:monster,
// 	    		});
// 	    		break;
// 	    	case 1:
// 	    		for (var i = 0; i <= enemyImages['rabbit']['run'].length - 1; i++) {
// 					monster[i] = drawImage(group,enemyImages['rabbit']['run'][i].src).move(0,0).hide();
// 				}
// 				enemies.push({
// 	    			type:'rabbit',
// 	    			x:preGame.sWidth,
// 	    			y:Math.random()*(preGame.sHeight - RABBIT_HEIGHT-62)+40,
// 	    			speed:preGame.sWidth/(1000/150),
// 	    			stance:'run',
// 	    			stanceFrame:0,
// 	    			stanceFrames:6,
// 	    			hp:120,
// 	    			currentHp:120,
// 	    			attack:30,
// 	    			width:RABBIT_WIDTH,
// 	    			height:RABBIT_HEIGHT,
// 	    			animTick: 0,
// 				    attackTick: 0,
// 				    attackFre: 1.5,
// 	    			hpbar:drawImage(group,monsterHpBarImage.src,0,0),
// 					hpfill:drawImage(group,monsterHpBarFillImage.src,1,1),
// 					monster:monster,
// 					group:group,
// 					shown:true,
// 					run:monster,
// 	    		});
// 	    		break;
// 			case 2:
// 				for (var i = 0; i <= enemyImages['monster']['run'].length - 1; i++) {
// 					monster[i] = drawImage(group,enemyImages['monster']['run'][i].src).move(0,0).hide();
// 				}
// 				enemies.push({
// 					type:'monster',
// 					x:preGame.sWidth,
// 					y:Math.random()*(preGame.sHeight - MONSTER_HEIGHT-62)+40,
// 					speed:preGame.sWidth/(1000/150),
// 					stance:'run',
// 					stanceFrame:0,
// 					stanceFrames:6,
// 					hp:250,
// 					currentHp:250,
// 					attack:30,
// 					width:MONSTER_WIDTH,
// 					height:MONSTER_HEIGHT,
// 					animTick: 0,
// 				    attackTick: 0,
// 				    attackFre: 1,
// 					hpbar:drawImage(group,monsterHpBarImage.src,0,0),
// 					hpfill:drawImage(group,monsterHpBarFillImage.src,1,1),
// 					monster:monster,
// 					group:group,
// 					shown:true,
// 					run:monster,
// 				});
// 				break;
// 	    	}
//     	}
    	
// 	}

// 	function adjust(eI) {
//     	var enemy = enemies[eI];
//     	var x = 0;
//     	var y = 0;
//     	switch (enemy.type) {
// 		    case 'beetle':
// 			    x = -8;
// 			    y = 0;
// 		        break;
// 	        case 'rabbit':
// 	    		x = -25;
// 			    y = -10;
// 		    break;
// 		    case 'monster':
// 	    		x = -35;
// 			    y = 0;
// 			    break;
// 	    }
// 	    var ret = [x,y];
// 	    return ret;
//     }

//     function shadowPositon(eI) {//怪的阴影
//     	var enemy = enemies[eI];
//     	var x = 0;
//     	var y = 0;
//     	switch (enemy.type) {
// 		    case 'beetle':
// 			    x = -4;
// 			    y = BEETLE_HEIGHT-13;
// 		        break;
// 	        case 'rabbit':
// 	    		x = -2;
// 			    y = RABBIT_HEIGHT-27;
// 		    break;
// 		    case 'monster':
// 	    		x = -2;
// 			    y = MONSTER_HEIGHT-20;
// 			    break;
// 	    }
// 	    var ret = [x,y];
// 	    return ret;
//     }

// 	function drawEnemies(step){//怪变化
// 		for (var i = enemies.length - 1; i >= 0; i--) {
// 			enemy = enemies[i];
// 			if(enemy.shown){
// 				if (enemy.stance === 'run') {
// 				    enemy.x = enemy.x - enemy.speed * STEP;
// 			    }

// 				if(enemy.currentHp > 0){//怪的血量
// 					var a= Math.round(enemy.currentHp/enemy.hp*100)/100;
// 					myScare(enemy.hpfill,a,1,1,1);
// 				}

// 				var diff = adjust(i);
// 				for (var j = 0; j <= enemy.monster.length - 1; j++) {
// 					if(j === enemy.stanceFrame){
// 						enemy.monster[j].show().move(diff[0], diff[1]);
// 					}else{
// 						enemy.monster[j].hide();
// 					}
// 				}
// 				myMove(enemy.group.show(), enemy.x, enemy.y);

// 				if(typeof enemy.shadow === 'undefined'){
// 					enemy.shadow = drawImage(preGame.bgLayer,monsterShadow.src,0,0).style('opacity:0.7;');
// 				}
// 				var shadowDiff = shadowPositon(i);
// 				enemy.shadow.move(enemy.x+shadowDiff[0], enemy.y+shadowDiff[1]);

// 				enemy.animTick++;
// 			    if (enemy.animTick > Math.round(7 / (60 / FPS))) {
// 				    enemy.stanceFrame++;
// 				    if (enemy.stance === 'death' && enemy.stanceFrame === enemy.stanceFrames) {
// 					    enemy.stance = 'decay';
// 				    }
// 				    if (enemy.stance !== 'decay') {
// 					    enemy.stanceFrame = enemy.stanceFrame % enemy.stanceFrames;
// 				    } else {
// 					    enemy.stanceFrame--;
// 				    }
// 				    enemy.animTick = 0;
// 			    }
// 			    if (enemy.stance === 'attack') {
// 				    enemy.attackTick++;
// 			    }
// 			}
// 		}
// 	}

// 	function checkEnemyStances(){//怪的状态
// 		for (var i = enemies.length - 1; i >= 0; i--) {
// 			enemy = enemies[i];
// 			if(enemy.shown){
// 				if(enemy.stance === 'run' && Math.round(enemy.x) <= preGame.castle){
// 					enemy.stance = 'attack';
// 					enemy.stanceFrame = 0;
// 					enemy.stanceFrames = enemyImages[enemy.type]['attack'].length;
// 					for (var j = 0; j <= enemy.monster.length - 1; j++) {
// 	    				enemy.monster[j].hide();
// 	    			}
// 	    			if(typeof enemy.attackAct === 'undefined'){
// 	    				enemy.attackAct = [];
// 	    				for (var j = 0; j <= enemyImages[enemy.type]['attack'].length - 1; j++) {
// 		    				enemy.attackAct[j]=drawImage(enemy.group,enemyImages[enemy.type]['attack'][j].src).hide();
// 		    			}
// 	    			}
// 	    			enemy.monster = enemy.attackAct;
// 				}

// 				if((enemy.stance === 'decay')){
// 					for (var j = 0; j <= enemy.monster.length - 1; j++) {
// 	    				enemy.monster[j].hide();
// 	    			}
// 	    			enemy.shadow.hide();
// 					enemy.group.hide();
// 					enemy.shown = false;
// 				}
// 			}
			
// 		}
// 	}

// 	function killEnemy(EI){//移除怪
// 		var enemy = enemies[EI];
// 	    enemy.stance = 'death';
// 	    enemy.stanceFrame = 0;
// 	    enemy.stanceFrames = enemyImages[enemy.type]['death'].length;
// 	    for (var j = 0; j <= enemy.monster.length - 1; j++) {
// 			enemy.monster[j].hide();
// 		}
// 		if(typeof enemy.death === 'undefined'){
// 			enemy.death = [];
// 			for (var j = 0; j <= enemyImages[enemy.type]['death'].length - 1; j++) {
// 				enemy.death[j]=drawImage(enemy.group,enemyImages[enemy.type]['death'][j].src).hide();
// 			}
// 		}
// 		enemy.monster = enemy.death;
// 	    enemy.hpbar.hide();
// 	    enemy.hpfill.hide();
// 	    if(enemy === gameInfo.tenemy){
// 	    	gameInfo.tenemy = false;
// 	    }
// 	}
	
//     function createDragon(){
//     	if(typeof gameInfo.dragon === 'undefined'){
// 	    	var dgroup = preGame.gameLayer.group();
// 	    	var dmonster = [];
// 	    	for (var i = 0; i <= dragonRun.length - 1; i++) {
// 				dmonster[i] = drawImage(dgroup,dragonRun[i].src,0,0).hide();
// 			}
// 			gameInfo.dragon = {
// 				x:preGame.sWidth,
// 				y:Math.random()*(preGame.sHeight-(DRAGON_HEIGHT-22)*dragonScale-40)+40,
// 				speed:preGame.sWidth/(1000/400),
// 				stance:'run',
// 				stanceFrame:0,
// 				stanceFrames:8,
// 				hp:15000,
// 				currentHp:15000,
// 				animTick:0,
// 				attack:200,
// 				flameAttack:1000,
// 				attackTick:1,
// 				flameAttackTick:1,
// 			    attackNum: 1,
// 			    desY:Math.random()*(preGame.sHeight - (DRAGON_HEIGHT-36)*dragonScale-40)+40,
// 			    desX:Math.random()*(preGame.sWidth - DRAGON_WIDTH*dragonScale-260)+260,
// 			    historyTime: +new Date(),
// 			    monster:dmonster,
// 				hpbar:drawImage(dgroup,monsterHpBarImage.src,0,0),
// 				hpfill:drawImage(dgroup,monsterHpBarFillImage.src,1,1),
// 				group:dgroup,
// 				flameY:0,
// 				flameX:0,
// 				flameFrame:0,
// 				flameSpeed:preGame.sWidth/(1000/500),
// 				angle:0,
// 				rev:1,
// 				shown:true,
// 				run:dmonster,
// 				flameShown:false,
// 			};
// 		}else{
// 			gameInfo.dragon.x=preGame.sWidth;
// 			gameInfo.dragon.y=Math.random()*(preGame.sHeight-(DRAGON_HEIGHT-22)*dragonScale-40)+40;
// 			gameInfo.dragon.speed=preGame.sWidth/(1000/400);
// 			gameInfo.dragon.stance='run';
// 			gameInfo.dragon.stanceFrame=0;
// 			gameInfo.dragon.stanceFrames=8;
// 			gameInfo.dragon.currentHp=15000;
// 			gameInfo.dragon.animTick=0;
// 			gameInfo.dragon.attackTick=1;
// 			gameInfo.dragon.flameAttackTick=1;
// 		    gameInfo.dragon.attackNum= 1;
// 		    gameInfo.dragon.historyTime= +new Date();
// 		    gameInfo.dragon.angle=0;
// 			gameInfo.dragon.rev=1;
// 			gameInfo.dragon.shown=true;
// 			gameInfo.dragon.flameShown = false;
// 			gameInfo.dragon.hpbar.show();
// 	    	gameInfo.dragon.hpfill.show();
// 	    	gameInfo.dragon.shadow.show();
// 	    	myScare(gameInfo.dragon.hpfill,dragonScale,dragonScale,1,1);
// 	    	gameInfo.dragon.monster=gameInfo.dragon.run;
// 		}
//     }

// 	function changeDestination(x){
// 		var r = Math.random()*(preGame.sWidth - DRAGON_WIDTH);
// 		var rx = ( r > preGame.castle+100) ? r : preGame.castle+100;
// 		gameInfo.dragon.desX = (x > 0) ? x : rx;
// 		gameInfo.dragon.desY = Math.random()*(preGame.sHeight - (DRAGON_HEIGHT-36)*dragonScale-40)+40;
// 		gameInfo.dragon.angle = Math.atan((gameInfo.dragon.y - gameInfo.dragon.desY) / (gameInfo.dragon.x - gameInfo.dragon.desX)) * 180 / Math.PI;
// 		gameInfo.dragon.rev = (gameInfo.dragon.x - gameInfo.dragon.desX < 0) ? -1 : 1;
// 	}
	
// 	function drawDragon(step){
// 		if(typeof gameInfo.dragon !== 'undefined' && gameInfo.dragon.shown){
// 			var reset = false;
// 			var now = + new Date();
// 		    if(gameInfo.dragon.stance === 'run' && gameInfo.dragon.historyTime+3000 < now){
// 		    	if(gameInfo.dragon.attackNum < 3){
// 		    		gameInfo.dragon.stance = 'attack';
// 		    		gameInfo.dragon.stanceFrame = 0;
// 					gameInfo.dragon.stanceFrames = dragonNormalAttack.length;
// 					for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
// 						gameInfo.dragon.monster[j].hide();
// 	    			}
// 					if(typeof gameInfo.dragon.attackAct === 'undefined'){
// 						gameInfo.dragon.attackAct = [];
// 						for (var j = 0; j <= dragonNormalAttack.length - 1; j++) {
// 		    				gameInfo.dragon.attackAct[j]=drawImage(gameInfo.dragon.group,dragonNormalAttack[j].src).hide();
// 		    			}
// 					}
// 	    			gameInfo.dragon.monster = gameInfo.dragon.attackAct;
// 	    			changeDestination(preGame.castle);
// 		    		gameInfo.dragon.speed = (preGame.sWidth/(1000/800));
// 		    		gameInfo.dragon.attackNum++;
// 		    	}else if(gameInfo.dragon.attackNum === 3){
// 		    		gameInfo.dragon.stance = 'falming';
// 		    		if(gameInfo.dragon.historyTime+4200 > now){
// 						if(typeof gameInfo.dragon.storage === 'undefined'){
// 							gameInfo.dragon.storage = [];
// 							for (var j = 0; j <= dragonStorage.length - 1; j++) {
// 			    				gameInfo.dragon.storage[j]=drawImage(gameInfo.dragon.group,dragonStorage[j].src).hide();
// 			    			}
// 			    			gameInfo.dragon.storageFrame = 0;
// 						}
// 		    		}
// 		    	}
// 		    }

// 		    if(gameInfo.dragon.stance === 'attack' && gameInfo.dragon.stanceFrame === dragonNormalAttack.length-1){
// 			    gameInfo.dragon.stance = 'run';
// 	    		gameInfo.dragon.stanceFrame = 0;
// 				gameInfo.dragon.stanceFrames = dragonRun.length;
// 				for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
// 					gameInfo.dragon.monster[j].hide();
//     			}
// 				gameInfo.dragon.monster = gameInfo.dragon.run;
// 	    		reset = true;
//     			gameInfo.dragon.historyTime = + new Date();
// 		    }

// 		    if(gameInfo.dragon.stance === 'attack' && gameInfo.dragon.stanceFrame === 0 && Math.round(gameInfo.dragon.x) < preGame.castle){
// 		    	gameInfo.dragon.attackTick = 0;
// 		    	gameInfo.dragon.stanceFrame++;
// 		    }

// 		    if(gameInfo.dragon.stance === 'falming'){
// 		    	if(gameInfo.dragon.monster !== gameInfo.dragon.falming &&gameInfo.dragon.historyTime+4200 < now){
// 		    		gameInfo.dragon.stanceFrame = 0;
// 					gameInfo.dragon.stanceFrames = dragonAttack.length;
// 					for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
// 						gameInfo.dragon.monster[j].hide();
// 	    			}
// 					if(typeof gameInfo.dragon.falming === 'undefined'){
// 						gameInfo.dragon.falming = [];
// 						for (var j = 0; j <= dragonAttack.length - 1; j++) {
// 		    				gameInfo.dragon.falming[j]=drawImage(gameInfo.dragon.group,dragonAttack[j].src).hide();
// 		    			}
// 					}
// 					gameInfo.dragon.monster = gameInfo.dragon.falming;
// 	    			gameInfo.dragon.attackNum++;
// 		    	}

// 		    	if(gameInfo.dragon.monster === gameInfo.dragon.falming && gameInfo.dragon.stanceFrame === dragonAttack.length-1){
// 				    gameInfo.dragon.stance = 'run';
// 		    		gameInfo.dragon.stanceFrame = 0;
// 					gameInfo.dragon.stanceFrames = dragonRun.length;
// 					for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
// 						gameInfo.dragon.monster[j].hide();
// 						if(j < gameInfo.dragon.storage.length){
// 						   gameInfo.dragon.storage[j].hide();
// 						}
// 	    			}
// 	    			gameInfo.dragon.monster = gameInfo.dragon.run;
// 	    			reset = true;
// 	    			gameInfo.dragon.flameX = gameInfo.dragon.x-FLAME_WIDTH;
// 	    			gameInfo.dragon.flameY = gameInfo.dragon.y-10;
// 	    			if(typeof gameInfo.dragon.flame === 'undefined'){
// 	    				gameInfo.dragon.flame = [];
// 						for (var j = 0; j <= dragonFlames.length - 1; j++) {
// 		    				gameInfo.dragon.flame[j]=drawImage(preGame.gameLayer,dragonFlames[j].src).hide();
// 		    			}
// 					}
// 	    			gameInfo.dragon.flameShown = true;
// 	    			gameInfo.dragon.flameAttackTick = 0;
// 			    }
// 		    }

// 		    if((gameInfo.dragon.stance === 'decay')){
// 		    	for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
//     				gameInfo.dragon.monster[j].hide();
//     			}
// 				gameInfo.dragon.group.hide();
// 			}

// 			if(gameInfo.dragon.angle === 0){
// 				gameInfo.dragon.angle = Math.atan((gameInfo.dragon.y - gameInfo.dragon.desY) / (gameInfo.dragon.x - gameInfo.dragon.desX)) * 180 / Math.PI;
// 			}

// 			if(gameInfo.dragon.x < 0 ||  gameInfo.dragon.y < 0 || gameInfo.dragon.x > preGame.sWidth ||  gameInfo.dragon.y > preGame.sHeight-DRAGON_HEIGHT){
// 				reset = true;
// 			}

// 			if(gameInfo.dragon.stance === 'run' && Math.round(gameInfo.dragon.x) >= Math.round(gameInfo.dragon.desX)-5 && Math.round(gameInfo.dragon.x) <= Math.round(gameInfo.dragon.desX)+5 
// 			    	&& Math.round(gameInfo.dragon.y) >= Math.round(gameInfo.dragon.desY)-5 && Math.round(gameInfo.dragon.y) <= Math.round(gameInfo.dragon.desY)+5){
// 				reset = true;
// 			}

// 			if(reset){
// 	    		changeDestination();
// 	    		gameInfo.dragon.speed = (preGame.sWidth/(1000/400));
// 		    }

// 			if (gameInfo.dragon.stance === 'run' || (gameInfo.dragon.stance === 'attack' && gameInfo.dragon.stanceFrame === 0)) {
// 			    gameInfo.dragon.x = gameInfo.dragon.x - gameInfo.dragon.rev*gameInfo.dragon.speed*Math.cos(gameInfo.dragon.angle * Math.PI/180)* STEP;
// 			    gameInfo.dragon.y = gameInfo.dragon.y - gameInfo.dragon.rev*gameInfo.dragon.speed*Math.sin(gameInfo.dragon.angle * Math.PI/180)* STEP;
// 		    }

// 			if(gameInfo.dragon.currentHp > 0){//怪的血量
// 				var a= Math.round(gameInfo.dragon.currentHp/gameInfo.dragon.hp*100)/100;
// 				myScare(gameInfo.dragon.hpfill,a*dragonScale,dragonScale,1,1);
// 				myScare(gameInfo.dragon.hpbar, dragonScale, dragonScale);
// 			}

// 			for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
// 				if(j === gameInfo.dragon.stanceFrame){
// 					myScare(gameInfo.dragon.monster[j], dragonScale, dragonScale);
// 					gameInfo.dragon.monster[j].show().move(-20,-30);
// 				}else{
// 					gameInfo.dragon.monster[j].hide();
// 				}
// 			}

// 			if(gameInfo.dragon.stance === 'falming'){
// 				for (var j = 0; j <= gameInfo.dragon.storage.length - 1; j++) {
// 					if(j === gameInfo.dragon.storageFrame){
// 					   myScare(gameInfo.dragon.storage[j], dragonScale, dragonScale);
// 					   gameInfo.dragon.storage[j].show().forward().move(-25,-30);
// 					}else{
// 					   gameInfo.dragon.storage[j].hide();
// 					}
// 				}
// 			}

// 			if(typeof gameInfo.dragon.shadow === 'undefined'){
// 				gameInfo.dragon.shadow = drawImage(preGame.bgLayer,monsterShadow.src,0,0).style('opacity:0.7;');
// 			}
// 			myMove(gameInfo.dragon.group.show(), gameInfo.dragon.x, gameInfo.dragon.y);
// 			myScare(gameInfo.dragon.shadow, dragonScale, dragonScale);
// 			gameInfo.dragon.shadow.move(gameInfo.dragon.x/dragonScale, (gameInfo.dragon.y+DRAGON_HEIGHT-3)/dragonScale);

// 			if(gameInfo.dragon.flameShown && typeof gameInfo.dragon.flame !== 'undefined'){
// 				if(gameInfo.dragon.flameX > -200){
// 					gameInfo.dragon.flameX = gameInfo.dragon.flameX - gameInfo.dragon.flameSpeed * STEP;
// 					for (var j = 0; j <= gameInfo.dragon.flame.length - 1; j++) {
// 						if(j === gameInfo.dragon.flameFrame){
// 							myScare(gameInfo.dragon.flame[j], dragonScale, dragonScale);
// 							gameInfo.dragon.flame[j].move(gameInfo.dragon.flameX/dragonScale, gameInfo.dragon.flameY/dragonScale).show();
// 						}else{
// 							gameInfo.dragon.flame[j].hide();
// 						}
// 					}
// 				}else{
// 					for (var j = 0; j <= gameInfo.dragon.flame.length - 1; j++) {
// 						gameInfo.dragon.flame[j].hide();
// 					}
// 				}
// 			}

// 			gameInfo.dragon.animTick++;
// 		    if (gameInfo.dragon.animTick > Math.round(7 / (60 / FPS))) {
// 			    if (gameInfo.dragon.stance === 'death' && gameInfo.dragon.stanceFrame === gameInfo.dragon.stanceFrames-1) {
// 				    gameInfo.dragon.stance = 'decay';
// 			    }

// 			    if (gameInfo.dragon.stance !== 'attack' && gameInfo.dragon.stance !== 'decay') {
// 			    	gameInfo.dragon.stanceFrame++;
// 				    gameInfo.dragon.stanceFrame = gameInfo.dragon.stanceFrame % gameInfo.dragon.stanceFrames;
// 			    }

// 			    if(gameInfo.dragon.stance === 'falming'){
// 			    	gameInfo.dragon.storageFrame++;
// 			    	gameInfo.dragon.storageFrame = gameInfo.dragon.storageFrame % gameInfo.dragon.storage.length;
// 			    }

// 			    if(gameInfo.dragon.flameShown && typeof gameInfo.dragon.flame !== 'undefined' && gameInfo.dragon.flameX > 0){
// 			    	gameInfo.dragon.flameFrame++;
// 			    	gameInfo.dragon.flameFrame = gameInfo.dragon.flameFrame % gameInfo.dragon.flame.length;
// 			    }
// 			    gameInfo.dragon.animTick = 0;
// 		    }
// 		}
// 	}

// 	function killDragon(){
// 	    gameInfo.dragon.stance = 'death';
// 	    gameInfo.dragon.stanceFrame = 0;
// 	    gameInfo.dragon.stanceFrames = dragonDeath.length;
// 	    for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
// 			gameInfo.dragon.monster[j].hide();
// 			if(gameInfo.dragon.type === 'flaming' && j < gameInfo.dragon.storage.length){
// 				gameInfo.dragon.storage[j].hide();
// 			}
// 		}
// 		if(typeof gameInfo.dragon.death === 'undefined'){
// 			gameInfo.dragon.death = [];
// 			for (var j = 0; j <= dragonDeath.length - 1; j++) {
// 				gameInfo.dragon.death[j]=drawImage(gameInfo.dragon.group,dragonDeath[j].src).hide();
// 			}
// 		}
// 		gameInfo.dragon.monster = gameInfo.dragon.death;
// 	    gameInfo.dragon.hpbar.hide();
// 	    gameInfo.dragon.hpfill.hide();
// 	    gameInfo.dragon.shadow.hide();
// 	}

// 	function attackCastle(){//攻击城墙
// 		if (gameInfo.currentHp <= 0) {
// 		   	return;
// 		}
// 		for (var i = enemies.length - 1; i >= 0; i--) {
// 			enemy = enemies[i];
//     		var attackTick = 0;
// 	    	switch (enemy.type) {
// 			    case 'beetle':
// 			    case 'rabbit':
// 				    attackTick = 2;
// 			        break;
// 			    case 'monster':
// 		    		attackTick = 3;
// 				    break;
// 		    }
// 			if (enemy.stance === 'attack' && enemy.stanceFrame === attackTick && enemy.animTick === 0) {
// 			    gameInfo.currentHp -= enemy.attack;
// 			    enemy.attackTick = 0;
// 		    }			
// 		}
// 		if(typeof gameInfo.dragon !== 'undefined'){
// 			if(gameInfo.dragon.stance === 'attack' && gameInfo.dragon.attackTick === 0 && Math.round(gameInfo.dragon.x) <= preGame.castle){
// 				gameInfo.currentHp -= gameInfo.dragon.attack;
// 				gameInfo.dragon.attackTick = 1;
// 			}

// 			if(typeof gameInfo.dragon.flame !== 'undefined' && gameInfo.dragon.flameAttackTick === 0 && Math.round(gameInfo.dragon.flameX) <= preGame.castle-33*dragonScale){
// 				gameInfo.currentHp -= gameInfo.dragon.flameAttack;
// 				gameInfo.dragon.flameAttackTick = 1;
// 			}
// 		}
// 	}

//     function newArrow() {//箭
//     	gameInfo.displayArrow.rotate(gameInfo.angle, 0, preGame.sHeight/2).show();
//     	if(bowLevel === 1){
//     		var obj = drawImage(preGame.gameLayer, arrowImage.src, -17, preGame.sHeight/2-ARROW_HEIGHT/2).rotate(gameInfo.angle, 0, preGame.sHeight/2).hide();
// 		    var objarr = [obj];
// 	    	arrows.push({
// 	    		moving: false,
// 	        	speed: 610,
// 	    		angle:gameInfo.angle,
// 	    		objarr:objarr,
// 	    		attack:35,
// 	    		diffAngle:[0],
// 	    	});
//     	}else if(bowLevel === 2){
//     		var obj1 = drawImage(preGame.gameLayer, arrowImage.src,-17, preGame.sHeight/2-ARROW_HEIGHT/2).rotate(gameInfo.angle-1.5, 0, preGame.sHeight/2).hide();
// 	    	var obj2 = drawImage(preGame.gameLayer, arrowImage.src,-17, preGame.sHeight/2-ARROW_HEIGHT/2).rotate(gameInfo.angle+1.5, 0, preGame.sHeight/2).hide();
// 		    var objarr = [obj1, obj2];
// 	    	arrows.push({
// 	    		moving: false,
// 	        	speed: 610,
// 	    		angle:gameInfo.angle,
// 	    		objarr:objarr,
// 	    		attack:50,
// 	    		diffAngle:[-1.5, 1.5],
// 	    	});
//     	}else if(bowLevel === 3){
//     		var obj1 = drawImage(preGame.gameLayer, arrowImage.src,-17, preGame.sHeight/2-ARROW_HEIGHT/2).rotate(gameInfo.angle-3, 0, preGame.sHeight/2).hide();
// 	    	var obj2 = drawImage(preGame.gameLayer, arrowImage.src,-17, preGame.sHeight/2-ARROW_HEIGHT/2).rotate(gameInfo.angle, 0, preGame.sHeight/2).hide();
// 	    	var obj3 = drawImage(preGame.gameLayer, arrowImage.src,-17, preGame.sHeight/2-ARROW_HEIGHT/2).rotate(gameInfo.angle+3, 0, preGame.sHeight/2).hide();
// 		    var objarr = [obj1, obj2, obj3];
// 	    	arrows.push({
// 	    		moving: false,
// 	        	speed: 610,
// 	    		angle:gameInfo.angle,
// 	    		objarr:objarr,
// 	    		attack:100,
// 	    		diffAngle:[-3, 0, 3],
// 	    	});
//     	}
//     }


//     function drawArrows() {//箭的路径与碰撞
//     	if(gameInfo.touched){
// 	        var origin = 0;
// 		    for (var k = arrows.length - 1; k >= 0; k--){
// 		    	if(!arrows[k].moving){
// 		    		origin = arrows[k];
// 		    	}
// 		    }

// 		    if(origin !== 0){
// 		    	origin.angle = gameInfo.angle;
// 			    origin.moving = true;
// 			    gameInfo.displayArrow.hide();
// 			    for (var m = origin.objarr.length - 1; m >= 0; m--) {
// 	    			var arrowObject = origin.objarr[m];
// 	    			var diff = origin.diffAngle;
//     				arrowObject.rotate(origin.angle+diff[m], -25, preGame.sHeight/2).show();
// 	    		}
// 		    }
//     	}

//     	var flag = false;
//     	for (var k = arrows.length - 1; k >= 0; k--){
// 	    	if(!arrows[k].moving){
// 	    		flag = true;
// 	    	}
// 	    }
//     	if(!flag && arrowTick++ > Math.round(FPS/levelFre[bowLevel-1])){
//     		newArrow();
//     		arrowTick = 0;
//     	}

//     	for (var k = arrows.length - 1; k >= 0; k--) {
//     		var arrow = arrows[k];
//     		var passNum = 0;
//     		for (var m = arrow.objarr.length - 1; m >= 0; m--) {
//     			var arrowObject = arrow.objarr[m];
//     			if (arrow.moving) {
// 	            	arrowObject.dmove(arrow.speed*STEP, 0);
// 	        	}

// 	    		if ((arrowObject.x() > preGame.sWidth) || (arrowObject.x() < -26) || (arrowObject.y() > preGame.sHeight) || (arrowObject.y() < 0)) {
// 	    			arrowObject.remove();
// 	    			arrow.objarr.splice(m, 1);
// 	    			passNum++;
// 	    			continue;
// 		        }

// 		        if( (typeof gameInfo.dragon !== 'undefined' && gameInfo.dragon.shown) && (gameInfo.dragon.stance !=='death' && gameInfo.dragon.stance !== 'decay')
// 		        	&& (((arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) > gameInfo.dragon.x+10) 
// 		        		&& ((arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) < gameInfo.dragon.x + DRAGON_WIDTH*dragonScale)) 
// 			        &&(( preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) > gameInfo.dragon.y+20) 
// 			        	&& (preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) < gameInfo.dragon.y+(DRAGON_HEIGHT-40)*dragonScale))){
// 				        gameInfo.dragon.currentHp -= arrow.attack;
// 			        	if (gameInfo.dragon.currentHp <= 0) {
// 					        gameInfo.coin += 2;
// 					        gameInfo.kills++;
// 			        		killDragon();
// 				        }
// 	    				arrowObject.remove();
// 	    				arrow.objarr.splice(m, 1);
// 	    				passNum++;
// 	    				continue;
// 		        }

// 		        var shot = false;
// 	        	for (var i = 0; i < enemies.length && !shot; i++) {
// 		        	var enemy = enemies[i]; 
// 			        if ((enemy.shown && enemy.stance !=='death' && enemy.stance !== 'decay')
// 			        	&&(( (arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) > enemy.x+20) 
// 			        		&& ((arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) < enemy.x + enemy.width )) 
// 				        &&(( preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) > enemy.y+10) 
// 				        	&& (preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) < enemy.y+enemy.height+10))) {
// 			        	shot = true;
// 			        	enemy.currentHp -= arrow.attack;
// 			        	if (enemy.currentHp <= 0) {
// 					        gameInfo.coin += 2;
// 					        gameInfo.kills++;
// 			        		killEnemy(i);
// 				        } 
// 	    				arrowObject.remove();
// 	    				arrow.objarr.splice(m, 1);
// 	    				passNum++;
// 			        }
// 		        }
		        
//     		}

//     		if(passNum === arrow.diffAngle.length){
//     			arrows[k] = null;
//     			arrows.splice(k, 1);
//     		}
//     	}
    		
//     }


//     function resetLevel() {//重置
//     	gameInfo.loseScreen.hide();
//     	for (var i = enemies.length - 1; i >= 0; i--) {
//     		enemy = enemies[i];
//     		if(enemy.shown){
//     			enemy.shown = false;
// 				enemy.group.hide();
// 				enemy.shadow.hide();
// 				enemy.x=preGame.sWidth;
// 				enemy.stance='run';
// 				if(enemy === gameInfo.tenemy){
// 					gameInfo.tenemy = false;
// 				}
//     		}
// 		}
// 		for (var k = arrows.length - 1; k >= 0; k--) {
//     		var arrow = arrows[k];
//     		for (var m = arrow.objarr.length - 1; m >= 0; m--) {
//     			var arrowObject = arrow.objarr[m];
//     			arrowObject.remove();
//     			arrowObject = null;
//     		}
//     		arrows[k] = null;
// 			arrows.splice(k, 1);
// 	    }
// 	    arrows = null;
//     	gameInfo.gameover = false;
//     	gameInfo.currentHp = preGame.hp;
//     	arrows = [];
//     	arrowTick = 30;
//     	bowLevel = 1;
//     	timer = + new Date();
//     	gameInfo.coin = 0;
//         gameInfo.kills = 1;
//     	gameInfo.counter = 1;
//     	gameInfo.enemyTypes = 1;
//     	gameInfo.paused = false;
//     	gameInfo.angle = 0;
// 	 	gameInfo.touched = false;
// 	 	gameInfo.hpfill.move(CIRCLE_HEIGHT, preGame.sHeight-36);
// 		myScare(gameInfo.hpfill, 1, 1, CIRCLE_HEIGHT, preGame.sHeight-36);
// 		gameInfo.hpfill.show();
// 		gameInfo.upgradeRect.hide();
// 		gameInfo.coinText.text(''+levelCoins[bowLevel-1]).font({fill: 'red',family: 'Cooper',});
//     	gameInfo.weapon.load(crossbowImage[bowLevel-1].src).rotate(0, 0, preGame.sHeight/2);//弓
//     	gameInfo.upbow.load(crossIcon[0].src);
//     	gameInfo.logo.show();
// 		if(typeof gameInfo.warning !== 'undefined'){
// 			gameInfo.warning.group.hide();
// 		}

// 		if(typeof gameInfo.dragon !== 'undefined'){
// 			if(gameInfo.dragon.flameShown){
// 				for (var i = gameInfo.dragon.flame.length - 1; i >= 0; i--) {
// 					gameInfo.dragon.flame[i].hide();
// 				}
// 			}
// 			for (var i = gameInfo.dragon.monster.length - 1; i >= 0; i--) {
// 				gameInfo.dragon.monster[i].hide();
// 			}
// 			gameInfo.dragon.group.hide();
// 			gameInfo.dragon.shadow.hide();
// 			gameInfo.dragon.shown = false;
// 		}
// 		gameInfo.losehtime = 0;
// 		gameInfo.loseOpacity1=0.8;
// 		gameInfo.loseOpacity2=0.1;
// 		gameInfo.end = false;
// 		callback(0);
//     }

//     function checkProgress() {//游戏进度
//     	if (Math.round(gameInfo.kills) === preGame.goal) {
//     		gameInfo.gameover = true;
//     		gameInfo.paused = true;
// 	    }
//     }


//     var light = [0.8,0.25,0.001];
//     function drawTutorial() {//新手引导
//     	if (gameInfo.tutorial && !gameInfo.tutorialShown) {
//     		if(typeof gameInfo.tutorialScreen === 'undefined'){
//     			gameInfo.tutorialScreen = preGame.uiLayer.group();
// 	    		var r = gameInfo.tutorialScreen.rect(preGame.width,preGame.height).move(0, 0);
// 	    		var m = gameInfo.tutorialScreen.mask();
// 			    m.add(gameInfo.tutorialScreen.rect(preGame.width,preGame.height).fill({color:'rgb(255, 255, 255)', opacity:0.8}).move(0, 0));
			    
// 	    		var x = gameInfo.tenemy.x;
// 	    		var y = gameInfo.tenemy.y;
				  
// 			    m.add(gameInfo.tutorialScreen.circle(50*preGame.scale).center((x+25)*preGame.scale, (y+25)*preGame.scale));
// 			    r.maskWith(m);

// 			    drawImage(gameInfo.tutorialScreen, tutorialDeraImage.src, 20, 60);
// 			    drawImage(gameInfo.tutorialScreen, tutoriaTipImage.src, 150, 60);
// 			    gameInfo.handLight = [];
// 			    gameInfo.handPlus = [];
// 			    gameInfo.handOpacity = [];
// 			    gameInfo.handDelay = 1;
// 			    gameInfo.handTime = + new Date();
// 			    for (var i = 1; i >= 0; i--) {
// 			    	gameInfo.handLight[i] = drawImage(gameInfo.tutorialScreen, tutorialLightImage.src, 387, 180).hide();
// 				    gameInfo.handPlus[i] = 0.45;
// 				    gameInfo.handOpacity[i] = 1;
// 				    gameInfo.handLight[i].style('opacity', gameInfo.handOpacity[i]);
// 				    myScare(gameInfo.handLight[i], gameInfo.handPlus[i], gameInfo.handPlus[i], 412, 205);
// 			    }
// 			    gameInfo.handLight[0].show();
// 			    gameInfo.hand = drawImage(gameInfo.tutorialScreen, tutorialPointerImage.src, x+30, y+30);
// 			    gameInfo.handInstall = drawImage(gameInfo.tutorialScreen, installButtonImage.src,(preGame.sWidth-INSTALL_WIDTH*0.7)/2,2.5);//install按钮
// 				myScare(gameInfo.handInstall, 0.7, 0.7);
// 				gameInfo.handLogo = drawImage(gameInfo.tutorialScreen, logoImage.src, (preGame.sWidth-90)/2, preGame.sHeight-54);
// 				myScare(gameInfo.handLogo, 1.5, 1.5, (preGame.sWidth)/2, preGame.sHeight);
//     		}
//     		gameInfo.logo.hide();
// 			gameInfo.handOpacityAnim = 0.01;
//     		gameInfo.handPlusAnim = 0.011;
// 		    gameInfo.tutorialShown = true;
// 		    gameInfo.paused = true;
// 		    gameInfo.handInstall.off('click').click(function() {
// 			  redictAd();
// 			});
// 	    }
// 	}

//     function createWarning(){
//     	if(typeof gameInfo.warning === 'undefined'){
//     		var gwidth = WARNING_BAR_UNIT_HEIGHT*2+30+WARNING_HEIGHT;
// 			var warningGroup = preGame.uiLayer.group();
// 			myMove(warningGroup, 0,(preGame.sHeight-gwidth)/2);
// 			var opa = 0;
// 			var bars1 = [];
// 			var j=0;
// 			for (var i = -5*WARNING_BAR_UNIT_WIDTH; i < preGame.sWidth; i=i+WARNING_BAR_UNIT_WIDTH) {
// 				bars1[j++] = drawImage(warningGroup, warningBarUnitImage.src,i,0);
// 				bars1[j++] = drawImage(warningGroup, warningBarUnitRedImage.src,i,0).style('opacity', opa);
// 			}

// 			var bars2 = [];
// 			j=0;
// 			for (var i = 0; i < preGame.sWidth+5*WARNING_BAR_UNIT_WIDTH; i=i+WARNING_BAR_UNIT_WIDTH) {
// 				bars2[j++] = drawImage(warningGroup, warningBarUnitImage.src,i,gwidth-WARNING_BAR_UNIT_HEIGHT);
// 				bars2[j++] = drawImage(warningGroup, warningBarUnitRedImage.src,i,gwidth-WARNING_BAR_UNIT_HEIGHT).style('opacity', opa);
// 			}

// 			var caution = drawImage(warningGroup, warningImage.src,(preGame.sWidth-WARNING_WIDTH)/2,(gwidth-30)/2);
// 			var cautionRed = drawImage(warningGroup, warningRedImage.src,(preGame.sWidth-WARNING_WIDTH)/2,(gwidth-30)/2).style('opacity', opa);
// 			gameInfo.warning = {
// 	    		width:gwidth,
// 	    		group:warningGroup,
// 	    		bars1:bars1,
// 	    		bars2:bars2,
// 	    		caution:caution,
// 	    		cautionRed:cautionRed,
// 	    		opacity:opa,
// 	    		opacityAnim:0.05,
// 	    		barAnim:1.5,
// 	    	}
//     	}else{
//     		gameInfo.warning.opacity=0;
//     		gameInfo.warning.opacityAnim=0.05;
//     		gameInfo.warning.barAnim=1.5;
//     		var j=0;
// 			for (var i = -5*WARNING_BAR_UNIT_WIDTH; i < preGame.sWidth; i=i+WARNING_BAR_UNIT_WIDTH) {
// 				gameInfo.warning.bars1[j++].move(i,0);
// 				gameInfo.warning.bars1[j++].move(i,0).style('opacity', gameInfo.warning.opacity);
// 			}

// 			j=0;
// 			for (var i = 0; i < preGame.sWidth+5*WARNING_BAR_UNIT_WIDTH; i=i+WARNING_BAR_UNIT_WIDTH) {
// 				gameInfo.warning.bars2[j++].move(i,gameInfo.warning.width-WARNING_BAR_UNIT_HEIGHT);
// 				gameInfo.warning.bars2[j++].move(i,gameInfo.warning.width-WARNING_BAR_UNIT_HEIGHT).style('opacity', gameInfo.warning.opacity);
// 			}
// 			gameInfo.warning.cautionRed.style('opacity', gameInfo.warning.opacity);
// 			gameInfo.warning.group.show();
//     	}
    	
//     }

//     function drawWarning() {
//     	if(typeof gameInfo.warning !== 'undefined'){
//     		gameInfo.warning.opacity = gameInfo.warning.opacity+gameInfo.warning.opacityAnim;
//     		if(gameInfo.warning.opacity <= 0 || gameInfo.warning.opacity >= 0.8){
//     			gameInfo.warning.opacityAnim = -gameInfo.warning.opacityAnim;
//     		}
//     		gameInfo.warning.cautionRed.style('opacity', gameInfo.warning.opacity);
//     		for (var i = 0; i <= gameInfo.warning.bars1.length - 1; i++) {
//     			gameInfo.warning.bars1[i].dmove(gameInfo.warning.barAnim,0);
//     			i=i+1;
//     			gameInfo.warning.bars1[i].dmove(gameInfo.warning.barAnim,0);
//     			gameInfo.warning.bars1[i].style('opacity', gameInfo.warning.opacity);
//     		}

//     		for (var i = 0; i <= gameInfo.warning.bars2.length - 1; i++) {
//     			gameInfo.warning.bars2[i].dmove(-1*gameInfo.warning.barAnim,0);
//     			i=i+1;
//     			gameInfo.warning.bars2[i].dmove(-1*gameInfo.warning.barAnim,0);
//     			gameInfo.warning.bars2[i].style('opacity', gameInfo.warning.opacity);
//     		}
//     	}

//     }


//     function drawLoseScreen() {//失败结果
// 		if(typeof gameInfo.warning !== 'undefined' && gameInfo.warning.group.visible()){
// 			gameInfo.warning.group.backward();
// 		}
// 		if(typeof gameInfo.loseScreen === 'undefined'){
//     		gameInfo.loseScreen = preGame.uiLayer.group();
// 			gameInfo.loseScreen.rect(preGame.width,preGame.height).fill({ color: 'rgb(0, 0, 0)', opacity: 0.8 }).move(0, 0);
// 			gameInfo.losehtime = 0;
// 			gameInfo.loseOpacity1=0.8;
// 			gameInfo.loseOpacity2=0.1;
// 			gameInfo.loseOpacityAnim=0.08;
// 			gameInfo.tryObj = drawImage(gameInfo.loseScreen, tryAgainButtonImage.src, 123.5, preGame.sHeight-124).hide();
// 			gameInfo.installObj = drawImage(gameInfo.loseScreen, installButtonImage.src, 185.5, preGame.sHeight-132).hide();
// 			gameInfo.appStore = drawImage(gameInfo.loseScreen, appStoreImage.src, 92, preGame.sHeight-50).hide();
// 			gameInfo.google = drawImage(gameInfo.loseScreen, googleImage.src, 259, preGame.sHeight-50).hide();
// 		    gameInfo.loseLogo = drawImage(gameInfo.loseScreen, logoImage.src, preGame.sWidth-90, preGame.sHeight-54);
//     	}else if(gameInfo.loseScreen.visible()){
//     		var now = + new Date();
//     		if(gameInfo.loseOpacity1 < 1){
//     			if(typeof gameInfo.losetext1 === 'undefined'){
//     				gameInfo.losetext1 = gameInfo.loseScreen.text("Download game and play with ").font({family: 'Cooper',fill: '#ffffff',}).style('opacity', gameInfo.loseOpacity1);
// 					myText(gameInfo.losetext1, 18, preGame.sWidth/2, 58);
// 					gameInfo.losetext2 = gameInfo.loseScreen.text("Legendary weapon").font({family: 'Cooper',fill: '#ff911a',}).style('opacity', gameInfo.loseOpacity1);
// 					myText(gameInfo.losetext2, 22, preGame.sWidth/2, 82);
// 					gameInfo.loseIcon = drawImage(gameInfo.loseScreen, crossBigIcon.src,(preGame.sWidth-80)/2, 105).style('opacity', gameInfo.loseOpacity1);
//     			}else{
//     				gameInfo.loseOpacity1 += gameInfo.loseOpacityAnim;
// 	    			gameInfo.losetext1.show().style('opacity', gameInfo.loseOpacity1);
// 	    			gameInfo.losetext2.show().style('opacity', gameInfo.loseOpacity1);
// 	    			gameInfo.loseIcon.show().style('opacity', gameInfo.loseOpacity1);
//     			}
//     		}else if(gameInfo.losehtime === 0){
//     			gameInfo.losehtime = now;
//     		}else if(gameInfo.losehtime + 300 < now && gameInfo.loseOpacity2 < 1){
// 				gameInfo.loseOpacity2 += gameInfo.loseOpacityAnim;
//     			gameInfo.tryObj.show().style('opacity', gameInfo.loseOpacity2);
//     			gameInfo.installObj.show().style('opacity', gameInfo.loseOpacity2);
//     			gameInfo.appStore.show().style('opacity', gameInfo.loseOpacity2);
//     			gameInfo.google.show().style('opacity', gameInfo.loseOpacity2);
//     		}else if(gameInfo.loseOpacity2 >= 1){
//     			gameInfo.end = true;
//     		}
    		
//     	}else{
//     		gameInfo.loseScreen.show();
// 			gameInfo.losetext1.hide();
// 			gameInfo.losetext2.hide();
// 			gameInfo.loseIcon.hide();
// 			gameInfo.tryObj.hide();
// 			gameInfo.installObj.hide();
// 			gameInfo.appStore.hide();
// 			gameInfo.google.hide();
//     	}

//     	gameInfo.tryObj.off('click').click(function() {
//     		if(gameInfo.loseOpacity2 >= 1){
//     			resetLevel();
//     		}
// 		});
// 		gameInfo.installObj.off('click').click(function() {
// 			if(gameInfo.loseOpacity2 >= 1){
// 				redictAd();
// 		    }
// 		});
    	
//     }

//     function redictAd(){//跳转下载页面
//     	ExitApi.exit();
//     }
	
//     function upgradeBow(){
//     	if(gameInfo.coin < levelCoins[bowLevel-1]){
//     		return;
//     	}

//     	gameInfo.coin -= levelCoins[bowLevel-1];
//     	bowLevel++;
//     	gameInfo.weapon.load(crossbowImage[bowLevel-1].src).rotate(0, 0, preGame.sHeight/2);//弓
//     	gameInfo.upbow.load(crossIcon[bowLevel-1].src);
//     	gameInfo.coinText.text(''+levelCoins[bowLevel-1]).font({fill: 'red',family: 'Cooper',});
// 		gameInfo.angle = 0;
// 		arrowTick = 30;
// 		gameInfo.upOpacity = 0;
// 		if(gameInfo.coin < levelCoins[bowLevel-1]){
// 			gameInfo.upgradeRect.hide();
// 		}
//     }

// 	function drawUI() {//ui
// 		if(typeof gameInfo.tutorialScreen !== 'undefined' && gameInfo.tutorialScreen.visible()){
// 			var now = + new Date();
// 			if(gameInfo.handDelay <= (gameInfo.handLight.length-1) && gameInfo.handTime + 800 <= now){
// 				gameInfo.handLight[gameInfo.handDelay].show();
// 				gameInfo.handTime = + new Date();
// 				gameInfo.handDelay++;
// 			}
// 			for (var i = gameInfo.handLight.length-1; i >= 0; i--) {
// 				if(gameInfo.handLight[i].visible()){
// 					gameInfo.handPlus[i] += gameInfo.handPlusAnim;
// 					gameInfo.handOpacity[i] -= gameInfo.handOpacityAnim;
// 			    	if (gameInfo.handPlus[i] >= 1.5) {
// 			    		gameInfo.handPlus[i] = 0.45;
// 			    		gameInfo.handOpacity[i] = 1;
// 					}
// 					gameInfo.handLight[i].style('opacity', gameInfo.handOpacity[i]);	
// 					myScare(gameInfo.handLight[i], gameInfo.handPlus[i], gameInfo.handPlus[i], 412, 205);
// 				}
// 		    }
// 		}

// 		if(gameInfo.counter > preGame.progress){
// 			gameInfo.counter = preGame.progress;
// 		}
//         gameInfo.progressObj.move(preGame.sWidth-PROGRESS_WIDTH-125*gameInfo.counter/preGame.progress-25, 3);

//         gameInfo.currentCoin.text(''+gameInfo.coin);
//         if (gameInfo.currentHp <= 0) {
//         	gameInfo.currentHp = 0;
// 	    	gameInfo.gameover = true;
// 	    	gameInfo.paused = true;
// 	    	gameInfo.hpfill.hide();
// 	    }else{
// 	    	var a= Math.round(gameInfo.currentHp/preGame.hp*100)/100;
// 	    	if(a > 0){
// 	    		gameInfo.hpfill.move(CIRCLE_HEIGHT, preGame.sHeight-36);
// 	    		myScare(gameInfo.hpfill, a, 1, CIRCLE_HEIGHT, preGame.sHeight-36);
// 	    	}else{
// 	    		gameInfo.hpfill.hide();
// 	    	}
	    	
// 	    }
// 	    gameInfo.hptext.text(gameInfo.currentHp  + '/' +  preGame.hp);

//         if(gameInfo.gameover){
//         	if (Math.round(gameInfo.kills) !== preGame.goal) {
// 		   		drawLoseScreen();
// 		    } else {
// 		    	drawLoseScreen();
// 		    }
//         }
	    
//     }

//     var createNum = 1;
//     function update(step){
//     	if (!gameInfo.paused){
//     		drawUpgradeBow();
//     		drawArrows();
//     		checkProgress();
//     		if(typeof gameInfo.tenemy !== 'undefined' && !gameInfo.tenemy){
//     			var now = + new Date();
// 		        if (timer + 500 < now) {
// 		        	timer = + new Date();
// 			        gameInfo.counter++;
// 			        createNum = 0;
// 			        if(gameInfo.counter >= 3 && gameInfo.counter < 15 && (gameInfo.counter%3 === 0)){
// 			        	createNum = 1;
// 			        }

// 			        if(gameInfo.counter === 15){
// 			        	gameInfo.enemyTypes = 1;
// 			        	createNum = 3;
// 			        }

// 			        if(gameInfo.counter >= 18 && gameInfo.counter < 30 && (gameInfo.counter%2 === 0)){
// 			        	gameInfo.enemyTypes = 2;
// 			        	createNum = 1;
// 			        }

// 			        if(gameInfo.counter === 30){
// 			        	gameInfo.enemyTypes = 2;
// 			        	createNum = 4;
// 			        }

// 			        if(gameInfo.counter >= 34 && gameInfo.counter < 46){
// 			        	gameInfo.enemyTypes = 3;
// 			        	createNum = 1;
// 			        }

// 			        if(gameInfo.counter === 46){
// 			        	gameInfo.enemyTypes = 3;
// 			        	createNum = 5;
// 			        }

// 			        if(gameInfo.counter === 48){
// 			        	createWarning();
// 			        	createNum = 0;
// 			        }
	 
// 			        if(gameInfo.counter === 52){
// 			        	gameInfo.warning.group.hide();
// 			        	createDragon();
// 			        	createNum = 0;
// 			        }

// 			        if (gameInfo.counter <= preGame.progress) {
// 			        	if(createNum>0){
// 			        		createEnemy(createNum);
// 			        	}
// 			        }
// 		        }
//     		}
// 	    	checkEnemyStances();
// 	        drawEnemies();
// 	        drawDragon();
// 	        attackCastle();        
// 	        drawTutorial();
// 	        drawWarning();
//     	}
    	
//     } 

//     var prevFrame = 0;
// 	function callback(tframe) {
// 		if(!gameInfo.end){
// 			window.requestAnimationFrame(callback);	
// 	        update(tframe);
// 		    FPS = 1000 / (tframe - prevFrame);
// 		    STEP = 1 / FPS;
// 		    prevFrame = tframe;
// 		    drawUI();
// 		}
// 	}


	function onMouseDown(e){
		if(!gameInfo.gameover){
			var eX = 0;
	    	var eY = 0;
		    if (e.touches && e.touches.length) {
			    eX = e.touches[0].clientX;
			    eY = e.touches[0].clientY;
		    } else {
			    eX = e.clientX;
			    eY = e.clientY;
		    }
		    gameInfo.touched = true;
		    gameInfo.angle = Math.atan((eY - preGame.height/2 - preGame.diffY) / (eX - preGame.diffX)) * 180 / Math.PI;
		    if(preGame.rotated){
		    	gameInfo.angle = -1*Math.atan((eX - preGame.height/2 - preGame.diffY) / (eY - preGame.diffX)) * 180 / Math.PI;
		    }
		    gameInfo.weapon.rotate(gameInfo.angle, 0, preGame.sHeight/2);

		    if(gameInfo.paused){
		    	var origin = 0;
			    for (var k = arrows.length - 1; k >= 0; k--){
			    	if(!arrows[k].moving){
			    		origin = arrows[k];
			    	}
			    }

			    if(origin !== 0){
			    	origin.angle = gameInfo.angle;
				    origin.moving = true;
				    gameInfo.displayArrow.hide();
				    for (var m = origin.objarr.length - 1; m >= 0; m--) {
		    			var arrowObject = origin.objarr[m];
		    			var diff = origin.diffAngle;
	    				arrowObject.rotate(origin.angle+diff[m], -25, preGame.sHeight/2).show();
		    		}
			    }
		    }
		}
	}

	function onMouseMove(e) {
        if (!gameInfo.paused && !gameInfo.gameover && gameInfo.touched) {
            var eX = 0;
            var eY = 0;
	        if (e.changedTouches && e.changedTouches.length) {
		        eX = e.changedTouches[0].clientX;
		        eY = e.changedTouches[0].clientY;
	        } else {
		        eX = e.clientX;
		        eY = e.clientY;
	        }
	        gameInfo.angle = Math.atan((eY - preGame.height/2 - preGame.diffY) / (eX - preGame.diffX)) * 180 / Math.PI;
	        if(preGame.rotated){
		    	gameInfo.angle = -1*Math.atan((eX - preGame.height/2 - preGame.diffY) / (eY - preGame.diffX)) * 180 / Math.PI;
		    }
	        gameInfo.weapon.rotate(gameInfo.angle, 0, preGame.sHeight/2);
        }
    }

    function onMouseUp(e) {
        gameInfo.touched = false;
        if (gameInfo.tutorial) {
        	gameInfo.tutorialScreen.hide();
        	gameInfo.tutorial = false;
        	gameInfo.paused = false;
        	gameInfo.logo.show();
        }
    }

	function drawImage(parent,src,x,y){
		var image = parent.image(src).scale(preGame.scale);
		if(typeof(x) !== 'undefined' && typeof(y) !== 'undefined'){
			image.move(x,y);
		}
		return image;
	}

	function myScare(object, xscale, yscale, x, y){
		if(typeof(x) !== 'undefined' && typeof(y) !== 'undefined'){
			object.scale(xscale*preGame.scale, yscale*preGame.scale, x, y);
		}
		object.scale(xscale*preGame.scale, yscale*preGame.scale);
	}

	function myText(object, size, x, y){
		return object.font('size', size*preGame.scale).center(x*preGame.scale, y*preGame.scale);
	}

	function myMove(object, x, y){
		return object.move(x*preGame.scale, y*preGame.scale);
	}

	function myDmove(object, dx, dy){
		return object.dmove(dx*preGame.scale, dy*preGame.scale);
	}

	this.setDiff = function (diffX, diffY) {
    	preGame.diffX = diffX;
    	preGame.diffY = diffY;
    };

	this.setScale = function (width, height, scale) {
		preGame.scale = scale;
		preGame.width = width;
		preGame.height = height;
	};

	this.rotate = function(value) {
		preGame.rotated = value;
	};

	this.getWidth = function() {
		return preGame.sWidth;
	};

	this.getHeight = function(value) {
		return preGame.sHeight;
	};

	this.init = function() {
    	SVG.on(document, 'mousedown', onMouseDown);
		SVG.on(document, 'mousemove', onMouseMove);
		SVG.on(document, 'mouseup', onMouseUp);
		// SVG.on(document, 'touchstart', onMouseDown);
		// SVG.on(document, 'touchmove', onMouseMove);
		// SVG.on(document, 'touchend', onMouseUp);
	    timer = + new Date();
	    drawPre()
	    // callback(0);
    };
    return this;
}