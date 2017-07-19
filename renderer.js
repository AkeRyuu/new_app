// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
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

/*var read = () =>{
$('.input').addEventListener('keypress', function(e){
    //console.log(e.charCode);
    if(e.charCode === 13) {
        $('#main').style.display = "block";
        $('.modal').style.display = "none";
        //$('.input').style.display = "none";
        return $('.input').value;
        end_read(action,$('.input').value);
        $('.input').value = ''; 
    }
})
}*/

var key_start = () => $('body').addEventListener('keypress',keapress);
var key_end = () => $('body').removeEventListener('keypress',keapress);

var keapress = (e) => {
    if(e.charCode == 13){
        $('.modal').style.display = "none";
        if (action == 'start'){
            $('#result').querySelector('.content').innerHTML = "<h4>" + message + " почав зміну.";
            $('#result').style.display = "flex";
            setTimeout(back, 1000);
        } else {
            $('#result').querySelector('.content').innerHTML = "<h4>" + message + " закінчив зміну.";
            $('#result').style.display = "flex";
            setTimeout(back, 1000);
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
    $('#main').style.display = "block";
}

/*$('.input').addEventListener('focus',(e)=>{
    //var x = read();
    var y = ;
    //console.log(y);
    console.log(e);
})*/