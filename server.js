
require('dotenv').config();
const express =require('express');
const db = require('./config');
const productRoutes = require("./routes/productRoute"); //new code
const cors = require("cors");

// Initializing express
const app = express();
//DB config
app.set(db);

//CORS
app.use(cors());

// Body parser middleware
// app.use(express.json());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));

// Use Routes
app.use("/products", productRoutes); 

// Define the PORT
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
