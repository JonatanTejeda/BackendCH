import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.patch = "./producto.txt";
    this.products = [];
  }

  static id = 0;

  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      imagen,
      code,
      stock,
      id: ProductManager.id,
    };

    this.products.push(newProduct);
    await fs.writeFile(this.patch, JSON.stringify(this.products));
  };

  readProducts = async () => {
    let respuesta = await fs.readFile(this.patch, "utf-8");
    return JSON.parse(respuesta);
  };

  getProducts = async () => {
    let allProducts = await this.readProducts();
  };

  getProductsById = async (id) => {};

  deleteProductsById = async (id) => {
    let respuesta3 = await this.readProducts();
    let productFilter = respuesta3.filter((products) => products.id != id);
    await fs.writeFile(this.patch, JSON.stringify(productFilter));
    console.log("Producto Eliminado");
  };

  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductsById(id);
    let productOld = await this.readProducts();
    let productModif = [{ ...producto, id }, ...productOld];
    await fs.writeFile(this.patch, JSON.stringify(productModif));
  };
}

// const productos = new ProductManager();

// productos.addProduct("Titulo1", "Descripcion1", 1000, "imagen1", "aaa111", 2);
// productos.addProduct("Titulo2", "Descripcion2", 2000, "imagen2", "bbb222", 4);
// productos.addProduct("Titulo3", "Descripcion3", 3000, "imagen3", "ccc333", 6);
// productos.addProduct("Titulo4", "Descripcion4", 4000, "imagen4", "ddd444", 8);
// productos.addProduct("Titulo5", "Descripcion5", 5000, "imagen5", "eee555", 10);
// productos.addProduct("Titulo6", "Descripcion6", 6000, "imagen6", "fff666", 12);
// productos.addProduct("Titulo7", "Descripcion7", 7000, "imagen7", "ggg777", 14);
// productos.addProduct("Titulo8", "Descripcion8", 8000, "imagen8", "hhh888", 16);
// productos.addProduct("Titulo9", "Descripcion9", 9000, "imagen9", "iii999", 18);
// productos.addProduct(
//   "Titulo10",
//   "Descripcion10",
//   10000,
//   "imagen10",
//   "jjj123",
//   20
// );

// productos.getProducts();

// productos.getProductsById(3);

// productos.deleteProductosById(2);

// productos.updateProducts({
//     title: "titulo11",
//     description "description11",
//     price: 11000,
//     imagen: "imagen11",
//     code:"kkk456",
//     stock: 22,
//     id: 11,
// });
