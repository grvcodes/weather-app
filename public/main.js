let form = document.querySelector("form")
let input = document.querySelector("input");

let loader = document.querySelector(".loader")

let wrapper = document.querySelector(".wrapper")
 let locationName = document.querySelector(".locationName");
 let temp = document.querySelectorAll("#temp")
 let maxTemp = document.querySelector("span#maxTemp")
 let minTemp = document.querySelector("span#minTemp")
 let pressure = document.querySelector("span#pressure")
 let wind = document.querySelector("span#wind")
 let precipProbab = document.querySelector("span#precipProbab")
 let humidity = document.querySelector("span#humidity")
 let summary = document.querySelector("div.summary")

 console.log(temp);
form.addEventListener("submit",(e)=>{

    e.preventDefault();

    loader.classList.toggle("hide");
    let location = input.value;
    
    fetch("/weather?q="+location).then((res)=>{
        res.json().then((data)=>{
            loader.classList.toggle("hide");
            wrapper.classList.toggle("hide");
            if(data.error){
                return locationName.textContent= data.error;
            }
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
        })
    })
    

});

