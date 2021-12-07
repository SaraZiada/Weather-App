const express = require('express')
const request = require('request')
// const urllib = require('urllib')

const router = express.Router()
const City = require(`../../server/City`)
const API_KEY = `f67af07dde2db9638e5fa23cd0125394`


 router.get('/city/:cityName', async function(req, res, next) {
    let cityName = req.params.cityName
    await request(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=f67af07dde2db9638e5fa23cd0125394`, 
        function(error, response, body) {
            if(error){
                res.send("ERRORrrrrrrrrrrrrrrrrrrrr")
            }
            var result = JSON.parse(body)
            let city = new City()
            
            city.name = result.name
            city.temperature = result.main.temp - 273.15
            city.condition = result.weather[0].description
            city.conditionPic = result.weather[0].icon
            
            city.save()
            res.send(city)

        }
    )
})
router.get(`/cities`,async function(req, res) {
    let cities = await City.find({})
    res.send(cities)
})

router.post('/city',async function(req, res){
    let name = req.body.name
    let temperature = req.body.temperature
    let condition = req.body.condition
    let conditionPic = req.body.conditionPic

    let cityExist = await City.find({name:name})
    if(cityExist.length > 0 ){
        let x = await City.findOneAndUpdate({name:name},{$set:{temperature:temperature, condition:condition, conditionPic:conditionPic}})
    }else{
        let newCity = new City()
        newCity.name = name
        newCity.temperature = temperature
        newCity.condition = condition
        newCity.conditionPic = conditionPic
        newCity.save()
        res.send(newCity)
    }
})

router.delete(`/city/:cityName`, async function(req, res) {
    await City.findOneAndDelete({name : req.params.cityName})
    res.status(200).send('Deleted')
})


module.exports = router