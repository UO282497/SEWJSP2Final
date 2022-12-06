class Manager {
    constructor() {
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.showErrors.bind(this));
    }
    showErrors(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                this.mensaje = "El usuario no permite la petición de geolocalización"
                break;
            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Información de geolocalización no disponible"
                break;
            case error.TIMEOUT:
                this.mensaje = "La petición de geolocalización ha caducado"
                break;
            case error.UNKNOWN_ERROR:
                this.mensaje = "Se ha producido un error desconocido"
                break;
        }
    }

    getPosicion(posicion) {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud = posicion.coords.longitude;
        this.latitud = posicion.coords.latitude;
        this.precision = posicion.coords.accuracy;
        this.altitud = posicion.coords.altitude;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo = posicion.coords.heading;
        this.velocidad = posicion.coords.speed;
        this.imagenMapa = "";
    }
    show(element) {
        var ubicacion = document.getElementsByTagName(element)[0];
        var datos = '<p>' + this.mensaje + '</p>';
        datos += '<p>Longitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Latitud: ' + this.latitud + ' grados</p>';
        datos += '<p>Precisión de la latitud y longitud: ' + this.precision + ' metros</p>';
        datos += '<p>Altitud: ' + this.altitude + ' metros</p>';
        datos += '<p>Precisión de la altitud: ' + this.precisionAltitud + ' metros</p>';
        datos += '<p>Rumbo: ' + this.rumbo + ' grados</p>';
        datos += '<p>Velocidad: ' + this.velocidad + ' metros/segundo</p>';

    }
    getMapaEstaticoGoogle(ubicacion) {
        var ubicacion = document.getElementsByTagName(ubicacion)[0];
        var apiKey = "&key=AIzaSyC6j4mF6blrc4kZ54S6vYZ2_FpMY9VzyRU";
        var url = "https://maps.googleapis.com/maps/api/staticmap?";
        var centro = "center=" + this.latitud + "," + this.longitud;
        var zoom = "&zoom=15";
        var tamaño = "&size=800x600";
        var marcador = "&markers=color:red%7Clabel:P%7C" + this.latitud + "," + this.longitud;
        var sensor = "&sensor=false";
        this.imagenMapa = url + centro + zoom + tamaño + marcador + sensor + apiKey;
        ubicacion.innerHTML = "<img src='" + this.imagenMapa + "' alt='mapa con la posición del usuario' />";
    }
    getMapaDin() {
        var sitio = { lat: 21.4224779, lng: 39.8251832 };
        var sitio2 = { lat: this.latitud, lng: this.longitud };
        var mapasitio = new google.maps.Map(document.getElementsByTagName('article')[0], { zoom: 8, center: sitio2 });
        var marcador = new google.maps.Marker({ position: sitio, map: mapasitio });
        var marcador = new google.maps.Marker({ position: sitio2, map: mapasitio });
        var coords = [
            { lat: 21.4224779, lng: 39.8251832 },
            { lat: this.latitud, lng: this.longitud },

        ];
        var poly = new google.maps.Polyline({
            path: coords,
            geodesic: true,
            strokeColor: "#FF0000",
            strokeOpacity: 1.0,
            strokeWeight: 2,
        });
        poly.setMap(mapasitio);
    }




}



var m = new Manager();
