const url = "http://localhost:5000/api/products";
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
              <div class="product-card">
              <div class="product-image">
            
                  <img src="${product.featuredImage.url}" class="product-thumb" alt="">
                  <button class="card-btn">add to cart</button>
              </div>
              <div class="product-info">
                  <h2 class="product-brand">${product.title}</h2>
                  <span class="stars"></span><span class="tags">()</span>
                  <span class="price"> ${product.prices.max.amount} </span><span class="actual-price"></span>

              </div>
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