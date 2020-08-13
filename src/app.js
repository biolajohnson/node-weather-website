const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const { brotliDecompressSync } = require('zlib')

// load up express
const app = express()

const port = process.env.PORT || 3000
//load up directory
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
// setup hbs
app.set('view engine', 'hbs')
app.set('views', viewsPath )
app.use(express.static(publicDirectoryPath))

//setting up partials
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Abiola Johnson'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Abiola Johnson'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Abiola Johnson'
    })
})


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'Please provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
            if(error){
               return res.send({error})
            }
                forecast(latitude, longitude, (error, {temperature, forecast}) => {
                    if (error){
                        return res.send({error})
                    }
                        res.send({
                            temperature,
                            forecast,
                            location,
                            address: req.query.address
                        })
                })
    })
   
})
app.get('/products', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        error: 'Help article not found',
        title: '404',
        name: 'Abiola Johnson'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found',
        title: '404',
        name: 'Abiola Johnson'
    })
})



app.listen(port, () => {
    console.log('The server is up on ' + port)
})