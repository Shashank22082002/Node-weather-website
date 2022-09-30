const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geofunc = require('./utils/geocode')
const forefunc = require('./utils/forecast')
const codes = require('./utils/codes')

const app = express()

// Paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')


// handlebar settings
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectoryPath))


// created while using handle bars -- dynamic web pages!
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Shashank'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Shashank'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Shashank',
        helpText: 'This is some helpful text'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        res.send({
            error: 'Provide an address'
        })
    }
    else {
        const address = req.query.address
        geofunc(address, (err, response={}) => {
            if (err) {
                res.send({
                    error: err
                })
            }
            else {
                console.log('Latitude is:', response.latitude, ' Longitude is:', response.longitude, ' Location Detected is:', response.location)
                const location = response.location
                forefunc(response.latitude, response.longitude, (err, response) => {
                    if (err)
                        res.send({error: err})
                    else {
                        const weathercode = response.weathercode
                        console.log(weathercode, codes.get(weathercode))
                        res.send({
                            temperature: 'It is currently '+response.temperature+'C outside',
                            forecast: 'Weather is expected ' + codes.get(weathercode) + ' today',
                            windspeed: response.windspeed,
                            location: location
                        })
                    }
                })
            }
        })

    }
})

// wildcard matching
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Shashank',
        message: 'Help page not found!'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error Page',
        name: 'Shashank',
        message: '404 error! Page Not Found'
    })
})
// endpoints
// not needed now since we have index.html to serve for this
// app.get('/', (req, res) => {
//     res.send('<h1>Hello Express</h1>')
// })

// app.get('/help', (req, res) => {
//     res.send({
//         // express automatically jasonifies the object before sending
//         name: 'shashank',
//         age: 20
//     })
// })

// app.get('/about', (req, res) => {
//     res.send('About page')
// })

app.get('/weather', (req, res) => {
    res.send({
        location: 'pilani',
        temperature: 30
    })
})


app.listen(3000, () => {
    console.log('Server is up on Port 3000!')
})