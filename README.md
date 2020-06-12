Dossier contenant des jeux en javascript crées à partir de la bibliothéquejs PHASER.

# 1- ZombiePlate :
    Jeu de plate-forme simple et efficace.....

# Installation de nodejs et nodemon
    Aprés avoir cloné le dossier, dans votre terminal aller sur le fichier serveur.js et effectuer :
            
                npm init-y
    
    cela vous permettra d'avoir le fichier package.json, dans ce fichier écrire la ligne suivante 
    "start": "nodemon serveur.js",
    
    comme dans cette exemple :
            "scripts": {
                "start": "nodemon serveur.js",
                "test": "echo \"Error: no test specified\" && exit 1"
            },
            
    Installer le module nodemon pour que votre serveur puisse se relancer automatiquement.
        
        npm install nodemon
        
        
 # Lancement du serveur 
    npm start
    
    
# Configuration du port 
    Dans le fichier serveur.js, il faudra à la ligne 6 y inscrire votre port souhaité.
    
#        const PORT = "8010";
