const request = require('request');

const geocode = (location,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ location +".json?limit=1&access_token=" + process.environment.GEOCODE;
    request({url :url,json: true },(err,res)=>{
        if(err){
            callback("unable to find locaton",undefined)
        }
        else if(res.body.features[0].length == 0){
            callback("unable to locate",undefined)
        }
        else{
            callback(undefined,{
                latitude:res.body.features[0].center[0],
                longitude:res.body.features[0].center[1],
                location:res.body.features[0].place_name
            })
        }
    })
}


module.exports = geocode;