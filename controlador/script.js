function getProducts() {
    fetch('/api/products') // La URL de la API
        .then(response => response.json())
        .then(data => {
            const productList = document.getElementById('product-list');
            productList.innerHTML = ''; // Limpiar contenido anterior
            data.products.forEach(product => {
                productList.innerHTML += `
                    <div>
                        <strong>ID:</strong> ${product[0]}<br>
                        <strong>Nombre:</strong> ${product[1]}<br>
                        <strong>Categoría:</strong> ${product[2]}<br>
                        <strong>Precio:</strong> ${product[3]}<br>
                        <strong>Valor:</strong> ${product[4]}<br>
                        <strong>Stock:</strong> ${product[5]}<br><br>
                    </div>
                `;
            });
        })
        .catch(error => console.error('Error:', error));
}

// Llamar a la función para obtener la lista de productos al cargar la página
getProducts();