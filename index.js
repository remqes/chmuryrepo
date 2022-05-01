const express = require('express');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const date = require('./getDate');
const { time } = require('console');

const app = express();
const PORT = process.env.PORT || 8080;

app.set("view engine", "ejs");
app.get("/", function(req, res){ res.redirect("/index.html");  });
app.get('/', (req, res) => {
    try{
        if(clientIp == '::1' || clientIp == '::ffff:127.0.0.1'){
          let date_nz = new Date();
          let year = date_nz.getFullYear();
          let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
          let date = ("0" + date_nz.getDate()).slice(-2);
          let hours = ("0" + date_nz.getHours()).slice(-2);
          let minutes = ("0" + date_nz.getMinutes()).slice(-2);
          let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
          res.send("IP address: " + clientIp + "<br />Timezone: GMT" + (date_nz.getTimezoneOffset()) / 60 + "<br />" + date_time);
        }
        else{
          var geo = geoip.lookup(clientIp);
          let nz_date_string = new Date().toLocaleString("en-US", { timeZone: geo.timezone });
          let date_nz = new Date(nz_date_string);
          let year = date_nz.getFullYear();
          let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
          let date = ("0" + date_nz.getDate()).slice(-2);
          let hours = ("0" + date_nz.getHours()).slice(-2);
          let minutes = ("0" + date_nz.getMinutes()).slice(-2);
          let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
          
          res.send("IP address: " + clientIp + "<br />Timezone: " + geo.timezone + "<br/>" + date_time);
        }
   
    }
    catch(error){
        res.send("Error occurred: " + error);
    }
    
});

app.listen(PORT, () => 
  console.log(date() + ` Author: Michał Nurzyński, server is listening on port ${PORT}`));

  