// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const Promise = require("bluebird");
const fs = require('fs');
const path = require('path');
const env = path.join(__dirname, '.env');
const http = require('http');
const readFile = Promise.promisify(require("fs").readFile);

const getConfig = async () => {
    let con = await readFile(env, {encoding:'utf8'});
    con = JSON.parse(con);
    $('#host').value = con.host;
    $('#port').value = con.port;
    $('#path').value = con.path;
}

var send = async (data) => {
    // data = JSON.stringify(data);
    let conn = await readFile(env,{encoding:'utf8'});
    conn = JSON.parse(conn);
    let options = {
        hostname: conn.host,
        port: conn.port,
        path: conn.path,
        method: 'POST',
        headers : {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-cache',
            'Content-Length': data.length
        }
    };

    let req = http.request(options, (res) => {
        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            
        });
        res.on('end', () => {
            console.log('No more data in response.');
        });
    });
    req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
    });
    console.log(data);
    console.log(conn);
    req.write(data);
    req.end();
}
var save_config = data => {
    fs.writeFile(env, JSON.stringify(data),()=>{});
}

var $ = (value) => {
    return document.querySelector(value)
}
var message = '';

var end_read = (action,result) => {
    if (action == 'start') {
        console.log('Робітник ' + result + ' почав зміну');
        return action ='';
    } else if (action == 'end') {
        console.log('Робітник ' + result + ' закінчив зміну');
        return action = '';
    }
}

$('#start').addEventListener("click",() => {
    action='start';
    $('#main').style.display = "none";
    $('.modal').style.display = "flex";
    key_start();
   })
$('#end').addEventListener("click",() => {
    action='end';
    $('#main').style.display = "none";
    $('.modal').style.display = "flex";
    key_start();
   })


var key_start = () => $('body').addEventListener('keypress',keapress);
var key_end = () => $('body').removeEventListener('keypress',keapress);

var keapress = (e) => {
    if(e.charCode == 13){
        $('.modal').style.display = "none";
        send(JSON.stringify({Code:message,Operation:action}));
        $('#result').style.display = "block";
        setTimeout(back('#wait'), 5000);
        message = '';
        key_end();
    } else {
        make_string(e.key);
    }
}

var make_string = (char) => {
    return message += char;
}

var back = from => {
    $(from).style.display = "none";
    $('#main').style.display = "flex";
}

var go_settings = () => {
    $('#main').style.display = "none";
    $('#settings').style.display = "block";
    getConfig();
}


$('#btn-settings').addEventListener('click',go_settings);
$('#save').addEventListener('click',()=>save_config({host:$('#host').value,port:$('#port').value,path:$('#path').value}))
$('#save').addEventListener('click',()=>back('#settings'));
