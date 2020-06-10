let http = require("http");
let url = require("url");
let fs = require("fs");
let gestionPages = require("./gestionPages");

const PORT = "8010"; 

let serveur = http.createServer(traitReq);
serveur.listen(PORT);

function traitReq(request, response){
    let typeFile = url.parse(request.url);
    if(typeFile.pathname === "/"){
        typeFile.pathname = "/index.html";
    }
    
    if(typeFile.pathname !== "/favicon.ico"){
        let preData = gestionPages.prepareData(typeFile);
        let data = {};
        data.contentType = preData.contentType;
        data.htmlPage = fs.readFileSync(preData.folder + preData.file, preData.encodage);
        gestionPages.sendData(response, data);
    }
}