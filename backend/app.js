const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(express.json());

const discriptionRoutes = require("./routes/discriptionRoutes");

app.use("/api/discription", discriptionRoutes);