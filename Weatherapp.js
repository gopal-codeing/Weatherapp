import React from 'react';
import { useState } from 'react';
// import { Oval } from 'react-loader-spinner'; 
// import React, { useState } from 'react'; 
import axios from 'axios'; 
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
// import { faFrown } from '@fortawesome/free-solid-svg-icons'; 
// import './App.css'; 
import './weatherstyle.css';  
const Weatherapp = () => {

    const [input, setInput] = useState('');

    const [weather, setWeather] = useState({
        loding: false,
        data: {},
        error: false,
    });

    const todatafunction = () => {
        const month = ['January', 'Fabuary', 'March', 'April', 'May', 'Jun', 'July', 'August', 'September', 'Octomber', 'November', 'December'];
        const WeekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday',];
     
        const currentdate = new Date();
     const data =`${WeekDays[currentdate.getDay()]} : ${currentdate.getDate()} : ${currentdate.getFullYear()}`;
return data;
    }


    const search = async (event) => { 
        if (event.key === 'Enter') { 
            event.preventDefault(); 
            setInput(''); 
            setWeather({ ...weather, loading: true }); 
            // const url = 'https://api.openweathermap.org/data/2.5/weather'; 
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c'; 
            await axios.get( 'https://api.openweathermap.org/data/2.5/weather', { 
                    params: { 
                        q: input, 
                        units: 'metric', 
                        appid: api_key, 
                    }, 
                }) 
                .then((res) => { 
                    console.log('res', res); 
                    setWeather({ data: res.data, loading: false, error: false }); 
                }) 
                .catch((error) => { 
                    setWeather({ ...weather, data: {}, error: true }); 
                    setInput(''); 
                    console.log('error', error); 
                }); 
        } 
    }; 



    return (
        <>
            <div className="App">
                <h1 className="App-name">Weather - App</h1>
                <div className="search-bar">
                    <input type='text' className='city-search' placeholder='Enter the city-Name' name='query' value={input} onChange={(event) => setInput(event.target.value)}
                        onKeyPress={search} />
                </div>


                {
                    weather.loding &&(
                          <> 
                        <br /> 
                        <br /> 
                        <val type="Oval" color="black" height={100} width={100} /> 
                    </> 
                )} 
                {weather.error && ( 
                    <> 
                        <br /> 
                        <br /> 
                        <span className="error-message"> 
                            {/* <fontAwesomeIcon icon={faFrown} />  */}
                            <span style={{ fontSize: '20px' }}>City not found</span> 
                        </span> 
                    </> 
                )} 
                  {weather && weather.data && weather.data.main && ( 
                <div> 
                    <div className="city-name"> 
                        <h2> 
                            {weather.data.name}, <span>{weather.data.sys.country}</span> 
                        </h2> 
                    </div> 
                    <div className="date"> 
                        <span>{todatafunction()}</span> 
                    </div> 
                    <div className="icon-temp"> 
                        <img 
                            className=""
                            src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`} 
                            alt={weather.data.weather[0].description} 
                        /> 
                        {Math.round(weather.data.main.temp)} 
                        <sup className="deg">°C</sup> 
                    </div> 
                    <div className="des-wind"> 
                        <p>{weather.data.weather[0].description.toUpperCase()}</p> 
                        <p>Wind Speed: {weather.data.wind.speed}m/s</p> 
                    </div> 
                </div> 
            )} 
                
            </div>
        </>
    );
}

export default Weatherapp;