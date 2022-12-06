class Manager {
    constructor() {
        this.tiposvalidos = ["xml", "json", "txt"];
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");

    }


    calcularTamañoArchivos() {
        var nBytes = 0,
            archivos = document.getElementById("subirArchivos").files,
            nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
            nBytes += archivos[i].size;
        }
        var nombresTiposTamaños = "";
        for (var i = 0; i < nArchivos; i++) {
            nombresTiposTamaños += "<p>Archivo " + i + "  = " + archivos[i].name + " Tamaño: " + archivos[i].size + " bytes " + " Tipo: " + archivos[i].type + "</p>"
            var tipo = archivos[i].name.split(".")[1];
            if (this.tiposvalidos.includes(tipo)) {

                this.leerArchivoTexto(archivos[i]);



            }
            else {
                nombresTiposTamaños += "</p>";
            }

        }



        document.getElementsByTagName("p")[1].innerHTML = nArchivos;
        document.getElementsByTagName("p")[2].innerHTML = nBytes + " bytes";
        document.getElementsByTagName("p")[3].innerHTML = nombresTiposTamaños;


    }
    leerArchivoTexto(archivo) {
        //Solamente toma un archivo
        //var archivo = document.getElementById("archivoTexto").files[0];

        var contenido = document.getElementsByTagName("pre")[0];
        contenido.innerText = "Contenido de los archivos enseñables :"
        //Solamente admite archivos de tipo texto
        var tipoTexto = /text.*/;
        var tipoJson = /application.json/;
        if (archivo.type.match(tipoTexto) || archivo.type.match(tipoJson)) {
            var lector = new FileReader();
            lector.onload = function (evento) {
                //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
                //La propiedad "result" es donde se almacena el contenido del archivo
                //Esta propiedad solamente es válida cuando se termina la operación de lectura
                contenido.innerText += "\n" + archivo.name + " :\n" + lector.result + "\n";
            }
            lector.readAsText(archivo);
        }
        else {
            errorArchivo.innerText = "Error : ¡¡¡ Archivo no válido !!!";
        }
    }






}

var m = new Manager();
