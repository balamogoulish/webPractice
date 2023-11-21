var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var template = require('./lib/template.js');

var app = http.createServer(function(request, response) {
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/'){
        if(queryData.id == undefined){ //root domain
            fs.readdir('./data', function(err, filelist){     
                var title = 'Welcome';
                var description ='Hello Node.js.';
                var list = template.list(filelist);
                var html = template.html(title, list, description, `<a href="/create">create</a>`);     
                response.writeHead(200); //writeHead(200): 파일이 성공적으로 전송됨
                response.end(html);              
            })
        } else{
            fs.readdir('./data', function(err, filelist){
                fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){   
                    var title = queryData.id;
                    var list = template.list(filelist);  
                    var html = template.html(title, list, description,
                       `<a href="/create">create</a> 
                        <a href="/update?id=${title}">update</a>
                        <form action="delete_process" method="post">
                            <input type="hidden" name="id" value="${title}">
                            <input type="submit" value="delete">
                        </form>
                    `);       
                    response.writeHead(200); 
                    response.end(html); 
                });
            })
        } 
    } else if(pathName === '/create'){
        fs.readdir('./data', function(err, filelist){     
            var title = 'WEB - create';
            var description = `
                <form action="http://localhost:3000/create_process" method="post">
                    <p><input type="text" name="title" placeholder="title"></p>
                    <p>
                        <textarea name="description" placeholder="description"></textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `;
            var list = template.list(filelist);
            var html = template.html(title, list, description,'');     
            response.writeHead(200);
            response.end(html);                 
        })
    } else if(pathName === '/create_process'){ //post를 받음
        var body ='';
        request.on('data', function(data){ //data가 들어올 때마다 function(data) 실행
            body += data; 
        });
        request.on('end', function(){ //정보 수신이 끝났을 때
            var post = qs.parse(body);
            var newtitle = post.title;
            var newdescription = post.description;
            fs.writeFile(`data/${newtitle}`, newdescription, 'utf8', function(err){
                response.writeHead(302, {Location:`/?id=${newtitle}`}); //파일 생성 후 생성된 파일로 redirection
                response.end();              
            })
        });
    } else if(pathName === '/update'){
        fs.readdir('./data', function(err, filelist){
            fs.readFile(`data/${queryData.id}`, 'utf8', function(err, description){   
                var title = queryData.id;
                var list = template.list(filelist);
                var body = `
                <form action="/update_process" method="post">
                    <input type="hidden" name="id" value="${title}">
                    <p><input type="text" name="title" placeholder="title" value="${title}"></p>
                    <p>
                        <textarea name="description" placeholder="description">${description}</textarea>
                    </p>
                    <p>
                        <input type="submit">
                    </p>
                </form>
            `;  
                var html = template.html(title, list, body,'');       
                response.writeHead(200); 
                response.end(html); 
            });
        })
    } else if(pathName ==='/update_process'){
        var body ='';
        request.on('data', function(data){ //data가 들어올 때마다 function(data) 실행
            body += data; 
        });
        request.on('end', function(){ //정보 수신이 끝났을 때
            var post = qs.parse(body);
            var id = post.id;
            var newtitle = post.title;
            var newdescription = post.description;
            fs.rename(`data/${id}`, `data/${newtitle}`, function(err){
                    fs.writeFile(`data/${newtitle}`, newdescription, 'utf8', function(err){
                    response.writeHead(302, {Location:`/?id=${newtitle}`}); //파일 생성 후 생성된 파일로 redirection
                    response.end();              
                })
            })
            
        });
    } else if(pathName ==='/delete_process'){
        var body ='';
        request.on('data', function(data){ //data가 들어올 때마다 function(data) 실행
            body += data; 
        });
        request.on('end', function(){ //정보 수신이 끝났을 때
            var post = qs.parse(body);
            var id = post.id;
            fs.unlink(`data/${id}`, function(err){
                response.writeHead(302, {Location:`/`});
                response.end();   
            })
        });
    } else{
        response.writeHead(404); //writeHead(404): 에러
        response.end('Not Found');
    }
});

app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});