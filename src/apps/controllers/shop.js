const CategoryModel = require("../models/categories");
const ProductModel = require("../models/product");
const slug = require("slug");
const fs = require("fs");
const path = require("path");
const pagination = require("../../common/pagination");

const shop_pagination = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 6;
  const skip = limit * page - limit;
  const totalRows = await ProductModel.find().countDocuments();
  const totalPages = Math.ceil(totalRows / limit);

  const products = await ProductModel.find({})
    .populate({ path: "cat_id" })
    .sort({ _id: -1 })
    .skip(skip)
    .limit(limit);

  // console.log(products);
  const next = page + 1;
  const hasNext = page < totalPages ? true : false;
  const prev = page - 1;
  const hasPrev = page > 1 ? true : false;

  res.render("site/shop", {
    products,
    page,
    totalPages,
    next,
    hasNext,
    prev,
    hasPrev,
    pages: pagination(page, totalPages),
  });
};
module.exports = { shop_pagination };
