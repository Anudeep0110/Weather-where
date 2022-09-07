const express = require('express')
const bodyparser = require('body-parser')
const request = require('request')

const app=express();

const apikey = "f8c5ff9e8c84658e388c91ff1377ddb0";

app.use(express.static("public"));
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine","ejs");

app.get('/',function(req , res){
    res.render("index",{weather:null,error:null})
})

app.post('/',function(req ,res) {
    let city=req.body.city;
    let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`
    console.log(req.body.city)
    request(url,function(err,response,body) {
        if(err){
            res.render("index",{weather:null,error:"Error"});
        }else{
            let weather= JSON.parse(body);
            if(weather.main == undefined){
                res.render('index',{weather:null,error:"Error Please Try Again 2"});
            }else{
                let weatherText = `Its ${weather.main.temp} degrees Celsius with ${weather.weather[0].main} in ${weather.name}!`
                res.render('index',{weather:weatherText,error:null});
                console.log('body :' ,body);
            }
        }
    }) ; 
});

app.listen(3000,function() {
    console.log("weather-where is listening on port number 3000");
});