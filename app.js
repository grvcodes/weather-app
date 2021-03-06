const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const express= require('express');
const path= require('path');

console.log(__dirname);
const staticPath=  path.join(__dirname,"/public"); 
const app =express();
const port = process.env.PORT || 3000;

app.use(express.static(staticPath));

app.get('/weather',(req,res)=>{
    if(!req.query.q){
        return res.send({error : "please provide a location"})
    }
    let location = req.query.q;
    console.log(location);
    geocode(location,(err,geoData)=>{
        if(err){
            console.log("error1");
            return  res.send({error : err});
        }
        forecast(geoData,(err,forecastData)=>{
            if(err){
                console.log("error2");
                return res.send({error : err})
            }
            console.log("fetc");
            res.send({            
                forecast: forecastData,
                location: geoData.location
            })
        })
    })
})

app.listen(port,()=>{
    console.log("server started");
});

