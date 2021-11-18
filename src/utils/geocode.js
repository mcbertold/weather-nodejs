const request = require('postman-request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYW5kcmVhenVjY2EiLCJhIjoiY2t2czg5YTMxMGZhcjJ2bTl6c213bjZyYyJ9.04Owfeb6ZEa5tN7pgfxWgg&language=EN&limit=1'
    request({url,json:true},(error,{body} = {})=>{
        if(error){
            callback('Unable to connect to location service', undefined)
        } else if (body.features.length === 0 || body.error){
            callback('Unable to find location. Try another search',undefined)
        } else {
            callback(undefined,{
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
  }

module.exports = geocode