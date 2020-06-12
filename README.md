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
          const PORT = "8010";
          
# gestion des extensions de fichier
    Dans le fichier gestionPages.js, permet au serveur de gérer les types de fichiers. Ici nous avons comme type :
       html, css, js, json, ttf (pour les fonts), jpeg, png, ogg.
       
    Si vous avez besoin d'ajouter un autre type d'extension cela est possible. il faudra aller dans le switch de la function
    prepareData() et ajouter un case à la suite.
    EXEMPLE :
         case ".js":   
            data.contentType = "application/javascript";
            data.folder = "js_game/";
         break;
    Dans cette exemple, case prend le type d'extension. Data.contentType ou type MIME vous trouverez la liste sur https://developer.mozilla.org/fr/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types .
    Et data.folder est le nom du dossier où se trouvera le fichier ou image ou music ....
    
