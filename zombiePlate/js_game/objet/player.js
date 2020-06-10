let player = {
    onePlayer : null,
    isJumping : false,
    isAlive : true,

    initPlayer : function(){
        this.onePlayer = play.scene.physics.add.sprite(200, 200, "player", "zombie_stand");
        // player reste toujours visible
        this.onePlayer.setCollideWorldBounds(true);
        this.onePlayer.setOrigin(0.5,1);
    },

    playerAnimations : function() {
        //animation player
        play.scene.anims.create({
            key :"player_walk",
            frames : game.anims.generateFrameNames("player", { prefix:"zombie_walk", start:1, end : 2}),
            frameRate : 5,
            repeat : -1
        });
        play.scene.anims.create({
            key :"player_idle",
            frames : [{key : "player", frame : "zombie_stand"},{key : "player", frame : "zombie_idle"}],
            frameRate : 1,
            repeat : -1
        });
    },

    movePlayer : function(){
        if(this.isAlive){
            //on a separé les animations des mouvements et des test pour le boolean si le player et en l'air ou au sol
            if(play.cursor.left.isDown){
                this.onePlayer.setVelocityX(-150);
                this.onePlayer.setFlip(true,false);
            } else if(play.cursor.right.isDown){
                this.onePlayer.setVelocityX(100);
                this.onePlayer.setFlip(false,false);
            } else {
                this.onePlayer.setVelocityX(0);
            }        
            if(play.cursor.up.isDown && this.onePlayer.body.onFloor()){
                this.onePlayer.setVelocityY(-450);    
            } 

            if(this.onePlayer.body.onFloor()){
                this.isJumping = false;
            } else {
                this.isJumping = true;
            }

            //les priorité d'animation
            if(this.isJumping){
                this.onePlayer.setTexture("player", "zombie_jump");
            } else {
                if(play.cursor.left.isDown){
                    this.onePlayer.anims.play("player_walk",true);
                } else if(play.cursor.right.isDown){
                    this.onePlayer.anims.play("player_walk",true);
                } else {
                    this.onePlayer.anims.play("player_idle",true);
                } 
            }
        } else {
            this.onePlayer.setVelocityX(0);
        }
    },
}