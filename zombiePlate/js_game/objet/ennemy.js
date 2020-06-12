let ennemyTemplate = {

    createEnnemy : function(posX, posY, range) {
        let ennemy = {
            oneEnnemy: null,
        
            initEnnemy : function(){  
                this.oneEnnemy = play.scene.physics.add.sprite(posX, posY, "soldier", "soldier_stand");
                this.oneEnnemy.setScale(0.7);
                this.oneEnnemy.setOrigin(0,1);
                this.moveEnnemy();
                this.ennemyCollision();
            },    
            moveEnnemy : function(){
                this.oneEnnemy.anims.play("soldier_walk");
                let tween = play.scene.tweens.add({
                    targets : this.oneEnnemy,
                    x : posX + range,
                    ease :"linear",
                    duration : 3000,
                    yoyo : true,
                    repeat : -1,
                    onStart : function(){},
                    onComplete : function(){},
                    onYoyo : function(tween){tween.targets[0].flipX = !tween.targets[0].flipX },
                    onRepeat : function(tween){ tween.targets[0].flipX = !tween.targets[0].flipX }
            
                });
            },
            ennemyCollision : function(){
                play.scene.physics.add.collider(this.oneEnnemy, play.world.worldLayer);
                play.scene.physics.add.overlap(play.player.onePlayer, this.oneEnnemy, this.attackEnnemy);
            },
            attackEnnemy : function(player,ennemy){
                //si le player saute sur l'ennemi
                if(play.player.isJumping){
                    ennemy.destroy();
                } else {
                    play.world.killPlayer();
                }
            }
        
        }
        return ennemy;
    },
    ennemyAnimations : function() {
        //animation ennemy
        play.scene.anims.create({
            key :"soldier_walk",
            frames : game.anims.generateFrameNames("soldier", { prefix:"soldier_walk", start: 1, end : 2}),
            frameRate : 5,
            repeat : -1
        });
    }
}