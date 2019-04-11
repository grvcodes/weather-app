const request = require('request');
require('dotenv').config();

const geocode = (location,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ location +".json?limit=1&access_token=" + process.env.GEOCODE;
    request({url :url,json: true },(err,res)=>{
        if(err){
            callback("Unable to connect",undefined)
        }
        else if(res.body.features.length == 0){
            callback("Unable to find location.Please be more specific by adding country or state name",undefined)
        }
        else{
            
            callback(undefined,{
                longitude:res.body.features[0].center[0],
                latitude:res.body.features[0].center[1],
                location:res.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;