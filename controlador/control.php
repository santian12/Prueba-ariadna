<?php
$host = "localhost";
$user = "root";
$password = "1234";
$database = "products";

// Conectar a la base de datos
$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

echo "Conexión exitosa a la base de datos<br>";

// Función para crear un nuevo producto
function create_product($nombre, $categoria, $precio, $valor, $stock, $conn) {
    $sql = "INSERT INTO products (nombre, categoria, precio, valor, stock) VALUES (?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssddd", $nombre, $categoria, $precio, $valor, $stock);

    if ($stmt->execute()) {
        echo "Producto creado con éxito<br>";
    } else {
        echo "Error al crear el producto: " . $stmt->error;
    }

    $stmt->close();
}

// Función para leer todos los productos
function read_products($conn) {
    $sql = "SELECT * FROM products";
    $result = $conn->query($sql);
    $products = array();

    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $products[] = $row;
        }
    }

    return $products;
}

// Función para actualizar un producto por ID
function update_product($product_id, $precio, $conn) {
    $sql = "UPDATE products SET precio = ? WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("di", $precio, $product_id);

    if ($stmt->execute()) {
        echo "Producto actualizado con éxito<br>";
    } else {
        echo "Error al actualizar el producto: " . $stmt->error;
    }

    $stmt->close();
}

// Función para eliminar un producto por ID
function delete_product($product_id, $conn) {
    $sql = "DELETE FROM products WHERE id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $product_id);

    if ($stmt->execute()) {
        echo "Producto eliminado con éxito<br>";
    } else {
        echo "Error al eliminar el producto: " . $stmt->error;
    }

    $stmt->close();
}

// Ejemplos de uso
create_product("Producto 4", "Categoría 1", 150.00, 150.00, 15, $conn);
update_product(1, 120.00, $conn);
delete_product(2, $conn);

// Leer y mostrar todos los productos
$products = read_products($conn);
foreach ($products as $product) {
    echo "ID: " . $product['id'] . "<br>";
    echo "Nombre: " . $product['nombre'] . "<br>";
    echo "Categoría: " . $product['categoria'] . "<br>";
    echo "Precio: " . $product['precio'] . "<br>";
    echo "Valor: " . $product['valor'] . "<br>";
    echo "Stock: " . $product['stock'] . "<br>";
    echo "<br>";
}

// Cerrar la conexión a la base de datos
$conn->close();
?>
