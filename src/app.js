const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { send } = require('process')

const app = express()
const port = process.env.PORT || 3000
const publicPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))
app.get('', (req, res) => {
    res.render('index',{
        title:'Index Hbs',
        name:'Andrea',
        copyright:'@andrea 2021'
    })
})
app.get('/about', (req, res) => {
    res.render('about',{
        title:'About Hbs',
        name:'Andrea',
        copyright:'@andrea 2021'
    })
})
app.get('/help', (req, res) => {
    res.render('help',{
        title:'Help Hbs',
        name:'Andrea',
        copyright:'@andrea 2021'
    })
})
app.get('/weather',(req, res) => {
    if(!req.query.address) {
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, (error,{latitude,longitude,location} = {})=>{
        if(error){
            return res.send({error})
        } else {
            forecast(latitude,longitude, (error, forecastData) =>{
                if(error) {
                    return res.send({error})
                }
                res.send({
                    data:forecastData,
                    location,
                    address:req.query.address
                })
            })
        }
    })    
})
app.get('*',(req, res) => {
    res.render('404',{
        title:'Page non Found!',
        name:'Andrea',
        copyright:'@andrea 2021'
    })
})


app.listen(port, () => {
    console.log('Server is Up! on port '+port)
})