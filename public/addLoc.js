let form = document.querySelector("form")
let input = document.querySelector("input");
let loader = document.querySelector(".loader")
let wrapperTo = document.querySelector(".wrapperTo")
let display = document.querySelector("h3.display");
let fallback = document.querySelector("div.fallback")
let save = document.querySelector('button.save')



function addLocation(name){
   
    
    let totalLocations = localStorage.getItem("total")
    if(totalLocations){
        let label = `location ${totalLocations + 1}`
        localStorage.setItem(label,name);
    }
    else{
        localStorage.setItem('total',1);
        localStorage.setItem('location1',name)
    }
}


function hasClass(element,className){
    let x= element.classList;
    for(i=0;i<2;i++){
        if(x[i]==className){
            console.log("have this class")
            return true
        }
    }
    return false
}

form.addEventListener("submit",(e)=>{

    e.preventDefault();
    /*remove hide class to loader if present*/
    if((hasClass(loader,'hide'))){
        loader.classList.toggle("hide");
    }
    /*add hide class to data if class removed from it by previous display of data*/
    if(!(hasClass(wrapperTo,'hide'))){
        loader.classList.toggle("hide");
    }
    
    let location = input.value;
    
    fetch("/location?q="+location).then((res)=>{
        res.json().then((data)=>{
            loader.classList.toggle("hide");/*add hide class to hide the loader*/
            wrapperTo.classList.toggle("hide");/*remove hide class to display data ehen available*/
            if(data.error){
                return fallback.textContent= data.error;
            }
            
            display.textContent = data.location;
        })
    })
});

save.addEventListener('click',e =>{
    e.preventDefault();
    addLocation(display.textContent);
    window.location("/index.html");
})