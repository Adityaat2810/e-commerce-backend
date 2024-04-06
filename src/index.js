const express = require("express");
const app = express();

const morgan = require("morgan");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const cors =require('cors')




const mongoose = require("mongoose");
const productRouter = require('./routes/product')
const categoryRoutes = require('./routes/category')
const userRouters = require('./routes/user');
// const authJwt = require("./utils/jwt");
const checkUser = require("./utils/jwt");
const errorHandler = require("./utils/error-handler");
const  OrderRoutes  = require("./routes/order");

app.use(cors())
app.options('*',cors());

dotenv.config();

app.use(bodyParser.json());
app.use(morgan("tiny"));

//app.use(errorHandler)
app.use('/api',productRouter);
app.use('/api/category',checkUser,categoryRoutes)
app.use('/api/user',userRouters) 
app.use('/api/order',OrderRoutes) 


const PORT = process.env.PORT;



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
