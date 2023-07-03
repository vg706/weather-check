let weather = {
    apiKey: "7e666ddaca8b26a620f939873fc900f2",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" + city
            + "&units=metric&appid=" 
            + this.apiKey
        )
            .then((response) => response.json())
            .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;
        console.log(name, icon, description, temp, humidity, speed);
        document.querySelector(".city").innerHTML = "Tempo em " + name;
        document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerHTML = description;
        document.querySelector(".temperature").innerHTML = temp + "°C";
        document.querySelector(".humidity").innerHTML = "Umidade: " + humidity + "%";
        document.querySelector(".wind").innerHTML = "Velocidade do vento: " + speed + "km/h";
        document.querySelector(".weather").classList.remove("loading");
    },
    search: function() {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        weather.search();
    }
})

weather.fetchWeather("Fortaleza");