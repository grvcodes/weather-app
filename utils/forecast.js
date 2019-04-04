const request = require('request');

const forecast = (lati,long,callback)=>{
    console.log("fetching details")
    const url = "https://api.darksky.net/forecast/"+ process.environment.forecast +"/37.8267,-122.4233";
    request({url :url,json: true },(err,res)=>{
        if(err){
            callback("unable to find locaton",undefined)
        }
        else if(res.body.error){
            callback("unable to locate",undefined)
        }
        else{
            let data = "current temperature is " + res.body.currently.temperature + ".There is" + res.body.currently.preciProbabilty + "% chance of rain.";
            callback(undefined, data )
        }
    })
}

module.exports = forecast;