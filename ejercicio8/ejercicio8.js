class Meteo {
    constructor(){
        this.apikey = "9d8c487a5ead2a5b0102e60f50b78326";
        this.ciudad = "Oviedo";
        this.pais = "ES";
        this.uds = "&units=metric";
        this.lang = "&lang=es";
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + this.ciudad + "," + this.pais + this.uds + this.lang + "&APPID=" + this.apikey;
    }

    cargar(){
        
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(result){
                var aux = "Datos del tiempo"
                
                aux += "<img src= \"http://openweathermap.org/img/wn/"+ result.weather[0].icon+"@2x.png\" alt=\" Icono del tiempo\">";
                aux += "<ul><li>Temperatura " + result.main.temp + "</li>";
                aux += "<li>Temp máx " + result.main.temp_max + "</li>";
                aux += "<li>Temp min " + result.main.temp_min + "</li>";
                aux += "<li>Nubosidad " + result.clouds.all + "</li>";
                aux += "<liDescripción: " + result.weather[0].description + "</li>";
                aux += "<li>Velocidad del viento " + result.wind.speed + "</li>";
                aux += "<li>Dirección del viento " + result.wind.deg + "</li>";
                aux += "<li>Humedad " + result.main.humidity + "</li>";
                aux += "<li>Presión " + result.main.pressure + "</li>";
                aux += "<li>Hora del amanecer "  + new Date(result.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                aux += "<li>Hora del anochecer " + new Date(result.sys.sunset *1000).toLocaleTimeString() + "</li></ul>";

                aux+= "Datos del lugar";
                aux += "<ul><li>Ciudad " + result.name + "</li>";        
                aux += "<li>País " + result.sys.country + "</li>";
                aux += "<li>Latitud " + result.coord.lat + "</li>";
                aux += "<li>Longitud " + result.coord.long + "</li></ul>";

                
                $("p").html(aux);
                
                
            },
            error:function(){
                var aux = "Se ha producido un error, por favor inténtalo más tarde.";
                alert(aux);
                $("p").html(aux);
            }

        });
    }

}
var meteo=new Meteo();
