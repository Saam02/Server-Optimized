// Importazione di moduli esterni
let http = require("http");
let url = require("url");
let fs = require("fs");
let path = require("path");


// Creazione del server con funzione di callback implicita
let server = http.createServer(crea);

//Porta del server : 8888
server.listen(8888, "127.0.0.1");
console.log("Server running in port 8888....");

function crea(req, res){
    let risorsa = (url.parse(req.url)).pathname;
    console.log("risorsa -- > " + risorsa);
    switch(risorsa){
        case '/':
            res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"}); // Header
            res.write("<!DOCTYPE html><html lang='en'><head><title>Pagina Node!</title>");
            res.write("<link rel='icon' sizes='32x32' href='./IMG/logos/favicon.png'>");
            res.write("<link rel='stylesheet' href='CSS/style.css'>");
            res.write("<script src='JS/jquery.js'></script><script src='JS/app.js'></script></head><body>")
            res.write("<section class='hero'>")
                res.write("<section class='hero-content'>");
                    res.write("<h1>Questo è un server web Node!</h1>"); // scrivo sulla pagina 
                    res.write("<p>Testo scritto tramite una callback definita esterna nella createServer</p>");
                    res.write("<form action='/single' method='POST'> <input type='submit' value='Go to single'> </form>");
                    res.write("<input type='button' value='Go to about page' id='btnGo'>");
                res.write("</section>");
            res.end("</section></body></html>");
            break;

        case '/single':
            fs.readFile("./single.html", "utf8", function(err, content){ // leggo la pagina index.html --> ASINCRONO
                if(!err){
                    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"}); // Header
                    res.end(content);
                } else
                    pageNotFound(res);
            });
            break;

        case '/about.html':
            fs.readFile("./about.html", "utf8", function(err, content){ // leggo la pagina index.html --> ASINCRONO
                if(!err){
                    res.writeHead(200,{"Content-Type":"text/html;charset=utf-8"}); // Header
                    res.end(content);
                } else
                    pageNotFound(res);
            });
            break;

        default:
            let extName = path.extname(risorsa); // Prende l'estensione della risorsa
            console.log("Risorsa richiesta: " + risorsa);
            console.log("Ext: " + extName);
            console.log("Risorsa (senza percorso): " + path.basename(risorsa)); // ritorna il nome senza percorso
            console.log("Cartella della risorsa: " + path.dirname(risorsa)); // Cartella dove si trova la risorsa

            switch(extName){
                case '.ico':
                    res.writeHead(200, {"Content-Type": "image/png"});
                    res.end(fs.readFileSync("." + risorsa));
                    break;
                case '.css':
                    res.writeHead(200, {"Content-Type": "text/css;charset=utf-8"});
                    res.end(fs.readFileSync("." + risorsa));
                    break;
                case '.js':
                    res.writeHead(200, {"Content-Type": "text/javascript;charset=utf-8"});
                    res.end(fs.readFileSync("." + risorsa));
                    break;
                default:
                    pageNotFound(res);
            }
    }
}

function pageNotFound(res){
    let header = {'Content-Type':'text/html;charset=UTF-8'};    
    res.writeHead(404, header); // codice errore : 404
    res.end(fs.readFileSync("./error.html"));
}