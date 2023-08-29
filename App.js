let weather = {
    apiKey: "ba464cb77f83016e077981f772615d2c",
    city: "Sevilla",
    fetchData() {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" +
            this.city +
            "&units=metric&appid=" +
            this.apiKey
        ).then((response) => {
            if (!response.ok) {
                throw new Error("No weather found.");
            }
            return response.json();
            
        }).then((data) => this.displayWeather(data))
            .catch((error) => {
                alert("No weather found.");
                console.error(error);
            });
    },
    displayWeather(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        const cityElement = document.querySelector(".city");
        const iconElement = document.querySelector(".icon");
        const descriptionElement = document.querySelector(".description");
        const tempElement = document.querySelector(".temp");
        const humidityElement = document.querySelector(".humidity");
        const windElement = document.querySelector(".wind");
        const weatherElement = document.querySelector(".weather");

        cityElement.innerText = "Weather in " + name;
        iconElement.src =
            "https://openweathermap.org/img/wn/" + icon + ".png";
        descriptionElement.innerText = description;
        tempElement.innerText = temp + "°C";
        humidityElement.innerText = "Humidity: " + humidity + "%";
        windElement.innerText = "wind speed: " + speed + " km/h";
        weatherElement.classList.remove("loading");
    },
    search() {
        this.city = document.querySelector(".search-bar").value;
        
        this.fetchData();
    },
};

document.querySelector(".search button").addEventListener("click", () => {
        weather.search();
    });

document.querySelector(".search-bar").addEventListener("keyup", event => {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchData();
