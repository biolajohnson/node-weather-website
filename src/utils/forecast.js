const request = require('request')

const forecast = (long, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=1b600dcb5d604f7afd14e3ab8ca7965e&query=' + lat + ',' + long + '&units=f'
    request({url, json: true}, (error, {body}) => {
        if(error){
            callback('Unable to connect to location services')
        } else if(body.error){
            callback('Unable to connect. Try later')
        } else{
            callback(undefined, {
                temperature: body.current.temperature + ' degrees Fahrenheit',
                forecast: body.current.weather_descriptions[0]
            })
        }
    })

}
module.exports = forecast