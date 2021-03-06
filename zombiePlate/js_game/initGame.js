/*************** Initialisation du jeu ********************/

let config = {
    type: Phaser.AUTO,
    backgroundColor : "#87CEEB",
    width: 1300,
    height : 600,
    scene: {
        preload : preload,
        create : create,
        update : update
    },
    physics : {
        default : "arcade",
        arcade : {
            gravity : { y : 500}
        }
    }
};

const game = new Phaser.Game(config);