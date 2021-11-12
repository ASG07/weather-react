import { getDefaultNormalizer } from '@testing-library/dom';
import React, { useState, useEffect } from 'react';
import { TiWeatherPartlySunny } from "react-icons/ti";
//import { } from './../assets/icons';


const Screen = ({ weather, storedCity }) => {

    const weatherS = {
        "message": "accurate",
        "cod": "200",
        "count": 1,
        "list": [
            {
                "id": 108410,
                "name": "Riyadh",
                "coord": {
                    "lat": 24.6877,
                    "lon": 46.7219
                },
                "main": {
                    "temp": 30.08,
                    "feels_like": 28.2,
                    "temp_min": 30.08,
                    "temp_max": 30.08,
                    "pressure": 1011,
                    "humidity": 14,
                    "sea_level": 1011,
                    "grnd_level": 944
                },
                "dt": 1636625343,
                "wind": {
                    "speed": 8.59,
                    "deg": 226
                },
                "sys": {
                    "country": "SA"
                },
                "rain": null,
                "snow": null,
                "clouds": {
                    "all": 0
                },
                "weather": [
                    {
                        "id": 800,
                        "main": "Clear",
                        "description": "سماء صافية",
                        "icon": "01d"
                    }
                ]
            }
        ]
    }

    // const weatherr = {
    //     "coord": {
    //         "lon": 23,
    //         "lat": 23
    //     },
    //     "weather": [
    //         {
    //             "id": 801,
    //             "main": "Clouds",
    //             "description": "غائم جزئي",
    //             "icon": "02d"
    //         }
    //     ],
    //     "base": "stations",
    //     "main": {
    //         "temp": 27.56,
    //         "feels_like": 26.38,
    //         "temp_min": 27.56,
    //         "temp_max": 27.56,
    //         "pressure": 1013,
    //         "humidity": 17,
    //         "sea_level": 1013,
    //         "grnd_level": 958
    //     },
    //     "visibility": 10000,
    //     "wind": {
    //         "speed": 3.52,
    //         "deg": 39,
    //         "gust": 3.41
    //     },
    //     "clouds": {
    //         "all": 24
    //     },
    //     "dt": 1636711264,
    //     "sys": {
    //         "country": "LY",
    //         "sunrise": 1636691976,
    //         "sunset": 1636731891
    //     },
    //     "timezone": 7200,
    //     "id": 88930,
    //     "name": "Al Kufrah",
    //     "cod": 200
    // }

    

    const getDate = y => {
        const months = [
            'يناير',
            'فبراير',
            'مارس',
            'أبريل',
            'مايو',
            'يونيو',
            'يوليو',
            'أغسطس',
            'سبتمبر',
            'أكتوبر',
            'نوفمبر',
            'ديسمبر'];

        var d = new Date(0); // The 0 there is the key, which sets the date to the epoch
        d.setUTCSeconds(y);

        const year = d.getFullYear();
        const month = months[d.getMonth()];
        const date = d.getDate();

        const time = date + ' ' + month + ' ' + year;
        return time;
    }

    const getTime = d => {
        const dtFormat = new Intl.DateTimeFormat('ar-GB', {
            timeStyle: 'medium',
            //timeZone: 'UTC'
        });

        return dtFormat.format(new Date(d * 1e3));
    }

    const getCountryName = (c) => {
        let regionNames = new Intl.DisplayNames(['ar'], { type: 'region' });
        return regionNames.of(c);
    }

    function getDir(angle) {
        if (typeof angle === 'string') angle = parseInt(angle);
        if (angle <= 0 || angle > 360 || typeof angle === 'undefined') return '☈';
        const arrows = { north: '↑ شمال', north_east: '↗ شمال-شرق', east: '→ شرق', south_east: '↘ جنوب-شرق', south: '↓ جنوب', south_west: '↙ جنوب-غرب', west: '← غرب', north_west: '↖ شمال-غرب' };
        const directions = Object.keys(arrows);
        const degree = 360 / directions.length;
        angle = angle + degree / 2;
        for (let i = 0; i < directions.length; i++) {
            if (angle >= (i * degree) && angle < (i + 1) * degree) return arrows[directions[i]];
        }
        return arrows['north'];
    }

    // const data = {
    //     country: getCountryName(weather.sys.country),
    //     city: weather.name,
    //     date: getDate(weather.dt),
    //     time: getTime(weather.dt),
    //     feels: `${weather.main.feels_like}°C`,
    //     humidity: `${weather.main.humidity}%`,
    //     windSpeed: `${weather.wind.speed}km/h`,
    //     windDir: getDir(weather.wind.deg),
    //     icon: weather.weather[0].icon,
    //     description: weather.weather[0].description,
    //     temp: `${weather.main.temp}°C`,
    // }

    //console.log(weather,'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
    return (
        <div className='info-box'>
            <div className='weather-container' dir='ltr'>

                <div className='temp-icon'>
                    <div className='icon'>{weather && <img src={require(`./../assets/icons/${weather.list[0].weather[0].icon}.png`).default} alt="weather icon" />}</div>
                    <div className='icon-info'>
                        {weather &&
                            <div>
                                <h2>{weather.list[0].weather[0].description}</h2>
                                <h1>{weather.list[0].main.temp}°C</h1>
                            </div>
                        }

                    </div>
                </div>

                <div className='more-info' dir='ltr'>
                    <div className='info'>
                        {weather &&
                            <div>
                                <h2>{getCountryName(weather.list[0].sys.country)}</h2>
                                <h2>{storedCity}</h2>
                                
                                <h2 dir='rtl'> {getDate(weather.list[0].dt)}</h2>
                                <h2><span>{getTime(weather.list[0].dt)}</span> <span dir='rtl'>الربوع</span></h2>
                                <br />
                                <h2>{weather.list[0].main.feels_like}°C : المحسوسة</h2>
                                <h2>الرطوبة: %{weather.list[0].main.humidity}</h2>
                                <br />
                                <h2>{weather.list[0].wind.speed}km/h :سرعة الرياح</h2>
                                <h2> اتجاه الرياح: {getDir(weather.list[0].wind.deg)}</h2>
                                <h2> الزبده: {weather.list[0].main.temp > 30 ? ('دور مكيف') : weather && weather.list[0].main.temp < 25 ? ('تلحف') : ('الجو حلو')}</h2>
                            </div>
                        }
                    </div>
                </div>

                {/* <div className='temp-icon'>
                    <div className='icon'>{weatherr && <img src={require(`./../assets/icons/${data.icon}.png`).default} alt="weather icon" />}</div>
                    <div className='icon-info'>
                        {weatherr &&
                            <div>
                                <h2>{data.description}</h2>
                                <h1>{data.temp}</h1>
                            </div>
                        }

                    </div>
                </div>

                <div className='more-info' dir='ltr'>
                    <div className='info'>
                        {weatherr &&
                            <div>
                                <h2>{data.country}</h2>
                                <h2>{data.city}</h2>

                                <h2 dir='rtl'> {data.date}</h2>
                                <h2><span>{data.time}</span> <span dir='rtl'>الربوع</span></h2>
                                <br />
                                <h2>{data.feels} : المحسوسة</h2>
                                <h2>الرطوبة: {data.humidity}</h2>
                                <br />
                                <h2>{data.windSpeed} :سرعة الرياح</h2>
                                <h2> اتجاه الرياح: {data.windDir}</h2>
                                <h2> الزبده: {data.temp > 30 ? ('دور مكيف') : weather && data.temp < 25 ? ('تلحف') : ('الجو حلو')}</h2>
                            </div>
                        }
                    </div>
                </div> */}

            </div>
        </div>
    )
}

export default Screen
