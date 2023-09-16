from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Puedes configurar aquí los dominios permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Conectar a la base de datos
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="products"
)

if conn.is_connected():
    print("Conexión exitosa a la base de datos")

# Modelo Pydantic para Productos
class Product(BaseModel):
    id: int
    nombre: str
    categoria: str
    precio: float
    valor: float
    stock: int
    fecha_creacion: str

# Endpoint para crear un producto
@app.post("/api/products/", response_model=Product)
def create_product(product: Product):
    cursor = conn.cursor()
    sql = "INSERT INTO products (nombre, categoria, precio, valor, stock) VALUES (%s, %s, %s, %s, %s)"
    values = (product.nombre, product.categoria, product.precio, product.valor, product.stock)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    
    # Obtener el ID del producto recién creado
    product.id = cursor.lastrowid
    
    return product

# Endpoint para obtener todos los productos
@app.get("/api/products/")
def get_products():
    cursor = conn.cursor(dictionary=True)  # Esto devuelve un diccionario en lugar de una tupla
    sql = "SELECT * FROM products"
    cursor.execute(sql)
    products = cursor.fetchall()
    cursor.close()
    return {"products": products}

# Endpoint para actualizar un producto por ID
@app.put("/api/products/{product_id}/", response_model=Product)
def update_product(product_id: int, product: Product):
    cursor = conn.cursor()
    sql = "UPDATE products SET precio = %s WHERE id = %s"
    values = (product.precio, product_id)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    return {"message": "Producto actualizado con éxito", "product": product}

# Endpoint para eliminar un producto por ID
@app.delete("/api/products/{product_id}/")
def delete_product(product_id: int):
    cursor = conn.cursor()
    sql = "DELETE FROM products WHERE id = %s"
    values = (product_id,)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    return {"message": "Producto eliminado con éxito"}

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
    


