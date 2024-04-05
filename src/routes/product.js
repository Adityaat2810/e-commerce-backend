const express = require("express");
const router = express.Router();
const Product = require("../models/product-model");
const { Category } = require("../models/category-schema");
const mongoose = require("mongoose");

router.post("/product", async (req, res) => {
    // validating the category
    const category = await Category.findById(req.body.category);
    if (!category) {
        console.log("invalid category");
        return res.status(400).json({
            message: "invalid category",
        });
    }
    //crating product object
    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
    });
    //saving the product
    product = await product.save();
    if (!product) {
        return res.status(500).send("The product cannnot be created");
    }
    res.send(product);
});

router.get("/product", async (req, res) => {
    const productList = await Product.find().populate("category");

    //if wnat only specific field not the complete object
    //const productList = await Product.find().select(["name","image", "-_id"]); // -_id do not include id

    console.log(productList);

    if (!productList) {
        res.status(500).json({
            success: false,
        });
    }

    res.send(productList);
});

router.get("/product/:id", async (req, res) => {
    console.log(req.params.id);
    // before doing anything first validate id
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid product id");
    }

    // .poulate() put all the detail of other table
    //to which it is connected

    const productList = await Product.findById(req.params.id).populate(
        "category",
    );
    console.log(productList);

    if (!productList) {
        res.status(500).json({
            success: false,
        });
    }

    res.send(productList);
});

router.put("/product/:id", async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send("Invalid product id");
    }
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            richDescription: req.body.richDescription,
            image: req.body.image,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            countInStock: req.body.countInStock,
            rating: req.body.rating,
            numReviews: req.body.numReviews,
            isFeatured: req.body.isFeatured,
        },
        { new: true },
    );

    if (!product) {
        res.status(400).send("product not updated");
    }

    res.send(product);
});

router.delete("/product/:id", async (req, res) => {
    Product.findByIdAndDelete(req.params.id)
        .then((product) => {
            if (product) {
                return res.status(200).json({
                    success: true,
                    message: "successfully deleted the product",
                });
            } else {
                return res.status(404).json({
                    success: false,
                    message: "failed to delete product",
                });
            }
        })
        .catch((err) => {
            return res.status(500).json({
                success: false,
                error: err,
            });
        });
});

module.exports = router;
