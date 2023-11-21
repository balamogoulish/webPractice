var http = require('http');
var fs = require('fs');
var url = require('url');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;
    var title = queryData.id;

    if(pathName === '/'){
        if(title == undefined){ //root domain

            fs.readFile(`data/${title}`, 'utf8', function(err, description){
            var title = 'Welcome';
            var description = 'Hello Node.js';                
            var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>`;
            
                response.writeHead(200); //writeHead(200): 파일이 성공적으로 전송됨
                response.end(template); 
            });
        } else{
            fs.readFile(`data/${title}`, 'utf8', function(err, description){
                var template = `
                <!doctype html>
                <html>
                <head>
                <title>WEB1 - ${title}</title>
                <meta charset="utf-8">
                </head>
                <body>
                <h1><a href="/">WEB</a></h1>
                <ol>
                    <li><a href="/?id=HTML">HTML</a></li>
                    <li><a href="/?id=CSS">CSS</a></li>
                    <li><a href="/?id=JavaScript">JavaScript</a></li>
                </ol>
                <h2>${title}</h2>
                <p>${description}</p>
                </body>
                </html>`;
            
                response.writeHead(200); //writeHead(200): 파일이 성공적으로 전송됨
                response.end(template); 
            });
        }
        
       
    } else{
        response.writeHead(404); //writeHead(404): 에러
        response.end('Not Found');
    }
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});