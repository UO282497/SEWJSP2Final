class Manager {
    constructor() {
        this.array = new Array();
        this.mapasitio;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        }
        else document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");

        var a = this;

        var deleteRequest = indexedDB.deleteDatabase("testdb");

        const request = indexedDB.open("testdb", 3);

        request.onupgradeneeded = (event) => {

            a.db = event.target.result;

            // Create another object store called "names" with the autoIncrement flag set as true.
            const objStore = a.db.createObjectStore("testdb", { keyPath: "ssn" });
            let indexx = objStore.createIndex('x', 'x', {
                unique: false
            });
            let indexy = objStore.createIndex('y', 'y', {
                unique: false
            });

            // Because the "names" object store has the key generator, the key for the name value is generated automatically.
            // The added records would be like:
            // key : 1 => value : "Bill"
            // key : 2 => value : "Donna"
            const structs = [
                { ssn: "edificio-1", x: 0.1, y: 0.1 },
                { ssn: "edificio-2", x: 0.2, y: 0.2 },
                { ssn: "edificio-3", x: 0.3, y: 0.3 },
                { ssn: "carretera-1", x: 0.1, y: 0.8 },
                { ssn: "carretera-2", x: 0.2, y: 0.8 },
                { ssn: "carretera-3", x: 0.3, y: 0.8 },
                { ssn: "plaza-1", x: 0.5, y: 0.5 },
                { ssn: "plaza-2", x: 0.6, y: 0.6 },
                { ssn: "plaza-3", x: 0.7, y: 0.7 },
                { ssn: "monumento-1", x: 0.2, y: 0.2 },
                { ssn: "monumento-2", x: 0.3, y: 0.3 }
            ];
            objStore.transaction.oncomplete = (event) => {
                // Store values in the newly created objectStore.
                const structsObjStore = a.db.transaction("testdb", "readwrite").objectStore("testdb");
                structs.forEach((struct) => {
                    structsObjStore.add(struct);
                });
            };



        };
        this.initBD();

    }

    initBD() {


    }

    getMapaDin() {
        var cen = { lat: 0, lng: 0 };
        this.mapasitio = new google.maps.Map(document.getElementsByTagName('main')[0], { zoom: 2, center: cen });
    }


    calcularTamañoArchivos() {

        //Solamente admite archivos de tipo texto


        var parser = new DOMParser();
        var archivo = document.getElementsByTagName("input")[0].files[0];
        var s1 = archivo.name.split(".")[1];
        var s2 = "xml";
        if (s1 != s2) {
            return;
        }
        var texto = "";
        var lector = new FileReader();
        var handle = this;
        lector.onload = function (evento) {
            //El evento "onload" se lleva a cabo cada vez que se completa con éxito una operación de lectura
            //La propiedad "result" es donde se almacena el contenido del archivo
            //Esta propiedad solamente es válida cuando se termina la operación de lectura
            texto += lector.result;
            var xml = parser.parseFromString(texto, "application/xml");
            var elements = xml.querySelectorAll("estructuras > *");

            elements.forEach(element => {

                const transaction = handle.db.transaction(["testdb"], "readwrite");
                const objectStore = transaction.objectStore("testdb");
                var key = element.nodeName + "-" + element.innerHTML;
                console.log(key);
                const requestn = objectStore.get(key);
                requestn.onerror = (event) => {
                    // Handle errors!
                };
                requestn.onsuccess = (event) => {
                    // Do something with the request.result!

                    console.log("Found " + requestn.result.x + " - " + requestn.result.y);
                    handle.array.push(requestn.result);


                };


            });
            //Ya está el array de tamaños devuelto de la base de datos, ahora hay que calcular el area total
            setTimeout(() => {
                var finalx = 0;
                var finaly = 0;
                handle.array.forEach(element => {
                    finalx += element.x;
                    finaly += element.y;

                });
                var q = xml.querySelectorAll("coordenadas")[0];
                var t = q.innerHTML;
                var a = Number(String(t).split(",")[0]);
                var o = Number(String(t).split(",")[1]);

                const triangleCoords = [
                    { lat: a - finaly / 2, lng: o - finalx / 2 },
                    { lat: a - finaly / 2, lng: o + finalx / 2 },
                    { lat: a + finaly / 2, lng: o + finalx / 2 },
                    { lat: a + finaly / 2, lng: o - finalx / 2 },
                ];

                // Construct the polygon.
                const bermudaTriangle = new google.maps.Polygon({
                    paths: triangleCoords,
                    strokeColor: "#FF0000",
                    strokeOpacity: 0.8,
                    strokeWeight: 2,
                    fillColor: "#FF0000",
                    fillOpacity: 0.35,
                });

                bermudaTriangle.setMap(handle.mapasitio);


                console.log("FINAL " + finalx + " - " + finaly);
            }, 500);




        }
        lector.readAsText(archivo);

    }









}

var m = new Manager();
