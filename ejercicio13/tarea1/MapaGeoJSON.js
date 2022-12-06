class Manager {
    constructor() {
        this.mapasitio;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");

    }
    getMapaDin() {
        var cen = { lat: 0, lng: 0 };
        this.mapasitio = new google.maps.Map(document.getElementsByTagName('section')[0], { zoom: 2, center: cen });
    }


    calcularTamañoArchivos() {

        //Solamente admite archivos de tipo texto

        var parser = new DOMParser();
        var archivo = document.getElementsByTagName("input")[0].files[0];
        var texto = "";
        var lector = new FileReader();
        var handle = this;
        lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            texto += lector.result;
            var kml = parser.parseFromString(texto, "application/xml");
            var elements = kml.querySelectorAll("coordinates");
            elements.forEach(element => {

                var sitio = { lat: Number(element.textContent.split(",")[1]), lng: Number(element.textContent.split(",")[0]) };
                var marcador = new google.maps.Marker({ position: sitio, map: handle.mapasitio });

            });



        }
        lector.readAsText(archivo);

    }









}

var m = new Manager();
