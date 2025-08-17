const app = require("./app");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("MongoDB connected");
  app.listen(PORT, () => {
    console.log(`InventoryHub running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error("MongoDB connection error:", err);
});
    
