const express = require("express");
const app = express();
const PORT = 8080;
const ProductManager = require('./product-manager.js');
const data = new ProductManager('products.json');

const serverConnectd = app.listen(PORT, () =>
  console.log(`Servidor escuchando en el puerto: ${PORT}`)
);

serverConnectd.on("error", (error) => console.log(`No fue posible conectar con el servidor: ${error}`));
 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const products = await data.getProducts();
    const slicedProducts = limit ? products.slice(0, limit) : products;
    res.status(200).send(slicedProducts);
  } catch (error) {
    console.log(error);
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const filterbyId = parseInt(req.params.pid);
    const dataFiltered = await data.getProductById(filterbyId);

    res.status(200).send(dataFiltered);
  } catch (error) {
    console.log(error);
  }
});