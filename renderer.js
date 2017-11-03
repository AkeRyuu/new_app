// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

// ініціалізація бібліотек
const Promise = require("bluebird");
const fs = require('fs');
const path = require('path');
const env = path.join(__dirname, '.env');
const http = require('http');
const readFile = Promise.promisify(require("fs").readFile);


// считування конфігурації підключення з файлу
const getConfig = async () => {
    let con = await readFile(env, {encoding:'utf8'});
    con = JSON.parse(con);
    $('#host').value = con.host;
    $('#port').value = con.port;
    $('#path').value = con.path;
}


// відправка данних на сервер
var send = async (data) => {
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

        // виведення данних 
        res.on('data', (chunk) => {            
            // очистка данних і перетворення в обєкт
            chunk = chunk.toString().slice(chunk.toString().indexOf("{"));
            chunk = JSON.parse(chunk);
                document.querySelector('#result').querySelector('h3').innerHTML = chunk.description;                
                document.querySelector('#r2t').innerHTML = chunk.lastRecord["Подразделение"];
                document.querySelector('#r3t').innerHTML = chunk.lastRecord["ПодразделениеОрганизации"];
                document.querySelector('#r4t').innerHTML = chunk.lastRecord["Сотрудник"];
                document.querySelector('#r5t').innerHTML = chunk.lastRecord["ТипОперации"];
                document.querySelector('#r6t').innerHTML = chunk.lastRecord["Дата"];
                if(chunk.lastRecord["КемИзменено"].length > 1) {
                    document.querySelector('#r1t').style.display="block";
                    document.querySelector('#r8t').style.display="block";
                    document.querySelector('#r1t').innerHTML = chunk.lastRecord["КемИзменено"];
                    document.querySelector('#r8t').innerHTML = chunk.lastRecord["ДатаИзминений"];      
                }
           
            
        });
        // дія по закінченню данних
        res.on('end', () => {
            // показ блоку з результато
            $('#result').style.display = "block";
            // повернення на головну сторінку через 5с
            setTimeout(_=>{
                back('#result');
                document.querySelector('#r1t').style.display="none";
                document.querySelector('#r8t').style.display="none";
            }, 5000);
        });
    });

    // опрацювання помилки
    req.on('error', (e) => {
        $('#result').style.display = "block";        
        document.querySelector('#result').querySelector('h3').innerHTML = "Немає звязку з сервером!"
        document.querySelectorAll('.result-rows').forEach((e)=>{
            e.style.display = "none";
        })
        setTimeout(_=>{document.querySelectorAll('.result-rows').forEach((e)=>{
            e.style.display = "block";
        })}, 5000);
        $('#result').style.display = "block";
        setTimeout(_=>back('#result'), 5000);
    });
    req.write(data);
    req.end();
}

// зюереження онфігурації підключення в файл
var save_config = data => { 
    fs.writeFile(env, JSON.stringify(data),()=>{});
}


// скорочене використання querySelector
var $ = (value) => {
    return document.querySelector(value)
}
var message = '';

// скидування типу дії, походу не використовується
var end_read = (action,result) => {
    if (action == 'start') {
        return action ='';
    } else if (action == 'end') {
        return action = '';
    }
}

// ініціалізація івентів початку і кінця зміни
$('#start').addEventListener("click",() => {
    action='start';
    $('#main').style.display = "none";
    $('#wait').style.display = "flex";
    key_start();
   })
$('#end').addEventListener("click",() => {
    action='end';
    $('#main').style.display = "none";
    $('#wait').style.display = "flex";
    key_start();
   })


// початок зчитування штрихкоду
var key_start = () => $('body').addEventListener('keydown',keapress);

// кінець зчитування штрихкоду
var key_end = () => $('body').removeEventListener('keydown',keapress);
var string = false;

// зчитування штрихкоду
var keapress = (e) => {
    // Сканери настроєні на почати зчитування Ctrl+R і при закінченні зчитування Enter || Ctrl+M
    // якщо Enter або M то закінчити зчитування і відправити на сервер
    if(e.keyCode == 77 || e.keyCode == 13){
        $('#wait').style.display = "none";
        send(JSON.stringify({Code:message,Operation:action}));
        message = '';
        string = false;
        key_end();
    } // якщо R то почати зчитування
    else if(e.keyCode == 82){
        string = true;
    } 
    else if(string) {
        // формування данних для відправки
        make_string(e.key);
    }
}

var make_string = (char) => {
    return message += char;
}

// повернення на головну сторінку
var back = from => {
    $(from).style.display = "none";
    $('#main').style.display = "flex";
}

// перехід на вкладку з конфігурацією підключення
var go_settings = () => {
    $('#main').style.display = "none";
    $('#settings').style.display = "block";
    getConfig();
}


$('#btn-settings').addEventListener('click',go_settings);
$('#save').addEventListener('click',()=>save_config({host:$('#host').value,port:$('#port').value,path:$('#path').value}))
$('#save').addEventListener('click',()=>back('#settings'));
