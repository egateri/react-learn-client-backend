const express = require("express");

const router = express.Router();

// Product Model

const Product = require("../models/Product");

// @route GET /products

// @desc Get ALL products

router.get("/", async (req, res) => {
  await Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
});

// @route POST /products

// @desc  Create a product

router.post("/", async (req, res) => {
  // Create a product item

  const newProduct = new Product({
    name: req.body.name,

    description: req.body.description,

    price: req.body.price,

    quantity: req.body.quantity,
    photo: req.body.photo,
  });

  await newProduct
    .save()

    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
});

// @route PUT api/products/:id

// @desc  Update a product

router.put("/:id", (req, res) => {
  // Update a product in the database

  Product.updateOne(
    { _id: req.params.id },
    {
      $set: {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      },
    },
    { upsert: true }
  )

    .then(() => {
      res.json({ success: true });
    })
    .catch((err) => {
      res.json({ success: false });
      console.log(err);
    });
});

// @route DELETE api/products/:id

// @desc  Delete a product

router.delete("/:id", async (req, res) => {
  // Delete a product from database

  await Product.deleteOne({ _id: req.params.id })
    .then(() => {
      res.json({ success: true });
    })

    .catch((err) => {
      res.json({ success: false });
      console.log(err);
    });
});

module.exports = router;
