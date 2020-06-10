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


    initWorld : function(){
        //création de la map avec le tilemap
        this.tilemap = play.scene.make.tilemap({key: "level1"});
        this.tileset = this.tilemap.addTilesetImage("tilesheet", "tile");

        // utilisation des calque de la map
        this.overLayer = this.tilemap.createDynamicLayer('overlap', this.tileset, 0,0);
        this.downLayer = this.tilemap.createStaticLayer('bottom', this.tileset, 0,0);
        this.worldLayer = this.tilemap.createStaticLayer('world', this.tileset, 0,0);
        this.topLayer = this.tilemap.createStaticLayer('top', this.tileset, 0,0);

        // Position de depart
        //this.positionStart = this.tilemap.findObject("Objects", obj => obj.name === "start");

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
        //this.overLayer.setTileIndexCallback(76,this.endLevel,this);
        //this.overLayer.setTileIndexCallback(90,this.endLevel,this);
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
        if (item === "gem_blue"){
            this.score += 5;
        } else if (item === "gem_green"){
            this.score += 25;
        } else if (item === "gem_red"){
            this.score += 50;
        } else if (item === "gem_yellow"){
            this.score += 100;
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
    }
}