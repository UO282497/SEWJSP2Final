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
        var cen = { lat: 0, lng: 0 };
        var mapasitio = new google.maps.Map(document.getElementsByTagName('article')[0], { zoom: 8, center: cen });
        var marcador = new google.maps.Marker({ position: sitio, map: mapasitio });
    }
    getMapaEstatico(ubicacion) {
        mapboxgl.accessToken = 'pk.eyJ1Ijoic2VyZ2lvMDIiLCJhIjoiY2xiYWoxY3B6MTVqaDNvcmVjZjJ1MTMzZSJ9.mIOkKjgHCHlNui2iS98A5g';
        var map = new mapboxgl.Map({
            container: 'map',
            // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [this.longitud, this.latitud],
            zoom: 9,
            // causes pan & zoom handlers not to be applied, similar to
            // .dragging.disable() and other handler .disable() funtions in Leaflet.
            interactive: false
        });
        var marker1 = new mapboxgl.Marker()
            .setLngLat([this.longitud, this.latitud])
            .addTo(map);
    }



}



var m = new Manager();
