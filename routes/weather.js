var express = require("express")
const moment = require("moment")
const { response } = require("../app")
var router = express.Router()

const axios = require("axios").default

/* GET users listing. */
router.get("/", async function (req, res, next) {
  // console.log(process.env.API_KEY)
  let count = 40
  let cityName = req.query.cityname || "Dhaka"
  let apiLink =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&cnt=" +
    count +
    "&units=metric" +
    "&appid=" +
    process.env.API_KEY
  await axios
    .get(apiLink)
    .then(function (response) {
      // handle success
      // console.log("coming here")
      // console.log(response.data)
      // res.send(response.data)
      res.render("weather", {
        title: "Hey",
        data: response.data,
        moment: moment,
      })
    })
    .catch(function (error) {
      // console.log("error occured")
      // console.log(error)
      // handle error

      res.send(error.response.data)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message)
      }
      // console.log(error.config)
    })
    .then(function () {
      // always executed
      // console.log("coming here")
    })

  // res.render("weather", { title: "Hey", message: "Hello there!" })
})

router.get("/raw", async function (req, res, next) {
  // console.log(process.env.API_KEY)
  let count = 40
  let cityName = "London"
  let apiLink =
    "http://api.openweathermap.org/data/2.5/forecast?q=" +
    cityName +
    "&cnt=" +
    count +
    "&units=metric" +
    "&appid=" +
    process.env.API_KEY
  await axios
    .get(apiLink)
    .then(function (response) {
      // handle success
      // console.log("coming here")
      // console.log(response.data)
      res.send(response.data)
    })
    .catch(function (error) {
      // console.log("error occured")
      console.log(error)
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        // console.log(error.response.data)
        // console.log(error.response.status)
        // console.log(error.response.headers)
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        // console.log(error.request)
      } else {
        // Something happened in setting up the request that triggered an Error
        // console.log("Error", error.message)
      }
      // console.log(error.config)
    })
    .then(function () {
      // always executed
      // console.log("coming here")
    })

  // res.render("weather", { title: "Hey", message: "Hello there!" })
})

function getDayName(dateStr, locale) {
  var date = new Date(dateStr)
  return date.toLocaleDateString(locale, { weekday: "long" })
}

module.exports = router
