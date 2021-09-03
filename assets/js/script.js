const apiKey = "&appid=5b702f68e450e383e91df8482147218e";

$("#searchBtn").on("click", function () {
  const city = $("#searchTerm").val();

  const queryUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    apiKey +
    "&units=imperial";
  $.ajax({
    url: queryUrl,
    method: "GET",
  }).then(function (response) {
    getCurrentConditions(response,city);
    getCurrentForecast(city);
    makeList();
  });
});

function makeList() {
  let listItem = $("<li>").addClass("list-group-item").text(city);
  $(".list").append(listItem);
}

function getCurrentConditions(response) {
  const card = $("<div>").addClass("card");
  const cardBody = $("<div>").addClass("card-body");
  const city = $("<h4>").addClass("card-title").text(response.name);
  const cityDate = $("<h4>")
    .addClass("card-title")
    .text(new Date().toLocaleDateString("en-US"));
  const temperature = $("<p>")
    .addClass("card-text current-temp")
    .text("Temperature: " + response.main.temp + " °F");
  const humidity = $("<p>")
    .addClass("card-text current-humidity")
    .text("Humidity: " + response.main.humidity + "%");
  const wind = $("<p>")
    .addClass("card-text current-wind")
    .text("Wind Speed: " + response.wind.speed + " MPH");
  const image = $("<img>").attr(
    "src",
    "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png"
  );

  // add to page
  city.append(cityDate, image);
  cardBody.append(city, temperature, humidity, wind);
  card.append(cardBody);
  $("#currentCity").append(card);
}

function getCurrentForecast(city) {
  $.ajax({
    url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
    method: "GET",
  }).then(function (response) {
    const results = response.list;
    for (let i = 0; i < results.length; i++) {
      const day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
      const hour = results[i].dt_txt.split("-")[2].split(" ")[1];

      if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
        const card = $("<div>").addClass(
          "card col-md-2 ml-4 bg-primary text-white"
        );
        const cardBody = $("<div>").addClass("card-body p-3 forecastBody");
        const cityDate = $("<h4>")
          .addClass("card-title")
          .text(new Date().toLocaleDateString("en-US"));
        const temperature = $("<p>")
          .addClass("card-text forecastTemp")
          .text("Temperature: " + results[i].main.temp + " °F");
        const humidity = $("<p>")
          .addClass("card-text forecastHumidity")
          .text("Humidity: " + results[i].main.humidity + "%");

        const image = $("<img>").attr(
          "src",
          "https://openweathermap.org/img/w/" +
            results[i].weather[0].icon +
            ".png"
        );

        cardBody.append(cityDate, image, temperature, humidity);
        card.append(cardBody);
        $("#forecast").append(card);
      }
    }
  });
}
