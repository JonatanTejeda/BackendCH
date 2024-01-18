import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();

app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();

app.get("/products", async (req, res) => {
  try {
    let limit = parseInt(req.query.limit);
    const allProducts = await productos.readProducts();
    
    if (!limit) {
      return res.send(allProducts);
    }

    let productsLimit = allProducts.slice(0, limit);
    res.send(productsLimit);
  } catch (error) {
    return res.send("Problema interno del servidor");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    let id = parseInt(req.params.pid);
    const allProducts = await productos.readProducts();
    
    let productById = allProducts.find(product => product.id === id );
    res.send(productById);
  } catch (error) {
    return res.send("Problema interno del servidor");
  }
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Express local host ${server.address().port}`);
});

server.on("error", (error) => {
  console.log(`Error del servidor ${error}`);
});
