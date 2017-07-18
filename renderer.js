// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var $ = (value) => {
    return document.querySelector(value)
}
var action = '';

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
    $('.input').style.display = "block"; 
    $('.input').focus();
   })
$('#end').addEventListener("click",() => {
    action='end';
    $('#main').style.display = "none";
    $('.modal').style.display = "flex";
    $('.input').style.display = "block"; 
    $('.input').focus();
   })

$('.input').addEventListener('keypress', function(e){
    console.log(e.charCode);
    if(e.charCode === 13) {
        $('#main').style.display = "block";
        $('.modal').style.display = "none";
        $('.input').style.display = "none";
        end_read(action,$('.input').value);
        $('.input').value = ''; 
    }
})

$('body').addEventListener('keypress',(e) => {
    if(e.which == 32 && $('#main').style.display == 'none'){
        $('#main').style.display = "block";
        $('.modal').style.display = "none";
        $('.input').style.display = "none";
        $('.input').value = ''; 
    }
});