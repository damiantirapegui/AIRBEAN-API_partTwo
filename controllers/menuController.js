import db from "../db/database.js";
import Joi from "joi";
import menu from "../services/menu.js";

const productSchema = Joi.object({
  id: Joi.number().required(),
  title: Joi.string().required(),
  desc: Joi.string().required(),
  price: Joi.number().required(),
});

const addProduct = async (req, res) => {
  try {
    const { id, title, desc, price } = req.body;
    const newProduct = {
      _id: id,
      title,
      desc,
      price,
    };
    menu.push(newProduct);

    await db["company"].update({ type: "menu" }, { $set: { data: menu } }, {});
    return res.status(201).json({ message: "Product added successfully" });
  } catch (err) {
    return res.status(500).send({ error: "Could not add product" });
  }
};

export { addProduct };
