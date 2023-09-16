from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

# Conectar a la base de datos
conn = mysql.connector.connect(
    host="localhost",
    user="root",
    password="1234",
    database="products"
)

if conn.is_connected():
    print("Conexión exitosa a la base de datos")

# Endpoint para crear un producto
@app.route('/api/products', methods=['POST'])
def create_product():
    data = request.get_json()
    nombre = data['nombre']
    categoria = data['categoria']
    precio = data['precio']
    valor = data['valor']
    stock = data['stock']
    cursor = conn.cursor()
    sql = "INSERT INTO products (nombre, categoria, precio, valor, stock) VALUES (%s, %s, %s, %s, %s)"
    values = (nombre, categoria, precio, valor, stock)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    return jsonify({"message": "Producto creado con éxito"}), 201

# Endpoint para obtener todos los productos
@app.route('/api/products', methods=['GET'])
def get_products():
    cursor = conn.cursor()
    sql = "SELECT * FROM products"
    cursor.execute(sql)
    products = cursor.fetchall()
    cursor.close()
    return jsonify({"products": products}), 200

# Endpoint para actualizar un producto por ID
@app.route('/api/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    data = request.get_json()
    precio = data['precio']
    cursor = conn.cursor()
    sql = "UPDATE products SET precio = %s WHERE id = %s"
    values = (precio, product_id)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    return jsonify({"message": "Producto actualizado con éxito"}), 200

# Endpoint para eliminar un producto por ID
@app.route('/api/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    cursor = conn.cursor()
    sql = "DELETE FROM products WHERE id = %s"
    values = (product_id,)
    cursor.execute(sql, values)
    conn.commit()
    cursor.close()
    return jsonify({"message": "Producto eliminado con éxito"}), 200

if __name__ == '__main__':
    app.run(debug=True)
