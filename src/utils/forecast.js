const request = require('postman-request')

const forecast = (lat,long, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=03caa73a54e9e07b12c65fe43f08e414&query='+lat+','+long
    request({url,json:true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect to the service',undefined)
        } else if(body.error){
            callback('Unable to find the location, check your coord',undefined)
        } else {
            callback(undefined,body.current.weather_descriptions+". It's currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees out")
        }
    })
}

module.exports = forecast