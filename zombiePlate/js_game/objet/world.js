let world = {

    tilemap : null,
    tileset : null,
    downLayer : null,
    worldLayer : null,
    topLayer : null,
    overLayer : null,
    positionStart : null,
    positionEnd : null,
    score : 0,
    scoreText : null,
    gameOver : false,
    startEnnemy1 : null,
    startEnnemy2 : null,
    startEnnemy3 : null,
    startEnnemy4 : null,
    startEnnemy5 : null,
    startEnnemy6 : null,
    startEnnemy7 : null,
    startEnnemy8 : null,
    startEnnemy9 : null,
    startEnnemy10 : null,

    initWorld : function(){
        //création de la map avec le tilemap
        this.tilemap = play.scene.make.tilemap({key: "level"+ play.level});      
        this.tileset = this.tilemap.addTilesetImage("tilesheet", "tile");

        // utilisation des calque de la map
        this.overLayer = this.tilemap.createDynamicLayer('overlap', this.tileset, 0,0);
        this.downLayer = this.tilemap.createStaticLayer('bottom', this.tileset, 0,0);
        this.worldLayer = this.tilemap.createStaticLayer('world', this.tileset, 0,0);
        this.topLayer = this.tilemap.createStaticLayer('top', this.tileset, 0,0);

        // Position de depart
        this.positionStart = this.tilemap.findObject("objects", obj => obj.name === "start");
        this.positionEnd = this.tilemap.findObject("objects", obj => obj.name === "end");
        this.startEnnemy1 = this.tilemap.findObject("objects", obj => obj.name === "ennemy1");
        this.startEnnemy2 = this.tilemap.findObject("objects", obj => obj.name === "ennemy2");
        this.startEnnemy3 = this.tilemap.findObject("objects", obj => obj.name === "ennemy3");
        this.startEnnemy4 = this.tilemap.findObject("objects", obj => obj.name === "ennemy4");
        this.startEnnemy5 = this.tilemap.findObject("objects", obj => obj.name === "ennemy5");
        this.startEnnemy6 = this.tilemap.findObject("objects", obj => obj.name === "ennemy6");
        this.startEnnemy7 = this.tilemap.findObject("objects", obj => obj.name === "ennemy7");
        this.startEnnemy8 = this.tilemap.findObject("objects", obj => obj.name === "ennemy8");
        this.startEnnemy9 = this.tilemap.findObject("objects", obj => obj.name === "ennemy9");
        this.startEnnemy10 = this.tilemap.findObject("objects", obj => obj.name === "ennemy10");

        //Ajout la collision au calque world du tilemap
        this.worldLayer.setCollisionByProperty({collide : true});
        
        //définition de la longueur de la map
        play.scene.physics.world.setBounds(0,0,this.tilemap.widthInPixels,this.tilemap.heightInPixels);
       
        //affichage du score
        let fontScore = {
            fontSize : "32px",
            color : "red",
            fontFamily : "PressStart2P"
        }
        this.scoreText = play.scene.add.text(20,10,"score :", fontScore);

        // le score suit le jeu
        this.scoreText.setScrollFactor(0);  
    },
    
    manageHit : function(){
        //player
        this.overLayer.setTileIndexCallback(50,this.pickUpGem ,this);
        this.overLayer.setTileIndexCallback(51,this.pickUpGem ,this);
        this.overLayer.setTileIndexCallback(52,this.pickUpGem ,this);
        this.overLayer.setTileIndexCallback(53,this.pickUpGem ,this);
        this.overLayer.setTileIndexCallback(71,this.killPlayer,this);
        this.overLayer.setTileIndexCallback(5,this.killPlayer,this);
        this.overLayer.setTileIndexCallback(76,this.endLevel,this);
        this.overLayer.setTileIndexCallback(90,this.endLevel,this);
        play.scene.physics.add.collider(play.player.onePlayer, this.worldLayer);
        play.scene.physics.add.overlap(play.player.onePlayer, this.overLayer);
    },

    manageCamera : function(){
        //camera suit le joueur
       play.scene.cameras.main.startFollow(play.player.onePlayer);
       play.scene.cameras.main.setBounds(0,0,this.tilemap.widthInPixels,this.tilemap.heightInPixels);
    },

    pickUpGem : function(player, tile){
        // utilisation du son
        play.scene.sound.play("gem_Sound");
        //generation de particule collecte de gemme
        this.createParticules(tile.getCenterX(), tile.getCenterY());
        //recolte des gemmes
        this.scorePlayer(tile.properties.items);
        this.scoreText.setText("Score : " + this.score);
        this.overLayer.removeTileAt(tile.x,tile.y).destroy();   
    },

    scorePlayer : function(item){
        switch(item){
            case "gem_blue":
                this.score += 5;
            break;
            case "gem_green":
                this.score += 25;
            break;
            case "gem_red":
                this.score += 50;
            break;
            case "gem_yellow":
                this.score += 100;
            break;

            default: this.score += 0;
        }
    },

    createParticules : function(posX, posY){
        //creation de particules
        let particules = play.scene.add.particles("spark");
        
        // configuration de l'objet particules
        let initParticules = {
            x : posX,
            y : posY,
            speed : 50,
            angle : { min : 180, max : 360},
            lifeSpan : {min : 100, max : 400},
            scale : {start : 0.8, end : 0.1},
            blendMode : "ADD"
        };

        //creer les particlue a partir d'un objet
        let emitter = particules.createEmitter(initParticules);
        //suppresion des particules parametre le temp et une function
        play.scene.time.delayedCall(400, function(){
            particules.destroy();
        });
    },

    endLevel : function(player, tile){
        if (player.x > this.positionEnd.x - 2 && player.x < this.positionEnd.x + 2){
            if (!this.gameOver){
                this.gameOver = true;
                this.score += 500;
                this.scoreText.setText("Score : " + this.score);
                play.player.killPlayer();
                //ajout d'un panneau pour rejouer
                play.scene.add.sprite(play.scene.cameras.main.midPoint.x,
                    play.scene.cameras.main.midPoint.y,
                    "panel").setScale(5,3);
    
                let restartBtn = play.scene.add.sprite(play.scene.cameras.main.midPoint.x,
                    play.scene.cameras.main.midPoint.y + 100,
                    "btngrey").setInteractive();
    
                restartBtn.on('pointerup', function(){
                    play.level++;
                    play.scene.scene.restart();
                });
            }
            let fontScore = {
                fontSize : "32px",
                color : "red",
                fontFamily : "PressStar2P"
            }
            play.scene.add.text(
                play.scene.cameras.main.midPoint.x-200,
                play.scene.cameras.main.midPoint.y-100,
                "YOU WIN , \n Click to next level !!!",
                fontScore); 

        }
    },

    killPlayer : function(){
        if (!this.gameOver){
            this.gameOver = true;
            play.player.killPlayer();
            //ajout d'un panneau pour rejouer
            play.scene.add.sprite(play.scene.cameras.main.midPoint.x,
                play.scene.cameras.main.midPoint.y,
                "panel").setScale(5,3);

            let restartBtn = play.scene.add.sprite(play.scene.cameras.main.midPoint.x,
                play.scene.cameras.main.midPoint.y + 100,
                "btngrey").setInteractive();

            restartBtn.on('pointerup', function(){
                play.scene.scene.restart();
            });
        }
        let deathPlayer = {
            fontSize : "24px",
            color : "red",
            fontFamily : "PressStart2P"
        }
        this.scoreText = play.scene.add.text(
            play.scene.cameras.main.midPoint.x-200,
            play.scene.cameras.main.midPoint.y-100,
            "YOU DIED,\nClick to restart !!",
             deathPlayer
        );
    }
}