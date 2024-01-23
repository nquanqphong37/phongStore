const CategoryModel = require("../models/categories");

const index = async (req, res) => {
    const categories = await CategoryModel.find({});
    res.render("admin/category",{categories});
  };

module.exports={
    index
};