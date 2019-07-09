let form = document.querySelector("form")
let input = document.querySelector("input");
let loader = document.querySelector(".loader")
let wrapperTo = document.querySelector(".wrapperTo")
let display = document.querySelector("h3.display");
let fallback = document.querySelector("div.fallback")
let save = document.querySelector('button.save')

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
    fallback.textContent = "";
    /*remove hide class to loader if present*/
    if((hasClass(loader,'hide'))){
        loader.classList.toggle("hide");
    }
    /*add hide class to data if class removed from it by previous display of data*/
    if(!(hasClass(wrapperTo,'hide'))){
        wrapperTo.classList.toggle("hide");
    }
    
    let location = input.value;
    if(!location){
        fallback.textContent = "please enter a location";
        loader.classList.toggle("hide");
    }else{
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
    }
    
});

save.addEventListener('click',e =>{
    e.preventDefault();
    LOCAL.addLoc(display.textContent);
})


let state = [];
class LocStorage {
    constructor(){
        if(localStorage.getItem('locations')){
            state = localStorage.getItem('locations').split(",")
        }
        
    }
    refresh(){

        state = localStorage.getItem('locations').split(",")
        
    }
    containLoc(loc){
        let flag = false;
        state.forEach(e =>{
            if(e===loc){
                flag = true;
            }
        })
        return flag
    }
    addLoc(loc){
     if(this.containLoc(loc)){
         fallback.textContent="location already saved :)";
     }
     else{
         state.push(loc);
         localStorage.setItem('locations',state.join())
         this.refresh()
         console.log(state)
        //  localStorage.setItem(loc,'20,25');
     }
    
    }
   
}
let LOCAL = new LocStorage();
LOCAL.addLoc("dj7");
LOCAL.addLoc("dj6");
LOCAL.addLoc("dj5");
LOCAL.addLoc("dj4");
LOCAL.addLoc("dj3");
LOCAL.addLoc("dj2");
LOCAL.addLoc("dj");
LOCAL.addLoc("dj1");
 
 