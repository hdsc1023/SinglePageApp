//ficheros para correr node
 var express = require("express");
 var app = express();
 var bodyParser = require("body-parser");

 var https = require("https");
 app.use(bodyParser.urlencoded({extended: true}));

 app.get("/", function(req,res){
   res.sendFile(__dirname + "/index.html");
 });

 app.post("/", function(req,res){

   var query = req.body.cityName;
   // console.log(query);
   var apikey = "7b1f4a92dd310a7a8fe217699edd9edb";
   var unit = "metric";
   url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apikey + "&units=" + unit;

   https.get(url, function(response){
     console.log(response.statusCode);

     response.on("data",function(data){
       var weatherdata = JSON.parse(data);
       var temp = weatherdata.main.temp;
       var weatherdescription = weatherdata.weather[0].description;
       var weathericon = weatherdata.weather[0].icon;
       var imageURL = "https://openweathermap.org/img/wn/"+ weathericon +"@2x.png";
       //console.log(temp + " " + weatherdescription);
       res.write("<p>The weather is currently " + weatherdescription + "</p>");
       res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius. </h1>");
       res.write("<img src=" + imageURL + ">");
       res.send();
     });

   });
   //console.log("Botton received");
 });

 app.post("/index",function(req,res){
  res.redirect("/");
});

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started on port 3000");
});
