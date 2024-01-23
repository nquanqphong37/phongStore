const UserModel = require("../models/users");
const ProductModel = require("../models/product");

const index = async (req, res) => {
  const users = await UserModel.find();
  const products = await ProductModel.find();

  res.render("admin/admin", {
    users: users.length,
    products: products.length,
  });
};
module.exports = {
  index,
};
