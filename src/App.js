
import './App.css';
import SearchBar from './components/SearchBar';
import Screen from './components/Screen';
import React, { useState, useEffect } from 'react';

require('dotenv').config();

const api = {
  key: "37949a1a13ff476de42a4bef90e83822",
  base: "https://api.openweathermap.org/data/2.5/"
}


const geoApi = {
  key: "184e2187e31646a698fabeef615b7243",
  base: "https://api.opencagedata.com/geocode/v1/json?q="
}



function App() {

  const [isLocationAllowed, setIsLocationAllowed] = useState(false)
  const [lngAndLat, setlngAndLat] = useState()
  const [geoCity, setGeoCity] = useState('')
  const [isInputCorrect, setIsInputCorrect] = useState(false)



  const [city, setCity] = useState('')
  const [storedCity, setStoredCity] = useState('')
  const [weather, setWeather] = useState()
  const [weathe, setWeathe] = useState()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((location) => {
      console.log(location)
      setlngAndLat(location);
      setIsLocationAllowed(true)
      search('none',location.coords.latitude,location.coords.longitude)
    }, (error) => {
      setIsLocationAllowed(false)
    });
    
  }, [])



  // fetch(`/.netlify/functions/fetch-weather?city=${'none'}&lat=${location.coords.latitude}&lon=${location.coords.longitude}`)
  //       .then(res => setAdd(res.json()))




  useEffect(() => {
    console.log('use effect')
    if (isLocationAllowed) {


      fetch(`${geoApi.base}${lngAndLat.coords.latitude}+${lngAndLat.coords.longitude}&key=${geoApi.key}`)
        .then(result => result.json())
        .then(location => {
          console.log(location)
          setGeoCity(location.results[0].components.city);
        }).catch(console.log)
    }

  }, [isLocationAllowed])

  useEffect(() => {
    if (geoCity) {
      search(geoCity)
    }

  }, [geoCity])

  // useEffect(() => {
  //   console.log('use effect')
  //   if (isLocationAllowed) {


  //     fetch(`${geoApi.base}${lngAndLat.coords.latitude}+${lngAndLat.coords.longitude}&key=${geoApi.key}`)
  //       .then(result => result.json())
  //       .then(location => {
  //         console.log(location)
  //         setGeoCity(location.results[0].components.city);
  //       }).catch(console.log)
  //   }

  // }, [isLocationAllowed])

  useEffect(() => {
    if (geoCity) {
      search(geoCity)
    }

  }, [geoCity])

  // useEffect(() => {
  //   if(isLocationAllowed){
  //     search('none',lngAndLat.coords.latitude,lngAndLat.coords.longitude)
  //   }
    
  // }, [isLocationAllowed])

  // const search = (city = 'none', lat = null, lon = null) => {
  //   console.log(`entered search with ${city}`)
  //   if (city && city != 'none') {
  //     fetch(`/.netlify/functions/fetch-weather?city=${city}&lat=null&lon=null`)
  //       .then(res => res.json())
  //       .then(result => {
  //         if (result.count != 0) {
  //           setWeather(result)
  //           setStoredCity(city)
  //           setCity('')
  //           console.log(result)
  //           console.log('city found by name')
  //           setIsInputCorrect(true)
  //         } else {
  //           setIsInputCorrect(false)
  //         }
  //       })
  //   } else {
  //     fetch(`/.netlify/functions/fetch-weather?city=${'none'}&lat=${lat}&lon=${lon}`)
  //       .then(res => res.json())
  //       .then(result => {
  //         if (result.count != 0) {
  //           setWeather(result)
  //           setStoredCity(result.city)
  //           setCity('')
  //           console.log(result)
  //           console.log('city found by coords')
  //           setIsInputCorrect(true)
  //         } else {
  //           setIsInputCorrect(false)
  //         }
  //       })
  //   }

  //   //.catch(error => console.log(error,' ss'));
  // }

  const search = city => {
    console.log(`entered search with ${city}`)
    if (city) {
      fetch(`${api.base}find?q=${city}&appid=${api.key}&lang=ar&units=metric`)
        .then(res => res.json())
        .then(result => {
          if (result.count != 0) {
            setWeather(result)
            setStoredCity(city)
            setCity('')
            console.log(result)
            console.log('city found')
            setIsInputCorrect(true)
          }else{
            setIsInputCorrect(false)
          }
        })
    }

    //.catch(error => console.log(error,' ss'));
  }


const weatherr = {
  "coord": {
      "lon": 23,
      "lat": 23
  },
  "weather": [
      {
          "id": 801,
          "main": "Clouds",
          "description": "غائم جزئي",
          "icon": "02d"
      }
  ],
  "base": "stations",
  "main": {
      "temp": 27.56,
      "feels_like": 26.38,
      "temp_min": 27.56,
      "temp_max": 27.56,
      "pressure": 1013,
      "humidity": 17,
      "sea_level": 1013,
      "grnd_level": 958
  },
  "visibility": 10000,
  "wind": {
      "speed": 3.52,
      "deg": 39,
      "gust": 3.41
  },
  "clouds": {
      "all": 24
  },
  "dt": 1636711264,
  "sys": {
      "country": "LY",
      "sunrise": 1636691976,
      "sunset": 1636731891
  },
  "timezone": 7200,
  "id": 88930,
  "name": "Al Kufrah",
  "cod": 200
}



  return (
    <div className={`app ${weather && weather.list[0].main.temp > 30 ? ('app--hot') : weather && weather.list[0].main.temp < 25 ? ('app--cold') : ('app--normal')}`} dir='rtl'>
      <SearchBar city={city} setCity={setCity} search={search} />
      {isInputCorrect ?
        <Screen city={city} weather={weather} storedCity={storedCity} />
        :
        <h1>تأكد ان المدخل صحيح</h1>}
    </div>
  );
}

export default App;
