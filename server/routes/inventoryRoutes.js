const express = require("express");
const router = express.Router();
const { addItem, getItems, updateItem } = require("../controllers/inventoryController");
const { authenticate, authorize } = require("../middleware/authMiddleware");

router.get("/", authenticate, getItems);
router.post("/", authenticate, authorize("admin"), addItem);
router.put("/:id", authenticate, authorize("admin"), updateItem);

module.exports = router;
            
