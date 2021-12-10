function getProduct() {
    $.ajax({
        url: "http://localhost:8080/api/product/all",
        type: "GET",
        datatype: "JSON",
        success: function (response) {
            console.log(response);
            printListProduct(response);
        }
    });
}

function printListProduct(response) {
    let myTable = "<table>"
    myTable += "<tr>";
    myTable += "<td>Marca</td>";
    myTable += "<td>Categoría</td>";
    myTable += "<td>Presentación</td>";
    myTable += "<td>Descripción</td>";
    myTable += "<td>Precio</td>";
    myTable += "<td>Disponibilidad</td>";
    myTable += "<td>Cantidad</td>";
    myTable += "<td>Fotografía</td>";
    "</tr>";
    for (i = 0; i < response.length; i++) {
        myTable += "<tr>";
        myTable += "<td>" + response[i].brand + "</td>";
        myTable += "<td>" + response[i].category + "</td>";
        myTable += "<td>" + response[i].presentation + "</td>";
        myTable += "<td>" + response[i].description + "</td>";
        myTable += "<td>" + response[i].price + "</td>";
        myTable += "<td>" + response[i].availability + "</td>";
        myTable += "<td>" + response[i].quantity + "</td>";
        myTable += "<td>" + response[i].photography + "</td>";
        myTable += '<td><button class = "" onclick="borrar(' + response[i].id + ')">Borrar Producto!</button></td>';
        myTable += '<td><button class = "" onclick="cargarDatosSkate(' + response[i].id + ')">Editar Producto!</button></td>';
        myTable += '<td><button class = "" onclick="actualizar(' + response[i].id + ')">Actualizar Producto!</button></td>';
        myTable += "</tr>";
    }
    myTable += "</table>";
    $("#myListProduct").html(myTable);
}

function borrar(idProduct) {
    var element = {
        id: idProduct
    }
    /* Stringyfy convertir html a un objeto json */
    var dataToSend = JSON.stringify(element);

    $.ajax({
        dataType: 'json',
        data: dataToSend,
        url: "http://localhost:8080/api/product/" + idProduct,
        type: 'DELETE',
        contentType: "application/JSON",
        success: function (response) {
            console.log(response);
            $("#myListProduct").empty();

            alert("se ha Eliminado Correctamente!")
        },

        error: function (jqXHR, textStatus, errorThrown) {
            alert("No se Elimino Correctamente!")
        }
    });
}

function loadData(idProduct) {
    $.ajax({
        dataType: 'json',
        url: "http://localhost:8080/api/product/" + idProduct,
        type: 'GET',

        success: function (response) {
            console.log(response);
            var item = response;

            $("#brand").val(item.brand);
            $("#category").val(item.category);
            $("#presentation").val(item.presentation);
            $("#description").val(item.description);
            $("#price").val(item.price);
            $("#availability").val(item.availability);
            $("#quantity").val(item.quantity);
            $("#photography").val(item.photography);
        },
        error: function (jqXHR, textStatus, errorThrown) {}
    });
}

function updateData(idProduct) {

    if ($("#brand").val().length == 0 || $("#category").val().length == 0 || $("#presentation").val().length == 0 
    || $("#description").val().length == 0 ||  $("#price").val().length== 0  || $("#availability").val().length==0
    || $("#quantity").val().length==0 ||   $("#photography").val().length==0)  {
        alert("Todos los campos deben estar llenos")
    } else {
        let element = {
            id: idProduct,
            brand: $("#brand").val(),
            category: $("#category").val(),
            presentation: $("#presentation").val(),
            description: $("#description").val(),
            price: $("#price").val(),
            availability:$("#availability").val(),
            photography:$("#photography").val()            
        }

        console.log(element);
        let dataToSend = JSON.stringify(element);

        $.ajax({
            datatype: 'json',
            data: dataToSend,
            contentType: "application/JSON",            
            url: "http://localhost:8080/api/product/update",
            type: "PUT",

            success: function (response) {
                console.log(response);
                $("#myListProduct").empty();
                getUser();
                alert("se ha Actualizado Correctamente!")               
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}