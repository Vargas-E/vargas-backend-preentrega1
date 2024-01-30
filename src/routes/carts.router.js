const express = require("express");
const router = express.Router();
const CartsManager = require("../controller/cartsManager");

const path = "./src/models/carts.json";
const cartsManager = new CartsManager(path);

router.post("/", async (req, res) => {
  try {
    const id = await cartsManager.createCart();
    res.json({ message: `Cart created with id ${id}` });
  } catch (err) {
    res.status(500).json({ message: "Server problems" });
  }
});

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  console.log("cid:", cid);
  try {
    const cart = await cartsManager.getCart(cid);
    console.log("cart:", cart);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: `Cart with id ${cid} not found` });
    }
  } catch (err) {
    res.status(500).json({ mesage: "Server problems" });
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    if (cid && pid) {
      const status = await cartsManager.addProductToCart(pid, cid);
      res.status(200).json({messsage: status})
    }
  } catch (err) {
    res.status(500).json({ mesage: "Server problems" });
  }
});

module.exports = router;
