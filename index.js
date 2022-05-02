const express = require('express');
const requestIp = require('request-ip');
const geoip = require('geoip-lite');
const date = require('./getDate'); //dodanie funkcji czasu przy uruchomieniu aplikacji

const app = express();
const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    var clientIp = requestIp.getClientIp(req); //pozyskanie adresu IP klienta
    try{
        if(clientIp == '::1' || clientIp == '::ffff:127.0.0.1' || clientIp == '::ffff:172.17.0.1'){ //jezeli uruchomiono aplikację na localhost
          let date_nz = new Date();
          let year = date_nz.getFullYear();
          let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
          let date = ("0" + date_nz.getDate()).slice(-2);
          let hours = ("0" + date_nz.getHours()).slice(-2);
          let minutes = ("0" + date_nz.getMinutes()).slice(-2);
          let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
          res.send("IP address: " + clientIp + "<br />Timezone: GMT" + (date_nz.getTimezoneOffset()) / 60 + "<br />" + date_time);
          //dla klienta localhost, aplikacja korzysta z czasu systemowego
        }
        else{ //jezeli adres ip jest inny niż localhost
          var geo = geoip.lookup(clientIp); //namierzenie lokalizacji po adresie IP
          let nz_date_string = new Date().toLocaleString("en-US", { timeZone: geo.timezone }); 
                  //stworzenie obiektu Date z przypisaną strefą czasową, jaka została wykryta po adresie IP
          let date_nz = new Date(nz_date_string);
          let year = date_nz.getFullYear();
          let month = ("0" + (date_nz.getMonth() + 1)).slice(-2);
          let date = ("0" + date_nz.getDate()).slice(-2);
          let hours = ("0" + date_nz.getHours()).slice(-2);
          let minutes = ("0" + date_nz.getMinutes()).slice(-2);
          let date_time = year + "-" + month + "-" + date + " " + hours + ":" + minutes;
          
          res.send("IP address: " + clientIp + "<br />Timezone: " + geo.timezone + "<br/>" + date_time);
          //dla klienta zewnętrznego, aplikacja wychwytuje adres IP, na jego podstawie określa geolokalizację, a następnie na podstawie określonej strefy czasowej,
          //podaje czas dla danej lokalizacji
        }
   
    }
    catch(error){
        res.send("Error occurred: " + error);
    }
    
});

app.listen(PORT, () => 
  console.log(date() + ` Author: Michał Nurzyński, server is listening on port ${PORT}`));

  