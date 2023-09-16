// Create connection
$conn = new mysqli("localhost", "root", "", "products");
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
// Create a new product
$product_name = "New Product";
$product_category = "Category 4";
$product_price = 400.00;
$product_value = 400.00;
$product_stock = 40;

$sql = "INSERT INTO products (nombre, categoria, precio, valor, stock) VALUES ('$product_name', '$product_category', $product_price, $product_value, $product_stock)";

if ($conn->query($sql) === TRUE) {
    echo "New product created successfully";
} else {
    echo "Error creating product: " . $conn->error;
}

// Create a new category
$category_name = "Category 4";
$category_description = "Description of Category 4";

$sql = "INSERT INTO categories (nombre, descripcion) VALUES ('$category_name', '$category_description')";

if ($conn->query($sql) === TRUE) {
    echo "New category created successfully";
} else {
    echo "Error creating category: " . $conn->error;
}
// Retrieve all products
$sql = "SELECT * FROM products";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Product ID: " . $row["id"] . "<br>";
        echo "Name: " . $row["nombre"] . "<br>";
        echo "Category: " . $row["categoria"] . "<br>";
        echo "Price: " . $row["precio"] . "<br>";
        echo "Value: " . $row["valor"] . "<br>";
        echo "Stock: " . $row["stock"] . "<br><br>";
    }
} else {
    echo "No products found";
}

// Retrieve all categories
$sql = "SELECT * FROM categories";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        echo "Category ID: " . $row["id"] . "<br>";
        echo "Name: " . $row["nombre"] . "<br>";
        echo "Description: " . $row["descripcion"] . "<br><br>";
    }
} else {
    echo "No categories found";
}
$product_id_to_update = 1; // Replace with the ID of the product you want to update
$new_product_price = 150.00;

$sql = "UPDATE products SET precio = $new_product_price WHERE id = $product_id_to_update";

if ($conn->query($sql) === TRUE) {
    echo "Product updated successfully";
} else {
    echo "Error updating product: " . $conn->error;
}
$product_id_to_delete = 2; // Replace with the ID of the product you want to delete

$sql = "DELETE FROM products WHERE id = $product_id_to_delete";

if ($conn->query($sql) === TRUE) {
    echo "Product deleted successfully";
} else {
    echo "Error deleting product: " . $conn->error;
}
