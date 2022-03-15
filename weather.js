async function getWeatherCity(){
        try{
            var city = document.getElementById("city").value;
            let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ddc894a0a38425be12ca6bbf79cb31e5&units=metric`)
            // let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cf748a5139f41fc6139ab4d84f9c9803&units=metric}`)
            let data = await response.json();
            map(city);
            var lat = data.coord.lat;
            var lon = data.coord.lon;
            getWeather(lat,lon,city);
        }
        catch (err){
            console.log("err:",err)
        }
    }

    async function getWeather(lat,lon,city){
        try{
            let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=7days&appid=ddc894a0a38425be12ca6bbf79cb31e5&units=metric`)
            // let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e554ee2bb9089658028407814cb72eea&units=metric`)
            let data = await response.json();
            let daily = data.daily
            showWeather(daily,city);
            console.log( "daily:", daily)
        }
        catch (err){
            console.log("err:",err)
        }
    }

    function showWeather(weather,city){ 
        let data_div = document.querySelector("#detail")
        data_div.innerHTML = "";       
        weather.map(function(elem){
            let div = document.createElement("div");
            let temp_max = document.createElement("p")
            temp_max.innerHTML = `Temp_max - ${elem.temp.max}°`
            let temp_min = document.createElement("p")
            temp_min.innerHTML = `Temp_min - ${elem.temp.min}°`
            let clouds = document.createElement("p")
            clouds.innerHTML = `Clouds - ${elem.clouds}`
            let sunrise = document.createElement("p")
            sunrise.innerHTML = `Sunrise - ${elem.sunrise}`
            let sunset = document.createElement("p")
            sunset.innerHTML = `Sunset - ${elem.sunset}`
            let wind_deg = document.createElement("p")
            wind_deg.innerHTML = `WindDeg - ${elem.wind_deg}`
            let wind_speed = document.createElement("p")
            wind_speed.innerHTML = `WindSpeed - ${elem.wind_speed}`

            div.append(temp_max,temp_min,clouds,sunrise,sunset,wind_deg,wind_speed);
            data_div.append(div);
        })

        let today = document.querySelector("#today");
        today.innerHTML = "";
        let city_name = document.createElement("h1")
        city_name.innerHTML = city;
        city_name.style.textDecoration = "underline"
        city_name.style.marginLeft = "100px"

        let div1 = document.createElement("div")
        let div2 = document.createElement("div")

        let temp_max = document.createElement("p")
        temp_max.innerHTML = `Temp_max - ${weather[0].temp.max}°`
        let temp_min = document.createElement("p")
        temp_min.innerHTML = `Temp_min - ${weather[0].temp.min}°`
        let clouds = document.createElement("p")
        clouds.innerHTML = `Clouds - ${weather[0].clouds}`
        let sunrise = document.createElement("p")
        sunrise.innerHTML = `Sunrise - ${weather[0].sunrise}`
        let sunset = document.createElement("p")
        sunset.innerHTML = `Sunset - ${weather[0].sunset}`
        let wind_deg = document.createElement("p")
        wind_deg.innerHTML = `WindDeg - ${weather[0].wind_deg}`
        let wind_speed = document.createElement("p")
        wind_speed.innerHTML = `WindSpeed - ${weather[0].wind_speed}`

        div1.append(temp_max,temp_min,clouds)
        div2.append(sunrise,sunset,wind_deg,wind_speed)
        let div3 = document.createElement("div");
        div3.append(div1,div2);
        div3.style.display = "flex";
        div3.style.justifyContent = "space-between"
        today.append(city_name,div3);
    }

    function map(cityName){
        let data_map = document.querySelector("#map");
        data_map.style.border = "2px solid white"
        data_map.style.borderRadius = "4px"
        data_map.innerHTML = "";
        data_map.innerHTML = `<div class="mapouter"><div class="gmap_canvas"><iframe width="300" height="300" id="gmap_canvas" src="https://maps.google.com/maps?q=${cityName}&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe><a href="https://fmovies-online.net"></a><br><style>.mapouter{position:relative;text-align:right;height:300px;width:300px;}</style><a href="https://www.embedgooglemap.net">embedgooglemap.net</a><style>.gmap_canvas {overflow:hidden;background:none!important;height:300px;width:300px;}</style></div></div>`
    }