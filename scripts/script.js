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
                        const productHTML = products.map((product) => {
                            return `
                                <div class="container">
                                    <div class="columntr">
                                        <h2>ID: ${product.id}</h2>
                                        <p>Nombre: ${product.nombre}</p>
                                    </div>
                                    <div class="columntr">
                                        <h2>Categoría: ${product.categoria}</h2>
                                        <p>Precio: $${product.precio}</p>
                                    </div>
                                    <div class="columntr">
                                        <h2>Valor: $${product.valor}</h2>
                                        <p>Stock: ${product.stock}</p>
                                    </div>
                                </div>
                            `;
                        }).join('');

                        responseDiv.innerHTML = productHTML;
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
