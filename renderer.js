const http = require('http');

var send = ()=>{
    let postData = JSON.stringify({
    Code: document.getElementById('code').value,
    Operation: document.getElementById('action').value
    });

    let options = {
    hostname: document.getElementById('host').value,
    port: document.getElementById('port').value,
    path: document.getElementById('path').value,
    method: 'POST',
    headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': postData.length
        }
    };

    let req = http.request(options, (res) => {

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        document.getElementById('res').innerHTML = chunk;
    });
    res.on('end', () => {
        console.log('No more data in response.');
    });
    });

    req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
    });

    // write data to request body
    req.write(postData);
    req.end();
}


document.getElementById('send').addEventListener('click',send);