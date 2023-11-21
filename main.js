var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML(title, list, description){
    return `
        <!doctype html>
        <html>
        <head>
        <title>WEB1 - ${title}</title>
        <meta charset="utf-8">
        </head>
        <body>
        <h1><a href="/">WEB</a></h1>
        ${list}
        <h2>${title}</h2>
        <p>${description}</p>
        </body>
        </html>
    `;
}

function templateList(filelist){
    var list = '<ul>';
    for(i=0; i<filelist.length; i++){
        list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    }
    list = list + '</ul>';
    return list;    
}

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/'){
        if(queryData.id == undefined){ //root domain
            fs.readdir('./data', function(err, filelist){     
                var title = 'Welcome';
                var description ='Hello Node.js.';
                var list = templateList(filelist);
                var template = templateHTML(title, list, description);     
                response.writeHead(200); //writeHead(200): 파일이 성공적으로 전송됨
                response.end(template);                 
            })
        } else{
            fs.readdir('./data', function(err, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){   
                    var title = queryData.id;
                    var list = templateList(filelist);  
                    var template = templateHTML(title, list, description);       
                    response.writeHead(200); 
                    response.end(template); 
                });
            })
            
        } 
    } else{
        response.writeHead(404); //writeHead(404): 에러
        response.end('Not Found');
    }
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});