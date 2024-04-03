const express = require("express");
const router = express.Router();
const Product =require('../models/product-model')

router.post("/product", (req, res) => {
  console.log(req.body);
  const product = new Product({
    name: req.body.name,
    image: req.body.image,
    countInStock: req.body.countInStock,
  });

  product
    .save()
    .then((resp) => {
      res.status(201).json(resp);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
        success: false,
      });
    });
});

router.get("/products", async (req, res) => {
  const productList = await Product.find();
  console.log(productList)

  if (!productList) {
    res.status(500).json({
      success: false,
    });
  }

  res.send(productList);
});

module.exports = router;
