let gestionPages = {

    sendData : function(response, data){
        response.writeHead(200,{"Content-Type" : data.contentType});
        response.write(data.htmlPage);
        response.end();
    },

    prepareData : function(typeFile){
        let indexOfPoint = typeFile.pathname.indexOf(".");
        let extension = typeFile.pathname.substring(indexOfPoint, typeFile.pathname.length);
        let data = {
            contentType : "",
            folder : "",
            encodage : "",
            file : typeFile.pathname.substring(1,typeFile.pathname.length),
        }
    
        switch(extension){
            case ".html":
                data.contentType = "text/html";
                data.folder = "html/";
                data.encodage = "UTF-8"; 
            break;
    
            case ".css":
                data.contentType = "text/css";
                data.folder = "css/";
            break;
    
            case ".js":
                data.contentType = "application/javascript";
                data.folder = "js_game/";
            break;
    
            case ".json":
                data.contentType = "application/json";
                data.folder = "assets/json/";
            break;
            case ".png":
                data.contentType = "image/png";
                data.folder = "assets/img/";
            break;
    
            case ".jpeg":
                data.contentType = "image/jpeg";
                data.folder = "assets/img/";
            break;
    
            case ".ogg":
                data.contentType = "audio/ogg";
                data.folder = "assets/sounds/";
            break;
    
            case ".mp3":
                data.contentType = "audio/mp3";
                data.folder = "assets/sounds/";
            break;
    
            case ".ttf":
                data.contentType = "";
                data.folder = "assets/fonts/"
            break;
    
            default : console.log('Erreur');
    
        }
        return data;
    }

}
module.exports = gestionPages;