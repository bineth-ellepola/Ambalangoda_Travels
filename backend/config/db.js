const mongoose = require("mongoose");
const dns = require("dns");

// Local resolver (127.0.0.1) refuses SRV lookups needed by mongodb+srv:// URIs
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not set in .env");
  }

  await mongoose.connect(process.env.MONGO_URI);
  console.log("MongoDB connected");
};

module.exports = connectDB;
