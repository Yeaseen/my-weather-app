import React, { useEffect, useState } from 'react';
import Swal from "sweetalert2";
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { CountryDropdown, RegionDropdown, CountryRegionData } from 'react-country-region-selector';
import Weather from './app_components/weather_design'
import ForecastWeekly from './app_components/forecastweekly'
const API_KEY = "9a9428d179fad71739964aa74141be9c";


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

    if (!(city=="" || country=="")) {
      const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
      const data = await api_call.json()
      //console.log(typeof (data.coord.lat))



      setDataAvailable(true)
      setCityName(`${data.name}, ${data.sys.country}`)
      setTempC(data.main.temp)
      setTempMinC(data.main.temp_min)
      setTempMaxC(data.main.temp_max)
      setDescription(data.weather[0].description)
      setHum(data.main.humidity)
      setFeels(data.main.feels_like)

      let lat = data.coord.lat
      let lon = data.coord.lon

      console.log(lat)


      //const one_api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&
      //exclude=minutely&appid=${API_KEY}&units=metric`)

      const one_api_call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=22.5&lon=91.5&
    exclude=minutely&appid=${API_KEY}&units=metric`)

      const one_data = await one_api_call.json()
      setDaily(one_data.daily)
      setForecastWeekly(true)
    }
    else{
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
      <h2>Hello From Client Side</h2>

      <CountryDropdown
        value={country}
        onChange={(val) => selectCountry(val)} />
      <RegionDropdown
        country={country}
        value={city}
        onChange={(val) => selectRegion(val)} />
      <br></br>
      <br></br>
      <br></br>

      <button onClick={(e) => {
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
