const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Product =require('./models/product-model')

dotenv.config();


app.use(bodyParser.json());
app.use(morgan("tiny"));

const PORT = process.env.PORT;

app.post('/product',(req,res)=>{
    console.log(req.body)
    const product = new Product({
        name:req.body.name,
        image:req.body.image,
        countInStock:req.body.countInStock
    })

    console.log(product)

    product.save().then((resp)=>{
        res.status(201).json(resp)
    }).catch((err)=>{
        console.log(err)
        res.status(500).json({
            error:err,
            success:false
        })
    })
})

app.get('/products',async (req,res)=>{
  const productList =await Product.find();
  
  if(!productList){
    res.status(500).json({
      success:false
    })

  }

  res.send(productList)
})

app.get("/", (req, res) => {
  res.send("hello api");
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log(`db connection is ready`);
  })
  .catch((err) => {
    console.log(err);
  });
app.listen(PORT, () => {
  console.log(`server is started on PORT `, PORT);
});
