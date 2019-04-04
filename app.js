const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

geocode("california,usa",(err,data)=>{
    console.log("error",err)
    console.log("data",data)
    forecast(-34.43,44.44,(err,data)=>{
        console.log("err",err)
        console.log("data",data)
    })

})