let play = {
    scene : null,
    world : world,
    player : player,
    cursor : null,
    ennemyTemplate : ennemyTemplate,
    level : 2
};

/******** loading images and sound *********/
function preload(){
    play.scene = this;
    play.scene.load.image("tile", "tilesheet.png");
    play.scene.load.tilemapTiledJSON("level1", "level1_1.json");
    play.scene.load.atlas("player", "player.png","playerAtlas.json");

    play.scene.load.image("spark","spark.png");
    play.scene.load.audio("gem_Sound", "gemmeSound.ogg");
    //initalisation du joueur
    //play.player.isAlive = true;
}


function create(){
    //initialisation de la carte
    play.world.initWorld();

    //creation du player
    play.player.initPlayer();
    play.player.playerAnimations();

    //Ajout de la gestion collision
    play.world.manageHit();

    // Utilisation des touches du clavier
    play.cursor = play.scene.input.keyboard.createCursorKeys();

    //gerer la camera
    play.world.manageCamera();
}


function update(time,delta){
    play.player.movePlayer();
    adjustScreenSize();
}


function adjustScreenSize(){
    let canvas = document.querySelector("canvas");
    let windowHeight = window.innerHeight;
    let windowWidth = window.innerWidth;
    let windowRatio = windowWidth / windowHeight;
    let configRatio = config.width / config.height;
    
    if(windowRatio < configRatio){
        canvas.style.width = windowWidth + "px";
        canvas.style.height = (windowWidth / configRatio) + "px";
    } else {
        canvas.style.width = (windowHeight * configRatio) + "px";
        canvas.style.height = windowHeight + "px";
    }

}