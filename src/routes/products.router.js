const express = require("express");
const router = express.Router();
const ProductManager = require("../controller/productsManager");

const path = "./src/models/products.json";
const productManager = new ProductManager(path);

router.get("/", async (req, res) => {
  const limit = req.query.limit;
  const products = await productManager.getProducts();
  try {
    if (limit) {
      res.json(products.slice(0, parseInt(limit)));
    } else {
      res.json(products);
    }
  } catch (err) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

router.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const product = await productManager.getProductById(pid);
  try {
    if (product) {
      res.json(product);
    } else {
      res.json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  if (pid) {
    try {
      await productManager.deleteProductById(pid);
      res.status(200).json({ message: `Product with id ${pid} deleted` });
    } catch (err) {
      res.status(500).json({ error: "Error de servidor" });
    }
  }
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  try {
    const message = await productManager.addProduct(newProduct);
    res.status(201).json({ message });
  } catch (err) {
    res.status(500).json({ error: "Error de servidor" });
  }
});

router.put("/:pid", async (req, res) => {
  const { pid } = req.params;
  const newProductValues = req.body;
  console.log("pid:", pid)
  console.log("newProductValuies:", newProductValues)
  if (pid != undefined && newProductValues ) {
    try {
        console.log("entre aca")
        await productManager.updateProductById(pid, newProductValues);
        res.status(201).json({ message: `Product with id ${pid} updated` });
      } catch (err) {
        res.status(500).json({ error: "Error de servidor" });
      }
  } else {
    res.json({message: "Parameter to update product are incorrect"})
  }

});

module.exports = router;
