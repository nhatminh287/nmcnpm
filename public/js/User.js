
// Menu Toggle

let toggle = document.querySelector(".toggle");
let navigation = document.querySelector(".navigation");
let main = document.querySelector(".main");

toggle.onclick = function () {
  navigation.classList.toggle("active");
  main.classList.toggle("active");
};

//Tab Toggle
var buttons = document.getElementsByClassName('tablinks');
var contents = document.getElementsByClassName('tabcontent');
function showContent(id){
    for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
    }
    var content = document.getElementById(id);
    content.style.display = 'block';
}

buttons[0].addEventListener("click", function(){
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
    }
    this.className += " active";
    showContent("membership-register");
});
buttons[1].addEventListener("click", function(){
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove("active");
    }
    this.className += " active";
    showContent("membership-check");
});

showContent('membership-register');