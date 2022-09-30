const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude +'&hourly=temperature_2m,precipitation&current_weather=true'
    request({ url: url, json: true }, (err, response) => {
        // 3 possibilities
        if (err) {
            // low level error -- connection issues
            callback("Unable to connect to weather services", undefined)
        }
        else if (response.body.error) {
            callback("Some error occured!"+response.body.reason, undefined)
        }
        else {
            const obj = response.body
            callback(undefined, obj.current_weather)
        }
    })
}

module.exports = forecast