let play = {
    scene : null,
    world : world,
    player : player,
    cursor : null,
    ennemyTemplate : ennemyTemplate,
    level : 1,
};

/******** loading images and sound *********/
function preload(){
    play.scene = this;
    play.scene.load.image("tile", "tilesheet.png");
    play.scene.load.tilemapTiledJSON("level1", "level1_1.json");
    play.scene.load.tilemapTiledJSON("level2", "level1_2.json");
    play.scene.load.tilemapTiledJSON("level3", "level1_3.json");
    play.scene.load.atlas("player", "player.png","playerAtlas.json");
    play.scene.load.atlas("soldier", "ennemy1.png","en1Atlas.json");

    play.scene.load.image("spark","spark.png");
    play.scene.load.audio("gem_Sound", "gemmeSound.ogg");
    play.scene.load.image("panel", "grey_panel.png");
    play.scene.load.image("btngrey", "grey_button.png");

    //initialiser le joueur
    play.world.gameOver = false;
    play.player.isAlive = true;
}


function create(){
    //initialisation de la carte
    play.world.initWorld();

    //creation du player
    play.player.initPlayer();    
    play.player.playerAnimations();

    //creation ennemy
    play.ennemyTemplate.ennemyAnimations();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy1.x,play.world.startEnnemy1.y,100).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy2.x,play.world.startEnnemy2.y,300).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy3.x,play.world.startEnnemy3.y,300).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy4.x,play.world.startEnnemy4.y,200).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy5.x,play.world.startEnnemy5.y,300).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy6.x,play.world.startEnnemy6.y,500).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy7.x,play.world.startEnnemy7.y,300).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy8.x,play.world.startEnnemy8.y,300).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy9.x,play.world.startEnnemy9.y,500).initEnnemy();
    play.ennemyTemplate.createEnnemy(play.world.startEnnemy10.x,play.world.startEnnemy10.y,300).initEnnemy();

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