const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.positionstack.com/v1/forward?access_key=a77413861083a855c725eea35a9e2c69&query=' + encodeURIComponent(address) + ''
    request({ url: url, json: true }, (err, response) => {
        if (err) {
            // low level error -- connection issues
            callback("Unable to connect to weather services", undefined)
        }
        else if (!response.body.data || response.body.data.length === 0) {
            // console.log(response.body)
            callback("No Location found", undefined)
        }
        else {
            const objData = response.body.data[0]
            // console.log(objData)
            // console.log(objData[0])
            const location = {
                latitude: objData.latitude,
                longitude: objData.longitude,
                location: objData.label
            }
            callback(undefined, location)
        }
    })
}

module.exports = geocode
