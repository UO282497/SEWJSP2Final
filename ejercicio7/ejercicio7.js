class Manager {
    manager() {

    }

    ocultar() {

        $("p").hide();
    }
    mostrar() {

        $("p").show();
    }
    modificarTexto() {
        $("p").text("Texto modificado");
    }
    deshacerModificacion() {
        $("p").text("Texto ocultable");
    }
    eliminar() {
        $("li p").remove();
        $("li h2").remove();
    }
    añadirTexto() {
        $("li p").first().append("Más texto ");
    }
    nuevo() {
        $("li section").after("<h2>Nuevo párrafo </h2><p></p>");
    }
    analizar() {
        $("*", document.body).each(function () {
            var etiquetaPadre = $(this).parent().get(0).tagName;
            $("article p").append("Etiqueta padre : " + etiquetaPadre + " elemento : " + $(this).get(0).tagName + " valor: ");

        });
    }
    contar() {
        var c = 0;
        var tc = new Array();
        var tr = new Array();
        var d = 0;
        $("table tr:first th").each(function () {
            d++;
        });

        $("table tr").each(function () {
            c++;
        });
        //sumar filas
        $("table tr").each(function () {
            var aux = 0;
            var q = this.getElementsByTagName("th");
            for (var i = 0; i < q.length; i++) {
                aux += Number(q[i].innerText);
            }


            var q = this.getElementsByTagName("td");
            for (var i = 0; i < q.length; i++) {
                aux += Number(q[i].innerText);
            }

            tr.push(aux);

        });



        $("table tr:first th").each(function () {

        });









        $("main p").append("La tabla tiene un total de " + c + " filas, y " + d + " columnas, la suma de las filas es [" + tr + "]");
    }



}
var manager = new Manager();



