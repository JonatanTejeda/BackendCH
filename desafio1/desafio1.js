class ProductManager {
  constructor() {
    this.products = [];
  }

  static id = 0;

  addProduct(title, description, price, image, code, stock) {
    for (let i = 0; i < this.products.length; i++) {
      if (this.products[i].code === code) {
        console.log(`El código ${code} está repetido`);
        return;
      }
    }

    const newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
    };

    if (!Object.values(newProduct).includes(undefined)) {
      ProductManager.id++;
      this.products.push({
        ...newProduct,
        id: ProductManager.id,
      });
    } else {
      console.log("Todos los campos necesitan ser completados");
    }
  }

  getProduct() {
    return this.products;
  }

  existe(id) {
    return this.products.find((producto) => producto.id === id);
  }

  getProductById(id) {
    const foundProduct = this.existe(id);
    if (!foundProduct) {
      console.log("Not Found");
    } else {
      console.log(foundProduct);
    }
  }
}

const productos = new ProductManager();

// primera llamada = arreglo vacío
console.log(productos.getProduct());

// agregamos productos
productos.addProduct("titulo1", "descripcion1", 100, "img1", "abc123", 5);
productos.addProduct("titulo2", "descripcion2", 100, "img1", "abc124", 6);

// segunda llamada = arreglo con productos
console.log(productos.getProduct());

// Validación de código repetido
productos.addProduct("titulo2", "descripcion2", 100, "img1", "abc124", 7);

// Búsqueda por ID
productos.getProductById(2);

// Búsqueda por ID no encontrado
productos.getProductById(3);
