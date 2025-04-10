require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}/${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB Connection Failed!", error);
    process.exit(1);
  }
};
// Event Listeners for better error handling
mongoose.connection.on("error", (err) => {
  console.error("⚠️ MongoDB Connection Error:", err.message);
});
// Handle database disconnection on app termination
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB disconnected!");
  connectDB();
});

module.exports = connectDB;
