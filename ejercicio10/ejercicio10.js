class Manager {
    constructor() {
        this.url = "https://miguelangelcolmenero.eu/combustible/fuel_prices.json";
    }

    cargar() {

        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function (result) {
                var aux = "<ul>";
                var highest = 2;
                var lowest = 2;
                for (let i = 2; i < result.length; i++) {
                    aux += "<li>" + result[i].country + ": " + result[i].gasoline + "€</li>"
                    if (result[i].gasoline > result[highest].gasoline) {
                        highest = i;
                    }
                    if (result[i].gasoline < result[lowest].gasoline) {
                        lowest = i;
                    }
                }
                aux += "</ul>"
                $("main").html(aux);

                var aux2 = "<p>Esta semana, " + result[highest].country + " es el país con el precio más alto: " + result[highest].gasoline + "€</p>"

                $("main").append(aux2);

                var aux3 = "<p>Esta semana, " + result[lowest].country + " es el país con el precio más bajo: " + result[lowest].gasoline + "€</p>"

                $("main").append(aux3);

            },
            error: function () {
                var aux = "Se ha producido un error, por favor inténtalo más tarde.";
                $("main").html(aux);
            }

        });

    }

}

var m = new Manager();
