const express = require("express");
const https = require("https");
const BodyParser = require("body-parser");

const app = express();

app.use(BodyParser.urlencoded({ extended: true }));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  console.log(req.body.CityName);

  const apikey = "3fbe999e1a259a2cd3c203af2318c007";
  const city = req.body.CityName;
  const unit = "metric";
  const url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apikey +
    "&units=" +
    unit;

  https.get(url, function (response) {
    console.log("Server status code: ", response.statusCode);
    if (response.statusCode === 200) {
      response.on("data", function (data) {
        const weatherData = JSON.parse(data);
        console.log("Data: ", weatherData);
        const temp = weatherData.main.temp;
        const des = weatherData.weather[0].description;
        const pressure = weatherData.main.pressure;
        const icon = weatherData.weather[0].icon;
        const imageURL =
          "https://openweathermap.org/img/wn/" + icon + "@2x.png";

        res.write("<h1> Weather Report</h1>");

        res.write("<h2>The weather is currently " + des + "</h2>");
        res.write(
          "<h3>The temperature in " +
            city +
            " is </h3><h1>" +
            temp +
            "</h1><h3>degree celsius.</h3>"
        );
        res.write("<img src =" + imageURL + ">");
        // "<h1>The temperautre in "+ city +" is "+ temp +" degrees celcius.<br>The weather description is "+ des +"</h1>"
        res.send();
      });
    } else {
      res.send(alert("OOPs!!, No Data is related to this Place"));
    }
  });
});
app.listen(3000, function () {
  console.log("Server started on port 3000...");
});
