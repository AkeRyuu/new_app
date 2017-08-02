// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const fs = require('fs');
const path = require('path');
const env = path.join(__dirname, '.env');


fs.readFile(env, 'utf8', (err,data)=>{
    if (err) {
        return console.log(err);
    }
    data = JSON.parse(data);
    console.log(data);
    data.new_test++;
    fs.writeFile(env, JSON.stringify(data), function (err) {
        if (err) return console.log(err);
    });
});
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
        var minutes = new Date().getMinutes();
        if (minutes < 10) {
            minutes = "0" + minutes;
        }
        var time = new Date().getDate()+"."+(new Date().getMonth()+1)+"."+new Date().getFullYear()+" "+new Date().getHours()+":"+minutes;
        if (action == 'start'){
            document.getElementById("r5t").innerHTML = "почав зміну";
            document.getElementById("r6t").innerHTML = time;
            $('#result').style.display = "block";
            $('#result-div').style.display = "block";
            setTimeout(back, 5000);
        } else {
            document.getElementById("r5t").innerHTML = "закінчив зміну";
            document.getElementById("r6t").innerHTML = time;
            $('#result').style.display = "block";
            $('#result-div').style.display = "block";
            setTimeout(back, 5000);
        }
        
        message = '';
        key_end();
    } else {
        make_string(e.key);
    }}

var make_string = (char) => {
    return message += char;
}

var back = () => {
    $('#result').style.display = "none";
    $('#main').style.display = "flex";
}
console.log(process.env.new_test);
