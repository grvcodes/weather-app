var input = document.querySelector("input");
var button = document.querySelector("button");
var search = document.getElementsByClassName("search")[0];
var data = document.querySelector("div.data"); 

console.log("hello",input,search);

button.addEventListener("click",(e)=>{
    e.preventDefault();
    search.innerText=(input.value)? "Loading...":"Please provide a region/place!";
    data.textContent="";

});

