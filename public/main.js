var form = document.querySelector("form")
var input = document.querySelector("input");
var button = document.querySelector("button");
var search = document.getElementsByClassName("search")[0];
var dataDisplay = document.querySelector("div.dataDisplay"); 

button.addEventListener("click",(e)=>{

    e.preventDefault();

    let location = input.value;
    
    search.innerText ="Loading...";
    dataDisplay.textContent=" ";

    fetch("/weather?q="+location).then((res)=>{
        res.json().then((data)=>{
            if(data.error){
                console.log("error");
               return search.textContent= data.error
            }
            console.log("fetching details");
            search.textContent = `Showing forecast for : ${data.location}`;
            dataDisplay.textContent = data.forecast;
           
        })
    })
    

});

