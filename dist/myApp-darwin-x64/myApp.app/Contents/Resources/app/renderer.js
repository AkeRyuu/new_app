// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var buttons = document.querySelectorAll('button');
var $ = function(value) {
    return document.querySelector(value)
}

buttons.forEach(function(button){
    button.addEventListener("click",function(){
        $('#main').style.display = "none";
        $('.modal').style.display = "flex";
    })
},this);

$('input').addEventListener('keypress', function(e){
    if(e.charCode === 13) {
        $('#main').style.display = "block";
        $('.modal').style.display = "none";
    }
})