const Item = require("../models/Item");

exports.addItem = async (req, res) => {
  const { name, quantity, price } = req.body;
  const item = new Item({ name, quantity, price });
  await item.save();
  res.json({ message: "Item added", item });
};

exports.getItems = async (req, res) => {
  const items = await Item.find().sort({ updatedAt: -1 });
  res.json(items);
};

exports.updateItem = async (req, res) => {
  const { id } = req.params;
  const { quantity, price } = req.body;
  const item = await Item.findByIdAndUpdate(id, { quantity, price, updatedAt: Date.now() }, { new: true });
  res.json({ message: "Item updated", item });
};
                         
