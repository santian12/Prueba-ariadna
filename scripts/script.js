const url = "http://127.0.0.1:5000/api/products";

const responseDiv = document.getElementById("response");
document.addEventListener("DOMContentLoaded", function() {
    const responseDiv = document.getElementById("response");
  
    if (responseDiv) {
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          console.log(data); // Imprime la respuesta completa en la consola para inspección
  
          if (Array.isArray(data.products) && data.products.nodes.length > 0) {
            const products = data.products;
            const productHTML = products.map((product) => {







// Renderiza el promedio y el número de estrellas

//fin del sistema

//fin regla

              return `
              <div class="container">
              <div class="columntr">
                  <h2>Columna 1</h2>
                  <p>Contenido de la columna 1.</p>
              </div>
              <div class="columntr">
                  <h2>Columna 2</h2>
                  <p>Contenido de la columna 2.</p>
              </div>
              <div class="columntr">
                  <h2>Columna 3</h2>
                  <p>Contenido de la columna 3.</p>
              </div>
              `;
            }).join('');
  
            responseDiv.innerHTML = productHTML;
          } else {
            console.error("No se encontraron elementos para mostrar.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      console.error("El elemento con el ID 'response' no se encontró en el documento.");
    }
  });