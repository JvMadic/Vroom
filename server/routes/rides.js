const express = require('express')

// const dbUser = require('../db/users')
const dbRides = require('../db/rides')
// const dbCar = require('../db/cars')

const router = express.Router()

// ROUTE api/v1/rides/

// SearchRides route:

router.get('/', (req, res) => {
  console.log('query string params: ', req.query)
  const {
    startLocation,
    destination,
    date,
    seatsAvailable
  } = req.query

  dbRides.getRides(startLocation, destination, date, seatsAvailable)
    .then(async rides => {
      res.json({ rides })
      return null
    })
    .catch(err => {
      console.error(err)
      res.status(500).json({ message: 'Something went wrong' })
    })
})

router.post('/', async (req, res) => {
  const ride = req.body.newRide
  const user = req.body.auth
  try {
    await dbRides.addRide(ride, user)
    res.sendStatus(201)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'unable to insert user into the database' })
  }
})

module.exports = router