const http = require('http');
const fs = require('fs');
const url = require('url');

http.createServer( (req,res)=>{
    let body='';
    if(req.method === 'GET' && req.url === '/'){
        res.writeHead(200,{ 'Content-Type':'text/html'});
        fs.readFile('index.html','utf-8',(err,data)=>{
            if (err) throw err;
            res.write(data);
            res.end();
        });
    }


else if (req.method ==='GET'){
    const add=req.url;

    const q=url.parse(add,true);
    res.writeHead(200,{ 'Content-Type':'text/html'});
    res.write(JSON.stringify(q.query));
    res.end();


}

else if(req.method==='POST'){
    req.on('data',(data1)=>{
        body +=data1;
    });
    req.on('end',()=>{
        res.writeHead(200,{ 'Content-Type':'text/html'});
        res.write(body,()=>{
            res.end();
        });
    });
}

else {
    res.writeHead(200,{ 'Content-Type':'text/html'});
    res.end("<h1>404 ERROR could not find that page</h1>");
}
}).listen(1111);
console.log('connection Listening on port 1111');