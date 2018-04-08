
var gameFunc = function() {
	var CROSSBOW_WIDTH = 112;
    var CROSSBOW_HEIGHT = 154;
    var ARROW_WIDTH = 128;
    var ARROW_HEIGHT = 16;
    var PROGRESS_BAR_WIDTH = 333;
    var PROGRESS_BAR_HEIGHT = 51;
    var PROGRESS_WIDTH = 48;
    var PROGRESS_HEIGHT = 61;
    var BEETLE_WIDTH = 116;
    var BEETLE_HEIGHT = 96;
	var RABBIT_WIDTH = 214;
	var RABBIT_HEIGHT = 140;
	var MONSTER_WIDTH = 192;
	var MONSTER_HEIGHT = 171;
	var DRAGON_WIDTH = 196;
	var DRAGON_HEIGHT = 234;
	var FLAME_WIDTH = 200;
	var SMALL_LOGO_WIDTH = 218;
	var SMALL_LOGO_HEIGHT = 134;
	var WARNING_WIDTH = 512;
	var WARNING_HEIGHT = 128;
	var WARNING_BAR_UNIT_WIDTH = 75;
	var WARNING_BAR_UNIT_HEIGHT = 35;
	var INSTALL_WIDTH = 246;
    var INSTALL_HEIGHT = 82;
    var UPGRADE_WIDTH = 244;
    var UPGRADE_HEIGHT = 82;
    var CIRCLE_HEIGHT = 88;
    var APPEND_WIDTH = 357;
    var GOOGLE_URL = 'https://itunes.apple.com/us/app/defender-iii/id1131557212?mt=8';
	var SWIDTH = 1138;
	var SHEIGHT = 854;

	var preGame = {
		sWidth:1138,
		sHeight:854,
		scale:1,
		rotated:false,
		lastRotate:false,
		width:1138,
		height:854,
		castle:170,
		diffX:0,
		diffY:0,
		progress:52,
	    goal:36,
	    hp:1000,
	    suiHeight:640,
	    uiDiff:107,
    	eRange:107,
    	cut:0,
    	initScale:1,
	};

	var gameInfo = {
		touched:false,
	    paused:false,
	    tutorial:true,
	    tutorialShown:false,
	    handFocus:false,
	    tutorialType:1,
	    counter:1,
	    gameover:false,
	    coin:0,
		angle:0,
	    kills:0,
	    currentHp:preGame.hp,
	    enemyTypes:1,
	    end:false,
	};

    var FPS = 30;
    var INTERVAL = 1000/FPS;
    var STEP = INTERVAL/1000;
    var timer = 0;
    var arrows = [];
    var enemies = [];
    var arrowTick = 30;
    var bowLevel = 1;
    var levelFre = [1.5,2.5,3.5];
    var levelCoins = [10,20,80];
    var dragonScale = 1.5; 
    var l10n = {
	    tutorial: [
	        'Tap on the enemies to shoot!',
	        'Tap to upgrade!'
	    ] 
	};

	var enemyImages = {
    	beetle: {
    		run: beetleRun,
    		attack: beetleAttack,
    		death: beetleDeath, 
	    },
	    rabbit: {
		    run: rabbitRun,
		    attack: rabbitAttack,
		    death: rabbitDeath,
	    },
	    monster: {
		    run: monsterRun,
		    attack: monsterAttack,
		    death: monsterDeath,
	    }
    };
    var types = {
    	beetle:0,
    	rabbit:1,
    	monster:2
    };
	

	function drawBG(){
		gameInfo.bg = preGame.bgLayer.image(bgImage.src).scale(preGame.scale).move( 0, 0);
	}

	function drawBG_V(){
		gameInfo.bg = preGame.bgLayer.image(bgImageV.src).scale(preGame.scale).move( 0, 0);
	}

	function drawCoin(){
		gameInfo.curCoinGroup = preGame.uiLayer.group().scale(preGame.scale);
		gameInfo.curCoinImage = gameInfo.curCoinGroup.image(coinImage.src).move(0, 0);
		gameInfo.currentCoin = gameInfo.curCoinGroup.text(''+gameInfo.coin).font({fill: '#ffffff',family: 'Cooper',size:30});
		gameInfo.currentCoin.center(46, 10);
		if(preGame.rotated){
   			gameInfo.curCoinGroup.move(preGame.sWidth/2+8, preGame.uiDiff+50);
   		}else{
   			gameInfo.curCoinGroup.move(328, preGame.uiDiff+40);	
   		}
		
	}

	function drawLogo(){
		gameInfo.logo = preGame.uiLayer.image(logoImage.src).scale(preGame.scale);
		if(preGame.rotated){
   			gameInfo.logo.move(preGame.sWidth-199, preGame.uiDiff+0);
   		}else{
   			gameInfo.logo.move(preGame.sWidth-190, preGame.sHeight-preGame.uiDiff-118);	
   		}
	}

	function drawInstallButton(){
		gameInfo.install = preGame.uiLayer.image(installButtonImage.src).scale(preGame.scale).move((preGame.sWidth-INSTALL_WIDTH)/2,preGame.uiDiff+10);//install按钮
		gameInfo.install.off('click').click(function() {
		  redictAd();
		});
	}

	function drawInstallButton_V(){
		gameInfo.install = preGame.uiLayer.image(installButtonImage.src).scale(preGame.scale).move(preGame.sWidth-INSTALL_WIDTH-12,preGame.sHeight-preGame.uiDiff-100);//install按钮
		gameInfo.install.off('click').click(function() {
		  redictAd();
		});
	}

	function drawProgress() {//游戏进度条
		gameInfo.progressGroup = preGame.uiLayer.group().scale(preGame.scale);
		gameInfo.progressGroup.image(progressBarImage.src).move(-24, 24);
		gameInfo.progressObj = gameInfo.progressGroup.image(progressImage.src).move(PROGRESS_BAR_WIDTH-PROGRESS_WIDTH-250*gameInfo.counter/preGame.progress-56, 12);
    	if(preGame.rotated){
			gameInfo.progressGroup.move(preGame.sWidth-PROGRESS_BAR_WIDTH+12, 148);
		}else{
			gameInfo.progressGroup.move(preGame.sWidth-PROGRESS_BAR_WIDTH, preGame.uiDiff);
		}
    }

	function drawGameHp(){
		gameInfo.hpGroup = preGame.uiLayer.group().scale(preGame.scale);
		gameInfo.hpGroup.image(hpBarImage.src).move(CIRCLE_HEIGHT-16, -65);
		gameInfo.hpfill = gameInfo.hpGroup.image(hpFillImage.src).move(CIRCLE_HEIGHT-42, -61);
		gameInfo.hpGroup.image(hpCircleImage.src).move(0, -CIRCLE_HEIGHT-12);
		gameInfo.hpGroup.image(hpAddImage.src).move(23, -76);
		gameInfo.hptext = gameInfo.hpGroup.text(gameInfo.currentHp  + '/' +  preGame.hp).font({fill: '#ffffff',family: 'Cooper',size:24}).center(201, -53);
		if(preGame.rotated){
			gameInfo.hpGroup.move(8, preGame.sHeight-preGame.uiDiff);
		}else{
			gameInfo.hpGroup.move(24, preGame.sHeight-preGame.uiDiff);
		}
	}

	function drawWeapon(){
		gameInfo.weaponGroup = preGame.uiLayer.group().scale(preGame.scale).move(0, preGame.sHeight/2);
		gameInfo.weapon = gameInfo.weaponGroup.image(crossbowImage[0].src).move(-20, -CROSSBOW_HEIGHT/2);//弓
		gameInfo.displayArrow = gameInfo.weaponGroup.image(arrowImage.src).move(-17, -ARROW_HEIGHT/2);//显示箭
	}

   function drawUpgradeBow(){
	   	if(typeof gameInfo.upgradeGroup === 'undefined'){
	   		gameInfo.upOpacity = 0;
			gameInfo.upOpacityAnim = 0.06;
	   		gameInfo.upgradeGroup = preGame.uiLayer.group().scale(preGame.scale);
	   		if(preGame.rotated){
	   			gameInfo.upgradeGroup.move(8, preGame.uiDiff+22);
	   		}else{
	   			gameInfo.upgradeGroup.move(24, preGame.uiDiff+12);	
	   		}
	   		gameInfo.upgradeGroup.image(upgradeBowImage.src).move(0, 0);
	   		gameInfo.upgradeGroup.image(coinImage.src).move(120, 25);
			gameInfo.upbow = gameInfo.upgradeGroup.image(crossIcon[0].src).move(30, 9);
			gameInfo.coinText = gameInfo.upgradeGroup.text(''+levelCoins[bowLevel-1]).font({fill: 'red',family: 'Cooper',size:30}).center(175, 38);
			gameInfo.upgradeRect = gameInfo.upgradeGroup.image(upgradeMask.src).move(0, 0).style({opacity:gameInfo.upOpacity});
	   	}else{
	   		if(gameInfo.coin >= levelCoins[bowLevel-1]){
	   			if(bowLevel === 1 && !gameInfo.tutorialShown){
	   				gameInfo.handFocus.remove();
	   				gameInfo.handFocus = false;
	   				gameInfo.tutorialType = 2;
	        		createTutorial(24, preGame.uiDiff+12);
	        		gameInfo.tutorialShown = true;
	   			}
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
    }

	function drawPre(){
		preGame.bgLayer = SVG('bg').size(preGame.width, preGame.height);
		preGame.uiLayer = SVG('ui').size(preGame.width, preGame.height);
		preGame.gameLayer = SVG('game').size(preGame.width, preGame.height);//svg
		preGame.appendLayer = SVG('append').size(preGame.width+2*preGame.diffX, preGame.height+2*preGame.diffY);//svg
		if(preGame.rotated){
			drawBG_V();
			drawInstallButton_V();
		}else{
			drawBG();
			drawInstallButton();
		}
		
		if(preGame.diffX !== 0 && !preGame.rotated){
			gameInfo.appendGroup = preGame.appendLayer.group().scale(preGame.scale).move((preGame.diffX+preGame.width/2)/preGame.scale,0);
			gameInfo.appendLeft = gameInfo.appendGroup.image(appendLSideImage.src).move(-APPEND_WIDTH-preGame.width/(2*preGame.scale), 0);
			gameInfo.appendRight = gameInfo.appendGroup.image(appendRSideImage.src).move(preGame.width/(2*preGame.scale), 0);
		}
		drawCoin();
		drawProgress();
		drawLogo();
		drawGameHp();
		drawWeapon();
		drawUpgradeBow();
		createEnemy(1);
		gameInfo.tenemy = enemies[0];
		gameInfo.tenemy.x = preGame.sWidth-200;
		if(gameInfo.tenemy.y < preGame.uiDiff+104 || gameInfo.tenemy.y > 500){
			gameInfo.tenemy.y = 460;
		}
		drawArrows();
		drawEnemies();
		createTutorial(gameInfo.tenemy.x, gameInfo.tenemy.y);
	}

    function createEnemy(num){//怪
    	enemyType = 0;
    	if(gameInfo.enemyTypes == 2){ 
			enemyType = 1;
    	}

    	if(gameInfo.enemyTypes == 3){
			enemyType = 2;
    	}
    	for (var i = enemies.length - 1; i >= 0; i--) {
    		enemy = enemies[i];
    		if(!enemy.shown && enemyType === types[enemy.type]){
    			switch(enemyType){
		    		case 0:
						enemy.y=rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange-BEETLE_HEIGHT-22);
						enemy.currentHp=50;
			    		break;
			    	case 1:
						enemy.y=rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange-RABBIT_HEIGHT-22);
						enemy.currentHp=120;
			    		break;
					case 2:
						enemy.y=rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange-MONSTER_HEIGHT-22);
						enemy.currentHp=250;
						break;
		    	}
		    	for (var j = enemy.monster.length - 1; j >= 0; j--) {
		    		enemy.monster[j].hide();
		    	}
		    	enemy.speed = preGame.sWidth/(1000/150);
				enemy.x=preGame.sWidth;
		    	enemy.stance='run';
				enemy.stanceFrame=0;
				enemy.stanceFrames=enemyImages[enemy.type]['run'].length;
				enemy.monster=enemy.run;
				enemy.animTick=0;
				enemy.attackTick=0;
				enemy.hpbar.show();
		    	enemy.hpfill.show();
		    	enemy.shadow.show();
		    	enemy.hpfill.move(2,2);
		    	myScare(enemy.hpfill,1,1,2,2);
		    	enemy.shown=true;
		    	num--;
		    	if(num <= 0){
		    		break;
		    	}
    		}
    	}

    	for (var j = num - 1; j >= 0; j--) {
    		var group = preGame.gameLayer.group().scale(preGame.scale).hide();
	    	var monster = [];
	    	switch(enemyType){
    		case 0:
    			for (var i = 0; i <= enemyImages['beetle']['run'].length - 1; i++) {
    				monster[i] = group.image(enemyImages['beetle']['run'][i].src).move(0,0).hide();
    			}
    			enemies.push({
	    			type:'beetle',
	    			x:preGame.sWidth,
	    			y:rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange-BEETLE_HEIGHT-22),
	    			speed:preGame.sWidth/(1000/150),
	    			stance:'run',
	    			stanceFrame:0,
	    			stanceFrames:4,
	    			hp:50,
	    			currentHp:50,
	    			attack:30,
	    			width:BEETLE_WIDTH,
	    			height:BEETLE_HEIGHT,
	    			animTick: 0,
				    attackTick: 0,
				    attackFre: 2,
	    			hpbar:group.image(monsterHpBarImage.src).move(0,0),
					hpfill:group.image(monsterHpBarFillImage.src).move(2,2),
					monster:monster,
					group:group,
					shown:true,
					run:monster,
	    		});
	    		break;
	    	case 1:
	    		for (var i = 0; i <= enemyImages['rabbit']['run'].length - 1; i++) {
					monster[i] = group.image(enemyImages['rabbit']['run'][i].src).move(0,0).hide();
				}
				enemies.push({
	    			type:'rabbit',
	    			x:preGame.sWidth,
	    			y:rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange- RABBIT_HEIGHT-22),
	    			speed:preGame.sWidth/(1000/150),
	    			stance:'run',
	    			stanceFrame:0,
	    			stanceFrames:6,
	    			hp:120,
	    			currentHp:120,
	    			attack:30,
	    			width:RABBIT_WIDTH,
	    			height:RABBIT_HEIGHT,
	    			animTick: 0,
				    attackTick: 0,
				    attackFre: 1.5,
	    			hpbar:group.image(monsterHpBarImage.src).move(0,0),
					hpfill:group.image(monsterHpBarFillImage.src).move(2,2),
					monster:monster,
					group:group,
					shown:true,
					run:monster,
	    		});
	    		break;
			case 2:
				for (var i = 0; i <= enemyImages['monster']['run'].length - 1; i++) {
					monster[i] = group.image(enemyImages['monster']['run'][i].src).move(0,0).hide();
				}
				enemies.push({
					type:'monster',
					x:preGame.sWidth,
					y:rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange- MONSTER_HEIGHT-22),
					speed:preGame.sWidth/(1000/150),
					stance:'run',
					stanceFrame:0,
					stanceFrames:6,
					hp:250,
					currentHp:250,
					attack:30,
					width:MONSTER_WIDTH,
					height:MONSTER_HEIGHT,
					animTick: 0,
				    attackTick: 0,
				    attackFre: 1,
					hpbar:group.image(monsterHpBarImage.src).move(0,0),
					hpfill:group.image(monsterHpBarFillImage.src).move(2,2),
					monster:monster,
					group:group,
					shown:true,
					run:monster,
				});
				break;
	    	}
    	}
    	
	}

	function adjust(eI) {
    	var enemy = enemies[eI];
    	var x = 0;
    	var y = 0;
    	switch (enemy.type) {
		    case 'beetle':
			    x = -15;
			    y = 0;
		        break;
	        case 'rabbit':
	    		x = -45;
			    y = -10;
		    break;
		    case 'monster':
	    		x = -65;
			    y = 0;
			    break;
	    }
	    var ret = [x,y];
	    return ret;
    }

    function shadowPositon(eI) {//怪的阴影
    	var enemy = enemies[eI];
    	var x = 0;
    	var y = 0;
    	switch (enemy.type) {
		    case 'beetle':
			    x = -4;
			    y = BEETLE_HEIGHT-28;
		        break;
	        case 'rabbit':
	    		x = -2;
			    y = RABBIT_HEIGHT-38;
		    break;
		    case 'monster':
	    		x = -2;
			    y = MONSTER_HEIGHT-38;
			    break;
	    }
	    var ret = [x,y];
	    return ret;
    }

	function drawEnemies(step){//怪变化
		for (var i = enemies.length - 1; i >= 0; i--) {
			enemy = enemies[i];
			if(enemy.shown){
				if (enemy.stance === 'run') {
				    enemy.x = enemy.x - enemy.speed * STEP;
			    }

				if(enemy.currentHp > 0){//怪的血量
					var a= Math.round(enemy.currentHp/enemy.hp*100)/100;
					myScare(enemy.hpfill,a,1,2,2);
				}

				var diff = adjust(i);
				for (var j = 0; j <= enemy.monster.length - 1; j++) {
					if(j === enemy.stanceFrame){
						enemy.monster[j].show().move(diff[0], diff[1]);
					}else{
						enemy.monster[j].hide();
					}
				}
				groupMove(enemy.group.show(), enemy.x, enemy.y);
				// enemy.group.show().move(enemy.x, enemy.y);

				if(typeof enemy.shadow === 'undefined'){
					enemy.shadow = preGame.bgLayer.image(monsterShadow.src).scale(preGame.scale).move(0,0).style('opacity:0.7;');
				}
				var shadowDiff = shadowPositon(i);
				enemy.shadow.scale(preGame.scale, 0,0);
				enemy.shadow.scale(preGame.scale).move(enemy.x+shadowDiff[0], enemy.y+shadowDiff[1]);

				enemy.animTick++;
			    if (enemy.animTick > Math.round(7 / (60 / FPS))) {
				    enemy.stanceFrame++;
				    if (enemy.stance === 'death' && enemy.stanceFrame === enemy.stanceFrames) {
					    enemy.stance = 'decay';
				    }
				    if (enemy.stance !== 'decay') {
					    enemy.stanceFrame = enemy.stanceFrame % enemy.stanceFrames;
				    } else {
					    enemy.stanceFrame--;
				    }
				    enemy.animTick = 0;
			    }
			    if (enemy.stance === 'attack') {
				    enemy.attackTick++;
			    }
			}
		}
	}

	function checkEnemyStances(){//怪的状态
		for (var i = enemies.length - 1; i >= 0; i--) {
			enemy = enemies[i];
			if(enemy.shown){
				if(enemy.stance === 'run' && Math.round(enemy.x) <= preGame.castle){
					enemy.stance = 'attack';
					enemy.stanceFrame = 0;
					enemy.stanceFrames = enemyImages[enemy.type]['attack'].length;
					for (var j = 0; j <= enemy.monster.length - 1; j++) {
	    				enemy.monster[j].hide();
	    			}
	    			if(typeof enemy.attackAct === 'undefined'){
	    				enemy.attackAct = [];
	    				for (var j = 0; j <= enemyImages[enemy.type]['attack'].length - 1; j++) {
		    				enemy.attackAct[j]=enemy.group.image(enemyImages[enemy.type]['attack'][j].src).hide();
		    			}
	    			}
	    			enemy.monster = enemy.attackAct;
				}

				if((enemy.stance === 'decay')){
					for (var j = 0; j <= enemy.monster.length - 1; j++) {
	    				enemy.monster[j].hide();
	    			}
	    			enemy.shadow.hide();
					enemy.group.hide();
					enemy.shown = false;
				}
			}
			
		}
	}

	function killEnemy(EI){//移除怪
		var enemy = enemies[EI];
	    enemy.stance = 'death';
	    enemy.stanceFrame = 0;
	    enemy.stanceFrames = enemyImages[enemy.type]['death'].length;
	    for (var j = 0; j <= enemy.monster.length - 1; j++) {
			enemy.monster[j].hide();
		}
		if(typeof enemy.death === 'undefined'){
			enemy.death = [];
			for (var j = 0; j <= enemyImages[enemy.type]['death'].length - 1; j++) {
				enemy.death[j]=enemy.group.image(enemyImages[enemy.type]['death'][j].src).hide();
			}
		}
		enemy.monster = enemy.death;
	    enemy.hpbar.hide();
	    enemy.hpfill.hide();
	    if(enemy === gameInfo.tenemy){
	    	gameInfo.tenemy = false;
	    }
	}
	
    function createDragon(){
    	if(typeof gameInfo.dragon === 'undefined'){
	    	var dgroup = preGame.gameLayer.group().scale(preGame.scale);
	    	var dmonster = [];
	    	for (var i = 0; i <= dragonRun.length - 1; i++) {
				dmonster[i] = dgroup.image(dragonRun[i].src).move(0,0).hide();
			}
			gameInfo.dragon = {
				x:preGame.sWidth,
				y:rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale),
				speed:preGame.sWidth/(1000/400),
				stance:'run',
				stanceFrame:0,
				stanceFrames:8,
				hp:15000,
				currentHp:15000,
				animTick:0,
				attack:200,
				flameAttack:1000,
				attackTick:1,
				flameAttackTick:1,
			    attackNum: 1,
			    desY:rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale),
			    desX:rnd(270, preGame.sWidth-DRAGON_WIDTH*dragonScale),
			    historyTime: +new Date(),
			    monster:dmonster,
				hpbar:dgroup.image(monsterHpBarImage.src).move(0,0),
				hpfill:dgroup.image(monsterHpBarFillImage.src).move(2,2),
				group:dgroup,
				flameY:0,
				flameX:0,
				flameFrame:0,
				flameSpeed:preGame.sWidth/(1000/500),
				angle:0,
				rev:1,
				shown:true,
				run:dmonster,
				flameShown:false,
			};
		}else{
			gameInfo.dragon.x=preGame.sWidth;
			gameInfo.dragon.y=rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale);
			gameInfo.dragon.speed=preGame.sWidth/(1000/400);
			gameInfo.dragon.stance='run';
			gameInfo.dragon.stanceFrame=0;
			gameInfo.dragon.stanceFrames=8;
			gameInfo.dragon.currentHp=15000;
			gameInfo.dragon.animTick=0;
			gameInfo.dragon.attackTick=1;
			gameInfo.dragon.flameAttackTick=1;
		    gameInfo.dragon.attackNum= 1;
		    gameInfo.dragon.historyTime= +new Date();
		    gameInfo.dragon.angle=0;
			gameInfo.dragon.rev=1;
			gameInfo.dragon.shown=true;
			gameInfo.dragon.flameShown = false;
			gameInfo.dragon.hpbar.show();
	    	gameInfo.dragon.hpfill.show();
	    	gameInfo.dragon.shadow.show();
	    	myScare(gameInfo.dragon.hpfill,dragonScale,dragonScale,2,2);
	    	gameInfo.dragon.monster=gameInfo.dragon.run;
		}
    }

	function changeDestination(x){
		var r = rnd(preGame.castle+100, preGame.sWidth-DRAGON_WIDTH);
		var rx = ( r > preGame.castle+100) ? r : preGame.castle+100;
		gameInfo.dragon.desX = (x > 0) ? x : rx;
		gameInfo.dragon.desY = rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale);
		gameInfo.dragon.angle = Math.atan((gameInfo.dragon.y - gameInfo.dragon.desY) / (gameInfo.dragon.x - gameInfo.dragon.desX)) * 180 / Math.PI;
		gameInfo.dragon.rev = (gameInfo.dragon.x - gameInfo.dragon.desX < 0) ? -1 : 1;
	}
	
	function drawDragon(step){
		if(typeof gameInfo.dragon !== 'undefined' && gameInfo.dragon.shown){
			var reset = false;
			var now = + new Date();
			if(typeof gameInfo.dragonTurn !== 'undefined' && gameInfo.dragonTurn){
				reset = true;
				gameInfo.dragonTurn = false;
			}
		    if(gameInfo.dragon.stance === 'run' && gameInfo.dragon.historyTime+3000 < now){
		    	if(gameInfo.dragon.attackNum < 3){
		    		gameInfo.dragon.stance = 'attack';
		    		gameInfo.dragon.stanceFrame = 0;
					gameInfo.dragon.stanceFrames = dragonNormalAttack.length;
					for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
						gameInfo.dragon.monster[j].hide();
	    			}
					if(typeof gameInfo.dragon.attackAct === 'undefined'){
						gameInfo.dragon.attackAct = [];
						for (var j = 0; j <= dragonNormalAttack.length - 1; j++) {
		    				gameInfo.dragon.attackAct[j]=gameInfo.dragon.group.image(dragonNormalAttack[j].src).hide();
		    			}
					}
	    			gameInfo.dragon.monster = gameInfo.dragon.attackAct;
	    			changeDestination(preGame.castle);
		    		gameInfo.dragon.speed = (preGame.sWidth/(1000/800));
		    		gameInfo.dragon.attackNum++;
		    	}else if(gameInfo.dragon.attackNum === 3){
		    		gameInfo.dragon.stance = 'falming';
		    		if(gameInfo.dragon.historyTime+4200 > now){
						if(typeof gameInfo.dragon.storage === 'undefined'){
							gameInfo.dragon.storage = [];
							for (var j = 0; j <= dragonStorage.length - 1; j++) {
			    				gameInfo.dragon.storage[j]=gameInfo.dragon.group.image(dragonStorage[j].src).hide();
			    			}
			    			gameInfo.dragon.storageFrame = 0;
						}
		    		}
		    	}
		    }

		    if(gameInfo.dragon.stance === 'attack' && gameInfo.dragon.stanceFrame === dragonNormalAttack.length-1){
			    gameInfo.dragon.stance = 'run';
	    		gameInfo.dragon.stanceFrame = 0;
				gameInfo.dragon.stanceFrames = dragonRun.length;
				for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
					gameInfo.dragon.monster[j].hide();
    			}
				gameInfo.dragon.monster = gameInfo.dragon.run;
	    		reset = true;
    			gameInfo.dragon.historyTime = + new Date();
		    }

		    if(gameInfo.dragon.stance === 'attack' && gameInfo.dragon.stanceFrame === 0 && Math.round(gameInfo.dragon.x) < preGame.castle){
		    	gameInfo.dragon.attackTick = 0;
		    	gameInfo.dragon.stanceFrame++;
		    }

		    if(gameInfo.dragon.stance === 'falming'){
		    	if(gameInfo.dragon.monster !== gameInfo.dragon.falming &&gameInfo.dragon.historyTime+4200 < now){
		    		gameInfo.dragon.stanceFrame = 0;
					gameInfo.dragon.stanceFrames = dragonAttack.length;
					for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
						gameInfo.dragon.monster[j].hide();
	    			}
					if(typeof gameInfo.dragon.falming === 'undefined'){
						gameInfo.dragon.falming = [];
						for (var j = 0; j <= dragonAttack.length - 1; j++) {
		    				gameInfo.dragon.falming[j]=gameInfo.dragon.group.image(dragonAttack[j].src).hide();
		    			}
					}
					gameInfo.dragon.monster = gameInfo.dragon.falming;
	    			gameInfo.dragon.attackNum++;
		    	}

		    	if(gameInfo.dragon.monster === gameInfo.dragon.falming && gameInfo.dragon.stanceFrame === dragonAttack.length-1){
				    gameInfo.dragon.stance = 'run';
		    		gameInfo.dragon.stanceFrame = 0;
					gameInfo.dragon.stanceFrames = dragonRun.length;
					for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
						gameInfo.dragon.monster[j].hide();
						if(j < gameInfo.dragon.storage.length){
						   gameInfo.dragon.storage[j].hide();
						}
	    			}
	    			gameInfo.dragon.monster = gameInfo.dragon.run;
	    			reset = true;
	    			gameInfo.dragon.flameX = gameInfo.dragon.x-FLAME_WIDTH;
	    			gameInfo.dragon.flameY = gameInfo.dragon.y-10;
	    			if(typeof gameInfo.dragon.flame === 'undefined'){
	    				gameInfo.dragon.flame = [];
						for (var j = 0; j <= dragonFlames.length - 1; j++) {
		    				gameInfo.dragon.flame[j]=preGame.gameLayer.image(dragonFlames[j].src).scale(preGame.scale*dragonScale).hide();
		    			}
					}
	    			gameInfo.dragon.flameShown = true;
	    			gameInfo.dragon.flameAttackTick = 0;
			    }
		    }

		    if((gameInfo.dragon.stance === 'decay')){
		    	for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
    				gameInfo.dragon.monster[j].hide();
    			}
				gameInfo.dragon.group.hide();
			}

			if(gameInfo.dragon.angle === 0){
				gameInfo.dragon.angle = Math.atan((gameInfo.dragon.y - gameInfo.dragon.desY) / (gameInfo.dragon.x - gameInfo.dragon.desX)) * 180 / Math.PI;
			}

			if((gameInfo.dragon.stance !== 'attack' && gameInfo.dragon.x < preGame.castle-20) || gameInfo.dragon.y < preGame.uiDiff 
				|| gameInfo.dragon.x > preGame.sWidth ||  gameInfo.dragon.y > preGame.sHeight-DRAGON_HEIGHT){
				reset = true;
			}

			if(gameInfo.dragon.stance === 'run' && Math.abs(Math.round(gameInfo.dragon.x-gameInfo.dragon.desX)) <= 5 
			    	&& Math.abs(Math.round(gameInfo.dragon.y-gameInfo.dragon.desY)) <= 5 ){
				reset = true;
			}

			if(reset){
	    		changeDestination();
	    		gameInfo.dragon.speed = (preGame.sWidth/(1000/400));
		    }

			if (gameInfo.dragon.stance === 'run' || (gameInfo.dragon.stance === 'attack' && gameInfo.dragon.stanceFrame === 0)) {
			    gameInfo.dragon.x = gameInfo.dragon.x - gameInfo.dragon.rev*gameInfo.dragon.speed*Math.cos(gameInfo.dragon.angle * Math.PI/180)* STEP;
			    gameInfo.dragon.y = gameInfo.dragon.y - gameInfo.dragon.rev*gameInfo.dragon.speed*Math.sin(gameInfo.dragon.angle * Math.PI/180)* STEP;
		    }

			if(gameInfo.dragon.currentHp > 0){//怪的血量
				var a= Math.round(gameInfo.dragon.currentHp/gameInfo.dragon.hp*100)/100;
				myScare(gameInfo.dragon.hpfill,a*dragonScale,dragonScale,2,2);
				myScare(gameInfo.dragon.hpbar, dragonScale, dragonScale);
			}

			for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
				if(j === gameInfo.dragon.stanceFrame){
					myScare(gameInfo.dragon.monster[j], dragonScale, dragonScale);
					gameInfo.dragon.monster[j].show().move(-30,-60);
				}else{
					gameInfo.dragon.monster[j].hide();
				}
			}

			if(gameInfo.dragon.stance === 'falming'){
				for (var j = 0; j <= gameInfo.dragon.storage.length - 1; j++) {
					if(j === gameInfo.dragon.storageFrame){
					   myScare(gameInfo.dragon.storage[j], dragonScale, dragonScale);
					   gameInfo.dragon.storage[j].show().forward().move(-40,-60);
					}else{
					   gameInfo.dragon.storage[j].hide();
					}
				}
			}

			if(typeof gameInfo.dragon.shadow === 'undefined'){
				gameInfo.dragon.shadow = preGame.bgLayer.image(monsterShadow.src).scale(preGame.scale).move(0,0).style('opacity:0.7;');
			}
			groupMove(gameInfo.dragon.group.show(), gameInfo.dragon.x, gameInfo.dragon.y);
			gameInfo.dragon.shadow.scale(preGame.scale*dragonScale, 0,0);
			gameInfo.dragon.shadow.scale(preGame.scale*dragonScale).move(gameInfo.dragon.x/dragonScale, (gameInfo.dragon.y+DRAGON_HEIGHT-10)/dragonScale);
			
			if(gameInfo.dragon.flameShown && typeof gameInfo.dragon.flame !== 'undefined'){
				if(gameInfo.dragon.flameX > -200){
					gameInfo.dragon.flameX = gameInfo.dragon.flameX - gameInfo.dragon.flameSpeed * STEP;
					for (var j = 0; j <= gameInfo.dragon.flame.length - 1; j++) {
						if(j === gameInfo.dragon.flameFrame){
							gameInfo.dragon.flame[j].scale(preGame.scale*dragonScale, 0,0);
							gameInfo.dragon.flame[j].scale(preGame.scale*dragonScale).move(gameInfo.dragon.flameX/dragonScale, gameInfo.dragon.flameY/dragonScale).show();
						}else{
							gameInfo.dragon.flame[j].hide();
						}
					}
				}else{
					for (var j = 0; j <= gameInfo.dragon.flame.length - 1; j++) {
						gameInfo.dragon.flame[j].hide();
					}
				}
			}

			gameInfo.dragon.animTick++;
		    if (gameInfo.dragon.animTick > Math.round(7 / (60 / FPS))) {
			    if (gameInfo.dragon.stance === 'death' && gameInfo.dragon.stanceFrame === gameInfo.dragon.stanceFrames-1) {
				    gameInfo.dragon.stance = 'decay';
			    }

			    if (gameInfo.dragon.stance !== 'attack' && gameInfo.dragon.stance !== 'decay') {
			    	gameInfo.dragon.stanceFrame++;
				    gameInfo.dragon.stanceFrame = gameInfo.dragon.stanceFrame % gameInfo.dragon.stanceFrames;
			    }

			    if(gameInfo.dragon.stance === 'falming'){
			    	gameInfo.dragon.storageFrame++;
			    	gameInfo.dragon.storageFrame = gameInfo.dragon.storageFrame % gameInfo.dragon.storage.length;
			    }

			    if(gameInfo.dragon.flameShown && typeof gameInfo.dragon.flame !== 'undefined' && gameInfo.dragon.flameX > 0){
			    	gameInfo.dragon.flameFrame++;
			    	gameInfo.dragon.flameFrame = gameInfo.dragon.flameFrame % gameInfo.dragon.flame.length;
			    }
			    gameInfo.dragon.animTick = 0;
		    }
		}
	}

	function killDragon(){
	    gameInfo.dragon.stance = 'death';
	    gameInfo.dragon.stanceFrame = 0;
	    gameInfo.dragon.stanceFrames = dragonDeath.length;
	    for (var j = 0; j <= gameInfo.dragon.monster.length - 1; j++) {
			gameInfo.dragon.monster[j].hide();
			if(gameInfo.dragon.type === 'flaming' && j < gameInfo.dragon.storage.length){
				gameInfo.dragon.storage[j].hide();
			}
		}
		if(typeof gameInfo.dragon.death === 'undefined'){
			gameInfo.dragon.death = [];
			for (var j = 0; j <= dragonDeath.length - 1; j++) {
				gameInfo.dragon.death[j]=gameInfo.dragon.group.image(dragonDeath[j].src).hide();
			}
		}
		gameInfo.dragon.monster = gameInfo.dragon.death;
	    gameInfo.dragon.hpbar.hide();
	    gameInfo.dragon.hpfill.hide();
	    gameInfo.dragon.shadow.hide();
	}

	function attackCastle(){//攻击城墙
		if (gameInfo.currentHp <= 0) {
		   	return;
		}
		for (var i = enemies.length - 1; i >= 0; i--) {
			enemy = enemies[i];
    		var attackTick = 0;
	    	switch (enemy.type) {
			    case 'beetle':
			    case 'rabbit':
				    attackTick = 2;
			        break;
			    case 'monster':
		    		attackTick = 3;
				    break;
		    }
			if (enemy.stance === 'attack' && enemy.stanceFrame === attackTick && enemy.animTick === 0) {
			    gameInfo.currentHp -= enemy.attack;
			    enemy.attackTick = 0;
		    }			
		}
		if(typeof gameInfo.dragon !== 'undefined'){
			if(gameInfo.dragon.stance === 'attack' && gameInfo.dragon.attackTick === 0 && Math.round(gameInfo.dragon.x) <= preGame.castle){
				gameInfo.currentHp -= gameInfo.dragon.attack;
				gameInfo.dragon.attackTick = 1;
			}

			if(typeof gameInfo.dragon.flame !== 'undefined' && gameInfo.dragon.flameAttackTick === 0 && Math.round(gameInfo.dragon.flameX) <= preGame.castle-45*dragonScale){
				gameInfo.currentHp -= gameInfo.dragon.flameAttack;
				gameInfo.dragon.flameAttackTick = 1;
			}
		}
	}

    function newArrow() {//箭
    	gameInfo.displayArrow.rotate(gameInfo.angle, 0, 0).show();
    	if(bowLevel === 1){
    		var obj = preGame.gameLayer.image(arrowImage.src).scale(preGame.scale).move(-17, preGame.sHeight/2-ARROW_HEIGHT/2).hide();
		    var objarr = [obj];
	    	arrows.push({
	    		moving: false,
	        	speed: 1444,
	    		angle:gameInfo.angle,
	    		objarr:objarr,
	    		attack:35,
	    		diffAngle:[0],
	    	});
    	}else if(bowLevel === 2){
    		var obj1 = preGame.gameLayer.image(arrowImage.src).scale(preGame.scale).move(-17, preGame.sHeight/2-ARROW_HEIGHT/2).hide();
	    	var obj2 = preGame.gameLayer.image(arrowImage.src).scale(preGame.scale).move(-17, preGame.sHeight/2-ARROW_HEIGHT/2).hide();
		    var objarr = [obj1, obj2];
	    	arrows.push({
	    		moving: false,
	        	speed: 1444,
	    		angle:gameInfo.angle,
	    		objarr:objarr,
	    		attack:50,
	    		diffAngle:[-1.5, 1.5],
	    	});
    	}else if(bowLevel === 3){
    		var obj1 = preGame.gameLayer.image(arrowImage.src).scale(preGame.scale).move(-17, preGame.sHeight/2-ARROW_HEIGHT/2).hide();
	    	var obj2 = preGame.gameLayer.image(arrowImage.src).scale(preGame.scale).move(-17, preGame.sHeight/2-ARROW_HEIGHT/2).hide();
	    	var obj3 = preGame.gameLayer.image(arrowImage.src).scale(preGame.scale).move(-17, preGame.sHeight/2-ARROW_HEIGHT/2).hide();
		    var objarr = [obj1, obj2, obj3];
	    	arrows.push({
	    		moving: false,
	        	speed: 1444,
	    		angle:gameInfo.angle,
	    		objarr:objarr,
	    		attack:100,
	    		diffAngle:[-3, 0, 3],
	    	});
    	}
    }


    function drawArrows() {//箭的路径与碰撞
    	if(gameInfo.touched){
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
	    			arrowObject.move(-17, preGame.sHeight/2-ARROW_HEIGHT/2);
    				arrowObject.rotate(origin.angle+diff[m], 0, preGame.sHeight/2).show();
	    		}
		    }
    	}

    	var flag = false;
    	for (var k = arrows.length - 1; k >= 0; k--){
	    	if(!arrows[k].moving){
	    		flag = true;
	    	}
	    }
    	if(!flag && arrowTick++ > Math.round(FPS/levelFre[bowLevel-1])){
    		newArrow();
    		arrowTick = 0;
    	}

    	for (var k = arrows.length - 1; k >= 0; k--) {
    		var arrow = arrows[k];
    		var passNum = 0;
    		for (var m = arrow.objarr.length - 1; m >= 0; m--) {
    			var arrowObject = arrow.objarr[m];
    			if (arrow.moving) {
	            	arrowObject.dmove(arrow.speed*STEP, 0);
	        	}

	    		if ((arrowObject.x() > preGame.sWidth) || (arrowObject.x() < -26) || (arrowObject.y() > preGame.sHeight) || (arrowObject.y() < 0)) {
	    			arrowObject.remove();
	    			arrow.objarr.splice(m, 1);
	    			passNum++;
	    			continue;
		        }

		        if( (typeof gameInfo.dragon !== 'undefined' && gameInfo.dragon.shown) && (gameInfo.dragon.stance !=='death' && gameInfo.dragon.stance !== 'decay')
		        	&& (((arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) > gameInfo.dragon.x+40) 
		        		&& ((arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) < gameInfo.dragon.x + DRAGON_WIDTH*dragonScale)) 
			        &&(( preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) > gameInfo.dragon.y+50) 
			        	&& (preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) < gameInfo.dragon.y+(DRAGON_HEIGHT-60)*dragonScale))){
				        gameInfo.dragon.currentHp -= arrow.attack;
			        	if (gameInfo.dragon.currentHp <= 0) {
					        gameInfo.coin += 2;
					        gameInfo.kills++;
			        		killDragon();
				        }
	    				arrowObject.remove();
	    				arrow.objarr.splice(m, 1);
	    				passNum++;
	    				continue;
		        }

		        var shot = false;
	        	for (var i = 0; i < enemies.length && !shot; i++) {
		        	var enemy = enemies[i]; 
			        if ((enemy.shown && enemy.stance !=='death' && enemy.stance !== 'decay')
			        	&&(( (arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) > enemy.x+20) 
			        		&& ((arrowObject.x()+ARROW_WIDTH)*Math.cos(arrow.angle*Math.PI/180) < enemy.x + enemy.width )) 
				        &&(( preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) > enemy.y+10) 
				        	&& (preGame.sHeight/2+(arrowObject.x()+ARROW_WIDTH)*Math.sin(arrow.angle*Math.PI/180) < enemy.y+enemy.height+10))) {
			        	shot = true;
			        	enemy.currentHp -= arrow.attack;
			        	if (enemy.currentHp <= 0) {
					        gameInfo.coin += 2;
					        gameInfo.kills++;
			        		killEnemy(i);
				        } 
	    				arrowObject.remove();
	    				arrow.objarr.splice(m, 1);
	    				passNum++;
			        }
		        }
		        
    		}

    		if(passNum === arrow.diffAngle.length){
    			arrows[k] = null;
    			arrows.splice(k, 1);
    		}
    	}
    		
    }


    function resetLevel() {//重置
    	gameInfo.loseScreen.hide();
    	for (var i = enemies.length - 1; i >= 0; i--) {
    		enemy = enemies[i];
    		if(enemy.shown){
    			enemy.shown = false;
				enemy.group.hide();
				enemy.shadow.hide();
				enemy.x=preGame.sWidth;
				enemy.stance='run';
				if(enemy === gameInfo.tenemy){
					gameInfo.tenemy = false;
				}
    		}
		}
		for (var k = arrows.length - 1; k >= 0; k--) {
    		var arrow = arrows[k];
    		for (var m = arrow.objarr.length - 1; m >= 0; m--) {
    			var arrowObject = arrow.objarr[m];
    			arrowObject.remove();
    			arrowObject = null;
    		}
    		arrows[k] = null;
			arrows.splice(k, 1);
	    }
	    arrows = null;
    	gameInfo.gameover = false;
    	gameInfo.currentHp = preGame.hp;
    	arrows = [];
    	arrowTick = 30;
    	bowLevel = 1;
    	timer = + new Date();
    	gameInfo.coin = 0;
        gameInfo.kills = 1;
    	gameInfo.counter = 1;
    	gameInfo.enemyTypes = 1;
    	gameInfo.paused = false;
    	gameInfo.angle = 0;
	 	gameInfo.touched = false;
	 	gameInfo.hpfill.move(CIRCLE_HEIGHT-42, -61);
		myScare(gameInfo.hpfill, 1, 1, CIRCLE_HEIGHT-42, -61);
		gameInfo.hpfill.show();
		gameInfo.upgradeRect.hide();
		gameInfo.coinText.text(''+levelCoins[bowLevel-1]).font({fill: 'red',family: 'Cooper',});
    	gameInfo.weapon.load(crossbowImage[bowLevel-1].src).rotate(0, 0, 0);//弓
    	gameInfo.upbow.load(crossIcon[0].src);
    	gameInfo.logo.show();
		if(typeof gameInfo.warning !== 'undefined'){
			gameInfo.warning.group.hide();
		}

		if(typeof gameInfo.dragon !== 'undefined'){
			if(gameInfo.dragon.flameShown){
				for (var i = gameInfo.dragon.flame.length - 1; i >= 0; i--) {
					gameInfo.dragon.flame[i].hide();
				}
			}
			for (var i = gameInfo.dragon.monster.length - 1; i >= 0; i--) {
				gameInfo.dragon.monster[i].hide();
			}
			gameInfo.dragon.group.hide();
			gameInfo.dragon.shadow.hide();
			gameInfo.dragon.shown = false;
		}
		gameInfo.losehtime = 0;
		gameInfo.loseOpacity1=0.8;
		gameInfo.loseOpacity2=0.1;
		gameInfo.end = false;
		callback(0);
    }

    function checkProgress() {//游戏进度
    	if (Math.round(gameInfo.kills) === preGame.goal) {
    		gameInfo.gameover = true;
    		gameInfo.paused = true;
	    }
    }

    function createTutorial(x,y) {//新手引导
		gameInfo.tutorialScreen = preGame.uiLayer.group().scale(preGame.scale);
		gameInfo.handRect1 = gameInfo.tutorialScreen.rect(preGame.width/preGame.scale,preGame.height/preGame.scale).move(0, 0);
		gameInfo.mask = gameInfo.tutorialScreen.mask();
		gameInfo.handRect2 = gameInfo.tutorialScreen.rect(preGame.width/preGame.scale,preGame.height/preGame.scale).fill({color:'rgb(255, 255, 255)', opacity:0.5}).move(0, 0);
	    gameInfo.mask.add(gameInfo.handRect2);

	    gameInfo.hand = gameInfo.tutorialScreen.image(tutorialPointerImage.src).move(x+60, y+60);
	    gameInfo.handText = gameInfo.tutorialScreen.text("").font({family: 'Cooper',fill: '#ffffff'});
	    if(gameInfo.tutorialType === 1){
	    	drawShootTutorial(x,y);
	    }else if(gameInfo.tutorialType === 2){
	    	drawUpgradeTutorial(x,y);
	    }
	    gameInfo.mask.add(gameInfo.handFocus);
	    gameInfo.handRect1.maskWith(gameInfo.mask);
	    gameInfo.handPulse = 1;
		gameInfo.handPulseAnim = 0.015;
	    gameInfo.tutorial = true;
	    gameInfo.paused = true;
	}

	function drawShootTutorial(x, y) {
		if(!gameInfo.handFocus){
			gameInfo.handFocus = gameInfo.tutorialScreen.circle(100);
		}
		gameInfo.handText.text(l10n.tutorial[0]);
		if(preGame.rotated){
			gameInfo.hand.move(x+60, y+60);
			gameInfo.handFocus.center((x+50), (y+50));
	    	gameInfo.handText.font('size', 42).center((preGame.sWidth-490)/2+245, preGame.sHeight-preGame.uiDiff-350);
	    }else{
	    	gameInfo.hand.move(x+60, y+60);
	    	gameInfo.handFocus.center((x+50), (y+50));
	    	gameInfo.handText.font('size', 45).center(420, preGame.sHeight-preGame.uiDiff-110);
	    }
	}

	function drawUpgradeTutorial(x, y) {
		if(!gameInfo.handFocus){
			gameInfo.handFocus = gameInfo.tutorialScreen.rect(250,90).radius(10);
		}
		gameInfo.handText.text(l10n.tutorial[1]);
		if(preGame.rotated){
			gameInfo.hand.move(x+125, y+60);
			gameInfo.handFocus.center((x+108), (y+52));
	    	gameInfo.handText.font('size', 45).center(preGame.sWidth/2, preGame.sHeight-preGame.uiDiff-310);
	    }else{
	    	gameInfo.hand.move(x+125, y+60);
	    	gameInfo.handFocus.center((x+122), (y+40));
	    	gameInfo.handText.font('size', 45).center(preGame.sWidth/2, preGame.sHeight-preGame.uiDiff-160);
	    }
	}

    function createWarning(){
    	if(typeof gameInfo.warning === 'undefined'){
    		var gwidth = WARNING_BAR_UNIT_HEIGHT*2+60+WARNING_HEIGHT;
			var warningGroup = preGame.uiLayer.group().scale(preGame.scale);
			warningGroup.move(0,(preGame.sHeight-gwidth)/2);
			barsGroup1 = warningGroup.group().move(0,0);
			barsRedGroup1 = warningGroup.group().move(0,0).style('opacity', opa);
			barsGroup2 = warningGroup.group().move(0,gwidth-WARNING_BAR_UNIT_HEIGHT);
			barsRedGroup2 = warningGroup.group().move(0,gwidth-WARNING_BAR_UNIT_HEIGHT).style('opacity', opa);
			var opa = 0;
			var bars1 = [];
			var j=0;
			for (var i = -5*WARNING_BAR_UNIT_WIDTH; i < SWIDTH; i=i+WARNING_BAR_UNIT_WIDTH) {
				bars1[j++] = barsGroup1.image(warningBarUnitImage.src).move(i,0);
				bars1[j++] = barsRedGroup1.image(warningBarUnitRedImage.src).move(i,0);
			}

			var bars2 = [];
			j=0;
			for (var i = 0; i < SWIDTH+5*WARNING_BAR_UNIT_WIDTH; i=i+WARNING_BAR_UNIT_WIDTH) {
				bars2[j++] = barsGroup2.image(warningBarUnitImage.src).move(i,0);
				bars2[j++] = barsRedGroup2.image(warningBarUnitRedImage.src).move(i,0);
			}

			var caution = warningGroup.image(warningImage.src).move((preGame.sWidth-WARNING_WIDTH)/2,(gwidth-60)/2);
			var cautionRed = warningGroup.image(warningRedImage.src).move((preGame.sWidth-WARNING_WIDTH)/2,(gwidth-60)/2).style('opacity', opa);
			gameInfo.warning = {
	    		width:gwidth,
	    		group:warningGroup,
	    		bars1:barsGroup1,
	    		barsRed1:barsRedGroup1,
	    		bars2:barsGroup2,
	    		barsRed2:barsRedGroup2,
	    		caution:caution,
	    		cautionRed:cautionRed,
	    		opacity:opa,
	    		opacityAnim:0.06,
	    		barAnim:3,
	    	}
    	}else{
    		gameInfo.warning.opacity=0;
    		gameInfo.warning.opacityAnim=0.06;
    		gameInfo.warning.barAnim=3;
			gameInfo.warning.bars1.move(0,0);
			gameInfo.warning.barsRed1.move(0,0);
			gameInfo.warning.bars2.move(0,gameInfo.warning.width-WARNING_BAR_UNIT_HEIGHT);
			gameInfo.warning.barsRed2.move(0,gameInfo.warning.width-WARNING_BAR_UNIT_HEIGHT);
			gameInfo.warning.barsRed1.style('opacity', gameInfo.warning.opacity);
			gameInfo.warning.barsRed2.style('opacity', gameInfo.warning.opacity);
			gameInfo.warning.cautionRed.style('opacity', gameInfo.warning.opacity);
			gameInfo.warning.caution.move((preGame.sWidth-WARNING_WIDTH)/2,(gameInfo.warning.width-60)/2);
			gameInfo.warning.cautionRed.move((preGame.sWidth-WARNING_WIDTH)/2,(gameInfo.warning.width-60)/2);
			groupMove(gameInfo.warning.group, 0,(preGame.sHeight-gameInfo.warning.width)/2);
			gameInfo.warning.group.show();
    	}
    	
    }

    function drawWarning() {
    	if(typeof gameInfo.warning !== 'undefined'){
    		gameInfo.warning.opacity = gameInfo.warning.opacity+gameInfo.warning.opacityAnim;
    		if(gameInfo.warning.opacity <= 0 || gameInfo.warning.opacity >= 0.8){
    			gameInfo.warning.opacityAnim = -gameInfo.warning.opacityAnim;
    		}
    		gameInfo.warning.cautionRed.style('opacity', gameInfo.warning.opacity);
    		gameInfo.warning.bars1.dmove(gameInfo.warning.barAnim,0);
			gameInfo.warning.barsRed1.dmove(gameInfo.warning.barAnim,0);
			gameInfo.warning.bars2.dmove(-1*gameInfo.warning.barAnim,0);
			gameInfo.warning.barsRed2.dmove(-1*gameInfo.warning.barAnim,0);
			gameInfo.warning.barsRed1.style('opacity', gameInfo.warning.opacity);
			gameInfo.warning.barsRed2.style('opacity', gameInfo.warning.opacity);
    	}

    }


    function drawLoseScreen() {//失败结果
		if(typeof gameInfo.warning !== 'undefined' && gameInfo.warning.group.visible()){
			gameInfo.warning.group.backward();
		}
		if(typeof gameInfo.loseScreen === 'undefined'){
    		gameInfo.loseScreen = preGame.uiLayer.group().scale(preGame.scale).move(0, 0);
			gameInfo.loseScreenRect = gameInfo.loseScreen.rect(preGame.width/preGame.scale,preGame.height/preGame.scale).fill({ color: 'rgb(0, 0, 0)', opacity: 0.8 }).move(0, 0);
			gameInfo.loseUI = gameInfo.loseScreen.group().front().move(preGame.sWidth/2, preGame.uiDiff+gameInfo.losePlus);
			gameInfo.losehtime = 0;
			gameInfo.loseOpacity1=0.8;
			gameInfo.loseOpacity2=0.1;
			gameInfo.loseOpacityAnim=0.08;
			gameInfo.tryObj = gameInfo.loseUI.image(tryAgainButtonImage.src).move( -346/2, 363).hide();
			gameInfo.installObj = gameInfo.loseUI.image(installButtonImage.src).move( -346/2+100, 363).hide();
			gameInfo.appStore = gameInfo.loseUI.image(appStoreImage.src).move( -258/2, 523).hide();
			gameInfo.loseLogo = gameInfo.loseScreen.image(logoImage.src);
    		if(preGame.rotated){
	   			gameInfo.loseLogo.move(preGame.sWidth-199, preGame.uiDiff);
	   		}else{
	   			gameInfo.loseLogo.move(preGame.sWidth-190, preGame.sHeight-118-preGame.uiDiff);	
	   		}
    	}else if(gameInfo.loseScreen.visible()){
    		var now = + new Date();
    		if(gameInfo.loseOpacity1 < 1){
    			if(typeof gameInfo.losetext1 === 'undefined'){
    				gameInfo.losetext1 = gameInfo.loseUI.text("Download game and play with ").font({family: 'Cooper',fill: '#ffffff',size:36})
    				.style('opacity', gameInfo.loseOpacity1).center(0, 90);
					gameInfo.losetext2 = gameInfo.loseUI.text("Legendary weapon").font({family: 'Cooper',fill: '#ff911a',size:40})
					.style('opacity', gameInfo.loseOpacity1).center(0, 135);
					gameInfo.loseIcon = gameInfo.loseUI.image(crossBigIcon.src).move(-128/2, 195).style('opacity', gameInfo.loseOpacity1);
    			}else{
    				gameInfo.loseOpacity1 += gameInfo.loseOpacityAnim;
	    			gameInfo.losetext1.show().style('opacity', gameInfo.loseOpacity1);
	    			gameInfo.losetext2.show().style('opacity', gameInfo.loseOpacity1);
	    			gameInfo.loseIcon.show().style('opacity', gameInfo.loseOpacity1);
    			}
    		}else if(gameInfo.losehtime === 0){
    			gameInfo.losehtime = now;
    		}else if(gameInfo.losehtime + 300 < now && gameInfo.loseOpacity2 < 1){
				gameInfo.loseOpacity2 += gameInfo.loseOpacityAnim;
    			gameInfo.tryObj.show().style('opacity', gameInfo.loseOpacity2);
    			gameInfo.installObj.show().style('opacity', gameInfo.loseOpacity2);
    			gameInfo.appStore.show().style('opacity', gameInfo.loseOpacity2);
    		}else if(gameInfo.loseOpacity2 >= 1){
    			gameInfo.end = true;
    		}
    		
    	}else{
    		gameInfo.loseScreenRect.size(preGame.width/preGame.scale, preGame.height/preGame.scale);
			gameInfo.loseUI.move(preGame.sWidth/2, preGame.uiDiff+gameInfo.losePlus);
			if(preGame.rotated){
	   			gameInfo.loseLogo.move(preGame.sWidth-199, preGame.uiDiff);
	   		}else{
	   			gameInfo.loseLogo.move(preGame.sWidth-190, preGame.sHeight-118-preGame.uiDiff);	
	   		}
			groupMove(gameInfo.loseScreen, 0, 0);
    		gameInfo.loseScreen.show();
			gameInfo.losetext1.hide();
			gameInfo.losetext2.hide();
			gameInfo.loseIcon.hide();
			gameInfo.tryObj.hide();
			gameInfo.installObj.hide();
			gameInfo.appStore.hide();
    	}

    	gameInfo.tryObj.off('click').click(function() {
    		if(gameInfo.loseOpacity2 >= 1){
    			resetLevel();
    		}
		});
		gameInfo.installObj.off('click').click(function() {
			if(gameInfo.loseOpacity2 >= 1){
				redictAd();
		    }
		});
    }

    function redictAd(){//跳转下载页面
    	mraid.open(GOOGLE_URL);
    }
	
    function upgradeBow(){
    	if(gameInfo.coin < levelCoins[bowLevel-1]){
    		return;
    	}

    	gameInfo.coin -= levelCoins[bowLevel-1];
    	bowLevel++;
    	gameInfo.weapon.load(crossbowImage[bowLevel-1].src).rotate(0, 0, 0);//弓
    	if(bowLevel < 3){
    		gameInfo.upbow.load(crossIcon[bowLevel-1].src);
    	}else{
    		gameInfo.upbow.load(crossBigIcon.src);
    	}
    	gameInfo.coinText.text(''+levelCoins[bowLevel-1]).font({fill: 'red',family: 'Cooper',});
		gameInfo.angle = 0;
		arrowTick = 30;
		gameInfo.upOpacity = 0;
		if(gameInfo.coin < levelCoins[bowLevel-1]){
			gameInfo.upgradeRect.hide();
		}
    }

	function drawUI() {//ui
		if(typeof gameInfo.tutorialScreen !== 'undefined' && gameInfo.tutorialScreen.visible()){
			gameInfo.handPulse += gameInfo.handPulseAnim;
	    	if (gameInfo.handPulse > 1.2 || gameInfo.handPulse < 1) {
	    		gameInfo.handPulseAnim = -gameInfo.handPulseAnim;
			}
			myScare(gameInfo.hand, gameInfo.handPulse, gameInfo.handPulse);
		}

		if(gameInfo.counter > preGame.progress){
			gameInfo.counter = preGame.progress;
		}
        gameInfo.progressObj.move(PROGRESS_BAR_WIDTH-PROGRESS_WIDTH-250*gameInfo.counter/preGame.progress-56, 12);

        gameInfo.currentCoin.text(''+gameInfo.coin);
        if (gameInfo.currentHp <= 0) {
        	gameInfo.currentHp = 0;
	    	gameInfo.gameover = true;
	    	gameInfo.paused = true;
	    	gameInfo.hpfill.hide();
	    }else{
	    	var a= Math.round(gameInfo.currentHp/preGame.hp*100)/100;
	    	if(a > 0){
	    		gameInfo.hpfill.move(CIRCLE_HEIGHT-42, -61);
	    		myScare(gameInfo.hpfill, a, 1, CIRCLE_HEIGHT-42, -61);
	    	}else{
	    		gameInfo.hpfill.hide();
	    	}
	    	
	    }
	    gameInfo.hptext.text(gameInfo.currentHp  + '/' +  preGame.hp);

        if(gameInfo.gameover){
        	if (Math.round(gameInfo.kills) !== preGame.goal) {
		   		drawLoseScreen();
		    } else {
		    	drawLoseScreen();
		    }
        }
	    
    }

    var createNum = 1;
    function update(step){
    	if (!gameInfo.paused){
    		drawUpgradeBow();
    		drawArrows();
    		checkProgress();
    		if(typeof gameInfo.tenemy !== 'undefined' && !gameInfo.tenemy){
    			var now = + new Date();
		        if (timer + 500 < now) {
		        	timer = + new Date();
			        gameInfo.counter++;
			        createNum = 0;
			        if(gameInfo.counter >= 3 && gameInfo.counter < 15 && (gameInfo.counter%3 === 0)){
			        	createNum = 1;
			        }

			        if(gameInfo.counter === 15){
			        	gameInfo.enemyTypes = 1;
			        	createNum = 3;
			        }

			        if(gameInfo.counter >= 18 && gameInfo.counter < 30 && (gameInfo.counter%2 === 0)){
			        	gameInfo.enemyTypes = 2;
			        	createNum = 1;
			        }

			        if(gameInfo.counter === 30){
			        	gameInfo.enemyTypes = 2;
			        	createNum = 4;
			        }

			        if(gameInfo.counter >= 34 && gameInfo.counter < 46){
			        	gameInfo.enemyTypes = 3;
			        	createNum = 1;
			        }

			        if(gameInfo.counter === 46){
			        	gameInfo.enemyTypes = 3;
			        	createNum = 5;
			        }

			        if(gameInfo.counter === 48){
			        	createWarning();
			        	createNum = 0;
			        }
	 
			        if(gameInfo.counter === 52){
			        	gameInfo.warning.group.hide();
			        	createDragon();
			        	createNum = 0;
			        }

			        if (gameInfo.counter <= preGame.progress) {
			        	if(createNum>0){
			        		createEnemy(createNum);
			        	}
			        }
		        }
    		}
    		
	    	checkEnemyStances();
	        drawEnemies();
	        drawDragon();
	        attackCastle();        
	        drawWarning();
    	}
    	
    } 

    var prevFrame = 0;
	function callback(tframe) {
		if(!gameInfo.end){
			window.requestAnimationFrame(callback);	
	        update(tframe);
		    FPS = 1000 / (tframe - prevFrame);
		    STEP = 1 / FPS;
		    prevFrame = tframe;
		    drawUI();
		}
	}


	function onMouseDown(e){
		var event = e || window.event;
	 	var eX = 0;
    	var eY = 0;
	    if (event.touches && event.touches.length) {
		    eX = event.touches[0].clientX;
		    eY = event.touches[0].clientY;
	    } else {
		    eX = event.clientX;
		    eY = event.clientY;
	    }
	    var flag = true;
	    var fw = 190;
    	var fh = 190;
	    if(gameInfo.tutorial){
	    	if(gameInfo.tutorialType == 1){
	    		if(eX > preGame.diffX+(gameInfo.handFocus.x()-30)*preGame.scale && eX < preGame.diffX+(gameInfo.handFocus.x()+fw)*preGame.scale
		    		&& eY > preGame.diffY+(gameInfo.handFocus.y()-30)*preGame.scale && eY < preGame.diffY+(gameInfo.handFocus.y()+fh)*preGame.scale){
		        	gameInfo.tutorialScreen.remove();
		        	gameInfo.tutorial = false;
		        	gameInfo.paused = false;
		        }else{
		        	flag = false;
		        }
	    	}else{
	    		flag = false;
	    	}
	    	
	    }
	    if(gameInfo.gameover){
	    	flag = false;
	    }
		if(flag){
		    if(eX > preGame.diffX && eX < preGame.width+preGame.diffX && eY > preGame.diffY && eY < preGame.height+preGame.diffY){
		    	gameInfo.touched = true;
		    	
			    gameInfo.angle = Math.atan((eY - preGame.height/2 - preGame.diffY) / (eX - preGame.diffX)) * 180 / Math.PI;
			    gameInfo.weapon.rotate(gameInfo.angle, 0, 0);

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
			    			arrowObject.move(-17, preGame.sHeight/2-ARROW_HEIGHT/2);
		    				arrowObject.rotate(origin.angle+diff[m], 0, preGame.sHeight/2).show();
			    		}
				    }
			    }
		    }
		}

		if(eX > preGame.diffX+gameInfo.upgradeGroup.x() && eX < preGame.diffX+gameInfo.upgradeGroup.x()+UPGRADE_WIDTH*preGame.scale
    		&& eY > preGame.diffY+gameInfo.upgradeGroup.y() && eY < preGame.diffY+gameInfo.upgradeGroup.y()+UPGRADE_HEIGHT*preGame.scale){
        	upgradeBow();
        }
	}

	function onMouseMove(e) {
		var event = e || window.event;
		if (event.cancelable) {
	        if (!event.defaultPrevented) {
	            event.preventDefault();
	        }
	    }
		if (!gameInfo.paused && !gameInfo.gameover && gameInfo.touched) {
			var eX = 0;
	    	var eY = 0;
		    if (event.touches && event.touches.length) {
			    eX = event.touches[0].clientX;
			    eY = event.touches[0].clientY;
		    } else {
			    eX = event.clientX;
			    eY = event.clientY;
		    }
	        if(eX > preGame.diffX && eX < preGame.width+preGame.diffX && eY > preGame.diffY && eY < preGame.height+preGame.diffY){
		        gameInfo.angle = Math.atan((eY - preGame.height/2 - preGame.diffY) / (eX - preGame.diffX)) * 180 / Math.PI;
		        gameInfo.weapon.rotate(gameInfo.angle, 0, 0);
		    }
        }
    }

    function onMouseUp(e) {
    	var event = e || window.event;
		var eX = 0;
    	var eY = 0;
	    if (event.changedTouches && event.changedTouches.length) {
		    eX = event.changedTouches[0].clientX;
		    eY = event.changedTouches[0].clientY;
	    } else {
		    eX = event.clientX;
		    eY = event.clientY;
	    }
    	gameInfo.touched = false;
		var fw = UPGRADE_WIDTH+80;
		var fh = UPGRADE_HEIGHT+80;
    	
    	if(gameInfo.tutorialType == 2 && eX > preGame.diffX+(gameInfo.handFocus.x()-30)*preGame.scale && eX < preGame.diffX+(gameInfo.handFocus.x()+fw)*preGame.scale
    		&& eY > preGame.diffY+(gameInfo.handFocus.y()-30)*preGame.scale && eY < preGame.diffY+(gameInfo.handFocus.y()+fh)*preGame.scale){
	        if (gameInfo.tutorial) {
	        	gameInfo.tutorialScreen.remove();
	        	gameInfo.tutorial = false;
	        	gameInfo.paused = false;
	        }
        }
    }

    function resetSize(object,x,y){
		var old = object.remember('scale');
		object.scale(preGame.scale/old, x, y);
	}

	function drawImage(parent,src,x,y){
		var image = parent.image(src);
		if(typeof(x) !== 'undefined' && typeof(y) !== 'undefined'){
			image.move(x,y);
		}
		return image;
	}

	function myScare(object, xscale, yscale, x, y){
		if(typeof(x) !== 'undefined' && typeof(y) !== 'undefined'){
			object.scale(xscale, yscale, x, y);
		}
		return object.scale(xscale, yscale);
	}

	function groupMove(object, x, y){
		return object.transform({a:preGame.scale, b:0, c:0, d:preGame.scale, e:x*preGame.scale, f:y*preGame.scale});
	}

	function rnd(min, max){
		var ret = min + Math.floor(Math.random()*(max-min+1));
		return ret;
	}

	this.append = function (value) {
    	preGame.append = value;
    	preGame.diffY = diffY;
    };

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
		if(value){
			preGame.sHeight = SWIDTH;
			preGame.sWidth = SHEIGHT-preGame.cut;
			preGame.uiDiff = 0;
			preGame.eRange = 77;
			preGame.suiHeight = 900;
    		gameInfo.losePlus = 220;
    	}else{
			preGame.sHeight = SHEIGHT;
			preGame.sWidth = SWIDTH;
			preGame.uiDiff = 107;
			preGame.eRange = 107;
			preGame.suiHeight = 640;
			gameInfo.losePlus = 0;
		}
		if(typeof preGame.first === 'undefined'){
			preGame.lastRotate = preGame.rotated;
			preGame.lastCut = preGame.cut;
			preGame.first = true;
		}
	};

	this.getWidth = function() {
		return preGame.sWidth;
	};

	this.getInitScale = function() {
		return preGame.initScale;
	};

	this.getHeight = function(value) {
		return preGame.sHeight;
	};

	this.getCut = function(value) {
		return preGame.cut;
	};

	this.intercept = function(value) {
		preGame.cut = value;
	};

	this.init = function() {
		timer = + new Date();
	    drawPre();
	    callback(0);
	    preGame.initScale = preGame.scale;
    	SVG.on(document, 'mousedown', onMouseDown);
		SVG.on(document, 'mousemove', onMouseMove);
		SVG.on(document, 'mouseup', onMouseUp);
		SVG.on(document, 'touchstart', onMouseDown);
		SVG.on(document, 'touchmove', onMouseMove);
		SVG.on(document, 'touchend', onMouseUp);
    };

    this.resize = function(){
    	//svg
    	preGame.bgLayer.size(preGame.width, preGame.height);
		preGame.uiLayer.size(preGame.width, preGame.height);
		preGame.gameLayer.size(preGame.width, preGame.height);
		preGame.appendLayer.size(preGame.width+2*preGame.diffX, preGame.height+2*preGame.diffY);

		//ui界面
		gameInfo.bg.scale(preGame.scale, 0,0);
		gameInfo.install.scale(preGame.scale, 0,0);
		gameInfo.logo.scale(preGame.scale, 0,0);
		gameInfo.bg.size(preGame.sWidth+preGame.cut, preGame.sHeight);
		if(preGame.rotated){
			gameInfo.bg.load(bgImageV.src).scale(preGame.scale).move(0,0);
			groupMove(gameInfo.curCoinGroup, preGame.sWidth/2+12, preGame.uiDiff+50);
			gameInfo.install.scale(preGame.scale).move(preGame.sWidth-INSTALL_WIDTH-12,preGame.sHeight-preGame.uiDiff-100);
			groupMove(gameInfo.upgradeGroup, 8, preGame.uiDiff+22);
			groupMove(gameInfo.progressGroup, preGame.sWidth-PROGRESS_BAR_WIDTH+12, 148);
			groupMove(gameInfo.hpGroup, 8, preGame.sHeight-preGame.uiDiff);
			gameInfo.logo.move(preGame.sWidth-199, preGame.uiDiff);
		}else{
    		gameInfo.bg.load(bgImage.src).scale(preGame.scale).move(0,0);;
    		groupMove(gameInfo.curCoinGroup, 328, preGame.uiDiff+40);	
			gameInfo.install.scale(preGame.scale).move((preGame.sWidth-INSTALL_WIDTH)/2,preGame.uiDiff+10);
			groupMove(gameInfo.upgradeGroup, 24, preGame.uiDiff+12);
			groupMove(gameInfo.progressGroup, preGame.sWidth-PROGRESS_BAR_WIDTH, preGame.uiDiff);
			groupMove(gameInfo.hpGroup, 24, preGame.sHeight-preGame.uiDiff);
			gameInfo.logo.scale(preGame.scale).move(preGame.sWidth-190, preGame.sHeight-preGame.uiDiff-118);
    	}

		//弓箭
		groupMove(gameInfo.weaponGroup, 0, preGame.sHeight/2);
		for (var k = arrows.length - 1; k >= 0; k--){
			var origin = arrows[k];
	    	for (var m = origin.objarr.length - 1; m >= 0; m--) {
    			var arrowObject = origin.objarr[m];
    			arrowObject.scale(preGame.scale, 0,0);
    		}
	    }

	    //小怪
		for (var i = enemies.length - 1; i >= 0; i--) {
    		enemy = enemies[i];
    		if(enemy.shown || enemy.group.visible()){
    			if(preGame.lastRotate !== preGame.rotated){
    				if(enemy.stance ==='attack'){
						enemy.y=rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange-BEETLE_HEIGHT-22);
					}else{
						enemy.x=enemy.x*((preGame.sWidth+preGame.cut)/preGame.sHeight);
						enemy.y=rnd(preGame.eRange+104, preGame.suiHeight+preGame.eRange-BEETLE_HEIGHT-22);
						enemy.speed = enemy.speed*((preGame.sWidth+preGame.cut)/preGame.sHeight);
					}
    			}else if(preGame.lastCut !== preGame.cut){
    				if(enemy.stance !=='attack'){
						enemy.x=enemy.x*(preGame.sWidth/(preGame.sWidth+preGame.cut-preGame.lastCut));
						enemy.speed = enemy.speed*(preGame.sWidth/(preGame.sWidth+preGame.cut-preGame.lastCut));
					}
    			}
    			groupMove(enemy.group, enemy.x, enemy.y);
    			var shadowDiff = shadowPositon(i);
				enemy.shadow.scale(preGame.scale, 0,0);
				enemy.shadow.scale(preGame.scale).move(enemy.x+shadowDiff[0], enemy.y+shadowDiff[1]);
    		}
		}

		//红龙
		if(typeof gameInfo.dragon !== 'undefined'&& gameInfo.dragon.shown){
			if(preGame.lastRotate !== preGame.rotated){
				if(gameInfo.dragon.stance !== 'attack'){
					gameInfo.dragonTurn = true;
					gameInfo.dragon.x = preGame.sWidth*gameInfo.dragon.x/preGame.sHeight;
					gameInfo.dragon.y = rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale);
				}else if(gameInfo.dragon.stance === 'attack' && Math.round(gameInfo.dragon.x) > preGame.castle){
					gameInfo.dragon.x = preGame.sWidth*gameInfo.dragon.x/preGame.sHeight;
					gameInfo.dragon.y = rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale);
					gameInfo.dragon.desY = rnd(preGame.eRange+114, preGame.suiHeight+preGame.eRange-(DRAGON_HEIGHT-36)*dragonScale);
					gameInfo.dragon.angle = Math.atan((gameInfo.dragon.y - gameInfo.dragon.desY) / (gameInfo.dragon.x - gameInfo.dragon.desX)) * 180 / Math.PI;
					gameInfo.dragon.rev = (gameInfo.dragon.x - gameInfo.dragon.desX < 0) ? -1 : 1;
				}
				if(gameInfo.flameShown){
					gameInfo.dragon.flameX = preGame.sWidth*gameInfo.dragon.flameX/preGame.sHeight;
					gameInfo.dragon.flameY = preGame.sHeight*gameInfo.dragon.flameY/preGame.sWidth;
				}
			}

			if(preGame.lastCut !== preGame.cut){
				if(gameInfo.dragon.stance !== 'attack'){
					gameInfo.dragonTurn = true;
					gameInfo.dragon.x = preGame.sWidth*gameInfo.dragon.x/(preGame.sWidth+preGame.cut-preGame.lastCut);
				}
				if(gameInfo.flameShown){
					gameInfo.dragon.flameX = preGame.sWidth*gameInfo.dragon.flameX/(preGame.sWidth+preGame.cut-preGame.lastCut);
				}
			}

			if(gameInfo.dragon.flameShown && typeof gameInfo.dragon.flame !== 'undefined' && gameInfo.dragon.flameX > -200){
				for (var j = 0; j <= gameInfo.dragon.flame.length - 1; j++) {
					gameInfo.dragon.flame[j].scale(preGame.scale*dragonScale, 0,0);
					if(j === gameInfo.dragon.flameFrame){
						gameInfo.dragon.flame[j].scale(preGame.scale*dragonScale).move(gameInfo.dragon.flameX/dragonScale, gameInfo.dragon.flameY/dragonScale);
					}
				}
			}
			gameInfo.dragon.shadow.scale(preGame.scale*dragonScale, 0,0);
			gameInfo.dragon.shadow.scale(preGame.scale*dragonScale).move(gameInfo.dragon.x/dragonScale, (gameInfo.dragon.y+DRAGON_HEIGHT-10)/dragonScale);
		}

		//警告条
		if(typeof gameInfo.warning !== 'undefined' && gameInfo.warning.group.visible()){
			gameInfo.warning.bars1.move(0,0);
			gameInfo.warning.barsRed1.move(0,0);
			gameInfo.warning.bars2.move(0,gameInfo.warning.width-WARNING_BAR_UNIT_HEIGHT);
			gameInfo.warning.barsRed2.move(0,gameInfo.warning.width-WARNING_BAR_UNIT_HEIGHT);
			gameInfo.warning.caution.move((preGame.sWidth-WARNING_WIDTH)/2,(gameInfo.warning.width-60)/2);
			gameInfo.warning.cautionRed.move((preGame.sWidth-WARNING_WIDTH)/2,(gameInfo.warning.width-60)/2);
			groupMove(gameInfo.warning.group, 0,(preGame.sHeight-gameInfo.warning.width)/2);
		}

		//引导界面
		if(typeof gameInfo.tutorialScreen !== 'undefined' && gameInfo.tutorialScreen.visible()){//引导界面
			if(preGame.lastRotate !== preGame.rotated || preGame.lastCut !== preGame.cut){
				gameInfo.tenemy.x = preGame.sWidth-200;
				if(gameInfo.tenemy.y < preGame.uiDiff+104 || gameInfo.tenemy.y > 500){
					gameInfo.tenemy.y = 460;
				}
				gameInfo.handPulse = 1;
				myScare(gameInfo.hand, gameInfo.handPulse, gameInfo.handPulse);
				if(gameInfo.tutorialType == 1){
			    	drawShootTutorial(gameInfo.tenemy.x,gameInfo.tenemy.y);
			    }else if(gameInfo.tutorialType == 2){
			    	drawUpgradeTutorial(24, preGame.uiDiff+12);
			    }
			}
			gameInfo.handRect1.size(preGame.width/preGame.scale, preGame.height/preGame.scale);
			gameInfo.handRect2.size(preGame.width/preGame.scale, preGame.height/preGame.scale);
			groupMove(gameInfo.tutorialScreen, 0, 0);
	     	for (var i = enemies.length - 1; i >= 0; i--) {
	    		enemy = enemies[i];
	    		if(enemy.group.visible()){
	    			groupMove(enemy.group, enemy.x, enemy.y);
	    			var shadowDiff = shadowPositon(i);
		  		    enemy.shadow.scale(preGame.scale, 0,0);
		  		    enemy.shadow.scale(preGame.scale).move(enemy.x+shadowDiff[0], enemy.y+shadowDiff[1]);
	    		}
	     	}
		}

		//结束界面
		if(typeof gameInfo.loseScreen !== 'undefined' && gameInfo.loseScreen.visible()){//结束界面
			if(preGame.lastRotate !== preGame.rotated || preGame.lastCut !== preGame.cut){
				gameInfo.loseUI.move(preGame.sWidth/2, preGame.uiDiff+gameInfo.losePlus);
				if(preGame.rotated){
		   			gameInfo.loseLogo.move(preGame.sWidth-199, preGame.uiDiff);
		   		}else{
		   			gameInfo.loseLogo.move(preGame.sWidth-190, preGame.sHeight-118-preGame.uiDiff);	
		   		}
			}
			gameInfo.loseScreenRect.size(preGame.width/preGame.scale, preGame.height/preGame.scale);
			groupMove(gameInfo.loseScreen, 0, 0);
			for (var i = enemies.length - 1; i >= 0; i--) {
	    		enemy = enemies[i];
	    		if(enemy.group.visible()){
	    			groupMove(enemy.group, enemy.x, enemy.y);
	    			var shadowDiff = shadowPositon(i);
					enemy.shadow.scale(preGame.scale, 0,0);
					enemy.shadow.scale(preGame.scale).move(enemy.x+shadowDiff[0], enemy.y+shadowDiff[1]);
	    		}
			}
			if(typeof gameInfo.dragon !== 'undefined'&& gameInfo.dragon.shown){
				groupMove(gameInfo.dragon.group, gameInfo.dragon.x, gameInfo.dragon.y);
				gameInfo.dragon.shadow.scale(preGame.scale*dragonScale, 0,0);
				gameInfo.dragon.shadow.scale(preGame.scale*dragonScale).move(gameInfo.dragon.x/dragonScale, (gameInfo.dragon.y+DRAGON_HEIGHT-10)/dragonScale);
			}
		}
		if(preGame.diffX !== 0 && !preGame.rotated){
			if(typeof gameInfo.appendGroup !== 'undefined'){
				groupMove(gameInfo.appendGroup, (preGame.diffX+preGame.width/2)/preGame.scale,0).show();
			}else{
				gameInfo.appendGroup = preGame.appendLayer.group().scale(preGame.scale).move((preGame.diffX+preGame.width/2)/preGame.scale,0);
				gameInfo.appendRight = gameInfo.appendGroup.image(appendRSideImage.src).move(preGame.width/(2*preGame.scale), 0);
				gameInfo.appendLeft = gameInfo.appendGroup.image(appendLSideImage.src).move(-APPEND_WIDTH-preGame.width/(2*preGame.scale), 0);
			}
		}else if(typeof gameInfo.appendGroup !== 'undefined'){
			gameInfo.appendGroup.hide();
		}
		preGame.lastRotate = preGame.rotated;
		preGame.lastCut = preGame.cut;
	};

    return this;
}