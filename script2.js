document.addEventListener('DOMContentLoaded', () => {
    let curr = 'Chennai';
    let units = 'metric';

    let city = document.querySelector(".weather_city");
    let datetime = document.querySelector(".weather_datetime");
    let forcast = document.querySelector(".weather_forcast");
    let weather = document.querySelector(".weather_temperature");
    let icon = document.querySelector(".weather_icon");
    let minmax = document.querySelector(".weather_minmax");
    let realfeel = document.querySelector(".weather_realfeel");
    let humidity = document.querySelector(".weather_humidity");
    let wind = document.querySelector(".weather_wind");
    let pressure = document.querySelector(".weather_pressure");
    
    // Select the error message element
    let errorElement = document.querySelector(".weather_error");

    document.querySelector(".weather_search").addEventListener('submit', (e) => {
        let search = document.querySelector(".weather_searchform");
        e.preventDefault();
        curr = search.value;
        get();
    });

    document.querySelector(".weather_unit_celcius").addEventListener('click', () => {
        if (units !== 'metric') {
            units = 'metric';
            get();
        }
    });

    document.querySelector(".weather_unit_faren").addEventListener('click', () => {
        if (units !== 'imperial') {
            units = 'imperial';
            get();
        }
    });

    function time(timestamp, timezoneOffset) {
        // ... (your existing time() function code)
    }

    function get() {
        // Clear any existing error messages
      

        const  API_KEY = 'e03690283c538926da53ea35111ee42a';
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${curr}&appid=${API_KEY}&units=${units}`)
            .then(res => {
                if (!res.ok) {
                    throw new Error('City not found or API request issue.');
                }
                return res.json();
            })
            .then(data => {
                city.innerHTML = `${data.name}, ${data.sys.country}`;
            console.log(data.conditionCode)
                forcast.innerHTML = `<p>${data.weather[0].main}`;
                weather.innerHTML = `${data.main.temp.toFixed()}&#176`;
                icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png"/>`;
                minmax.innerHTML = `<p> Min: ${data.main.temp_min.toFixed()}&#176</p><p> Max: ${data.main.temp_max.toFixed()}&#176</p>`;
                realfeel.innerHTML = `${data.main.feels_like.toFixed()}&#176`;
                humidity.innerHTML = `${data.main.humidity}%`;
                wind.innerHTML = `${data.wind.speed}${units==='imperial'?'mph':'m/s'}`;
                pressure.innerHTML = `${data.main.pressure}hpa`;
                if(forcast.innerHTML=="Mist"){
                    document.body.background="clear.jpg"
                }

            })
            .catch(error => {
                // Display the error message to the user
                errorElement.textContent = `Error: ${error.message}`;
                console.error('Error fetching data:', error);
            });
    }

    get(); // Initial data fetch when the page loads
});
