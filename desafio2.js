import fs from "fs/promises";

class ProductManager {
  constructor() {
    this.patch = "./products.txt";
    this.productss = [];
  }

  static id = 0;

  addProduct = async (title, description, price, image, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      image,
      code,
      stock,
      id: ProductManager.id,
    };

    this.productss.push(newProduct);

    await fs.writeFile(this.patch, JSON.stringify(this.productss));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let respuesta2 = await this.readProducts();
    return console.log(respuesta2);
  };

  getProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    if (!respuesta3.find((products) => products.id === id)) {
      console.log("Producto No Encontrado");
    } else {
      console.log(respuesta3.find((products) => products.id === id));
    }
  };

  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productsfilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productsfilter));
    console.log("producto eliminado");
  };

  updateProducts = async ({ id, ...products }) => {
    await this.deleteProductsById(id);
    let productsOld = await this.readProducts();
    let modifiedProducts = [{ ...products, id }, ...productsOld];
    await fs.writeFile(this.patch, JSON.stringify(modifiedProducts));
  };
}

const products = new ProductManager();

// products.addProduct("titulo1", "description1", 100, "image1", "abc123", 10);
// products.addProduct("titulo2", "description2", 125, "image2", "abc124", 15);
// products.addProduct("titulo3", "description3", 150, "image3", "abc125", 20);

// products.getProducts();

// products.getProductsById(3);

// products.deleteProductsById(2);

products.updateProducts({
  title: "titulo4",
  description: "description4",
  price: 2000,
  image: "image4",
  code: "abc126",
  stock: 4,
  id: 1,
});
