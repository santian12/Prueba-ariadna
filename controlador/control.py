
import mysql.connector

# Conectar a la base de datos
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="products"
)

if conn.is_connected():
    print("Conexión exitosa a la base de datos")

# Función para crear un nuevo producto
def create_product(nombre, categoria, precio, valor, stock):
    cursor = conn.cursor()
    sql = "INSERT INTO products (nombre, categoria, precio, valor, stock) VALUES (%s, %s, %s, %s, %s)"
    values = (nombre, categoria, precio, valor, stock)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    print("Producto creado con éxito")

# Función para leer todos los productos
def read_products():
    cursor = conn.cursor()
    sql = "SELECT * FROM products"
    cursor.execute(sql)
    products = cursor.fetchall()
    cursor.close()
    return products

# Función para actualizar un producto por ID
def update_product(product_id, precio):
    cursor = conn.cursor()
    sql = "UPDATE products SET precio = %s WHERE id = %s"
    values = (precio, product_id)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    print("Producto actualizado con éxito")

# Función para eliminar un producto por ID
def delete_product(product_id):
    cursor = conn.cursor()
    sql = "DELETE FROM products WHERE id = %s"
    values = (product_id,)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    print("Producto eliminado con éxito")

# Ejemplos de uso
create_product("Producto 4", "Categoría 1", 150.00, 150.00, 15)
update_product(1, 120.00)
delete_product(2)

# Leer y mostrar todos los productos
products = read_products()
for product in products:
    print("ID:", product[0])
    print("Nombre:", product[1])
    print("Categoría:", product[2])
    print("Precio:", product[3])
    print("Valor:", product[4])
    print("Stock:", product[5])
    print()

# Cerrar la conexión a la base de datos
conn.close()
