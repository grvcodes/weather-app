
let form = document.querySelector("form.special")
let input = document.querySelector("input");


let loader = document.querySelector(".loader")
let fallback = document.querySelector('.fallback')
 let wrapperTo = document.querySelector(".wrapperTo")
 let locationName = document.querySelector(".locationName");
 let temp = document.querySelectorAll("#temp")
 let maxTemp = document.querySelector("span#maxTemp")
 let minTemp = document.querySelector("span#minTemp")
 let pressure = document.querySelector("span#pressure")
 let wind = document.querySelector("span#wind")
 let precipProbab = document.querySelector("span#precipProbab")
 let humidity = document.querySelector("span#humidity")
 let summary = document.querySelector("div.summary")
 let locationTab = document.querySelector('div.locations')

let add = document.querySelector('div.add');

function mainView(data){
    console.log(data.forecast);
    locationName.textContent = data.location;
    
    temp[0].textContent  = data.forecast.currently.temperature;
    temp[1].textContent  = data.forecast.currently.temperature;
    
    maxTemp.textContent = data.forecast.daily.data[0].temperatureHigh;
    minTemp.textContent = data.forecast.daily.data[0].temperatureLow;
    pressure.textContent = data.forecast.daily.data[0].pressure;
    wind.textContent = data.forecast.daily.data[0].windSpeed;
    precipProbab.textContent = data.forecast.daily.data[0].precipProbability;
    humidity.textContent = data.forecast.daily.data[0].humidity;
    summary.textContent = data.forecast.daily.data[0].summary;
    
}

function createLocationTab(location,temp){
    let div = document.createElement('div');
    let h3 = document.createElement('h3');
    h3.textContent= location;
    let divFooter = document.createElement("div");
    divFooter.classList.add("footer");
    let h4=[];
    for(i=0;i<2;i++){
        h4[i]=document.createElement('h4');
        h4[i].textContent=temp[i];
    }
    divFooter.append(h4[0],h4[1]);
    div.append(h3,divFooter);
    locationTab.appendChild(div);    
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

const getWeather = function(location){

    fetch("/weather?q="+location).then((res)=>{
        res.json().then((data)=>{
            loader.classList.toggle("hide");/*add hide class to hide the loader*/
            wrapperTo.classList.toggle("hide");/*remove hide class to display data ehen available*/
            if(data.error){
                return ({error : data.error});
            }
            console.log(data.forecast);
            return({data:data.forecast,
                    location:data.location}
            )
        })
    })
}

window.addEventListener('load',()=>{
    fallback.display="none";
    navigator.geolocation.getCurrentPosition((pos)=>{
        
        fetch("/geoweather?lat="+pos.coords.latitude+"?long="+pos.coords.longitude).then((res)=>{
            res.json().then((data)=>{
                loader.classList.toggle("hide");/*add hide class to hide the loader*/
                wrapperTo.classList.toggle("hide");/*remove hide class to display data ehen available*/
                if(data.error){
                    fallback.display="block";
                    fallback.textContent= data.error;
                }
                else
                {
                   mainView(data);
                }}
                )
            })
        })
        
})



///displays detailed weather details////

form.addEventListener("submit",(e)=>{
    fallback.display="none";
    e.preventDefault();
    fallback.textContent="";
    /*remove hide class to loader if present*/
    if((hasClass(loader,'hide'))){
        loader.classList.toggle("hide");
    }
    /*add hide class to data if class removed from it by previous display of data*/
    if(!(hasClass(wrapperTo,'hide'))){
        wrapperTo.classList.toggle("hide");
    }
    
    let location = input.value;
    if(! location){
        loader.classList.toggle("hide");
        fallback.display="none";
        fallback.textContent =  "please provide a location to search for..."; 
    }
    let data = getWeather(location)

    if(data.error){
        fallback.display="none";
        fallback.textContent= data.error;
    }
    else{
        mainView(data);
    }

});


