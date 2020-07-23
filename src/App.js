import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Weather from './app_components/weather_design'
import ForecastWeekly from './app_components/forecastweekly'
require('dotenv').config()

const API_KEY = process.env.REACT_APP_OPENWEATHERMAPAPI


const SinglePageComponent = () => {

  const [country, setCountry] = useState("")
  const [city, setCity] = useState("")

  const [dataAvailable, setDataAvailable] = useState(false)
  const [cityName, setCityName] = useState("")
  const [tempC, setTempC] = useState("")
  const [tempMinC, setTempMinC] = useState("")
  const [tempMaxC, setTempMaxC] = useState("")
  const [description, setDescription] = useState("")
  const [hum, setHum] = useState("")
  const [feels, setFeels] = useState("")
  const [icon,setIcon] = useState("")




  const [daily, setDaily] = useState([])
  const [forecastWeekly, setForecastWeekly] = useState(false)

  useEffect(() => {
    // if ("geolocation" in navigator) {
    //   console.log("Available")
    //   navigator.geolocation.getCurrentPosition((position) => {
    //     console.log("Latitude is :", position.coords.latitude)
    //     console.log("Longitude is :", position.coords.longitude)
    //   })
    // } else {
    //   console.log("Not Available")
    // }

  }, [])

  const selectCountry = (val) => {
    setCountry(val)
  }

  const selectRegion = (val) => {
    setCity(val)
  }


  const getWeather = async () => {
    //const city = 'Chicago'
    // const country = 'US'

    //console.log(city,country)

    if (!(city == "" || country == "")) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await api_call.json()
      console.log(data)



      setDataAvailable(true)
      setCityName(`${data.city.name}, ${data.city.country}`)
      setTempC(data.list[0].main.temp)
      setTempMinC(data.list[0].main.temp_min)
      setTempMaxC(data.list[0].main.temp_max)
      setDescription(data.list[0].weather[0].description)
      setHum(data.list[0].main.humidity)
      setFeels(data.list[0].main.feels_like)
      setIcon(data.list[0].weather[0].icon)


      // let nextDays = []

      
      // for (var i = 1; i < (data.list.length); i++) {
      //   nextDays.push(data.list[i]);
      // }
      // console.log(nextDays)

      setDaily(data.list)
      setForecastWeekly(true)

    }
    else {
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: 'Oops!!!',
        text: 'Please select both fields',
        showConfirmButton: false,
        timer: 2000
      })
    }



  }




  return (
    <div className="App">
      <br></br>
     
      <h2 className="text-light">Please select a country as well as a region.</h2>
      <br></br>
      
      <CountryDropdown
        value={country}
        onChange={(val) => selectCountry(val)} />
      <RegionDropdown
        country={country}
        value={city}
        onChange={(val) => selectRegion(val)} />
      <br></br>
      <br></br>
     
      
      <button className="btn btn-warning" onClick={(e) => {
        e.preventDefault()
        getWeather()
      }}>
        Get current weather
      </button>

      <Weather
        dataAvailable={dataAvailable}
        cityname={cityName}
        temp_celsius={tempC}
        temp_max={tempMaxC}
        temp_min={tempMinC}
        description={description}
        hum={hum}
        feels={feels}
        icon= {icon}
      />

      <ForecastWeekly
        daily={daily}
        forecastWeekly={forecastWeekly}
      />





    </div>
  )
}


function App() {
  return (
    <SinglePageComponent />
  );
}

export default App;
