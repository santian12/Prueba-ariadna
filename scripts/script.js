const url = "http://localhost:8000/api/products/";

document.addEventListener("DOMContentLoaded", function () {
    const responseDiv = document.getElementById("response");

    if (responseDiv) {
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                console.log(data); // Imprime la respuesta completa en la consola para inspección

                if (Array.isArray(data.products)) {
                    const products = data.products;

                    if (products.length > 0) {
                        const productRows = products.map((product) => {
                            return `
                                <tr>
                                    <td>${product.id}</td>
                                    <td>${product.nombre}</td>
                                    <td>${product.categoria}</td>
                                    <td>$${product.precio}</td>
                                    <td>$${product.valor}</td>
                                    <td>${product.stock}</td>
                                    <td>
                                        
                                    </td>
                                </tr>
                            `;
                        }).join('');

                        // Crear la tabla y agregar las filas generadas
                        const tableHTML = `
                            <div class="table-responsive">
                                <table class="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>ID</th>
                                            <th>Nombre</th>
                                            <th>Categoría</th>
                                            <th>Precio</th>
                                            <th>Valor</th>
                                            <th>Stock</th>
                                            <th><div class="dropdown">
                                            <span>Opciones</span>
                                            <div class="dropdown-content">
                                            <button id="addProductButton">Añadir Producto</button>
                                            <button id="addProductButton">Editar  Producto</button>
                                            <button id="addProductButton">Eliminar  Producto</button>
                                            </div></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${productRows}
                                    </tbody>
                                </table>
                            </div>
                        `;

                        responseDiv.innerHTML = tableHTML;
                    } else {
                        responseDiv.innerHTML = "No se encontraron elementos para mostrar.";
                    }
                } else {
                    console.error("La respuesta no contiene un arreglo 'products'.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
            });
    } else {
        console.error("El elemento con el ID 'response' no se encontró en el documento.");
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const createProductForm = document.getElementById("createProductForm");

    createProductForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(createProductForm);

        // Crear un objeto con los datos del formulario
        const newProduct = {
            nombre: formData.get("nombre"),
            categoria: formData.get("categoria"),
            precio: parseFloat(formData.get("precio")),
            valor: parseFloat(formData.get("valor")),
            stock: parseInt(formData.get("stock")),
            fecha_creacion: null  // Agrega fecha_creacion como nulo en la solicitud
        };

       
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProduct),
        })
        .then((response) => response.json())
        .then((data) => {
       
            if (data.message === "Producto creado con éxito") {
                
            }
        })
        .catch((error) => {
            console.error("Error al crear el producto:", error);
        });
    });
});







