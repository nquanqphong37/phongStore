const ProductModel = require("../models/product");
const CategoryModel = require("../models/categories");
const CommentModel = require("../models/comments");
const slug = require("slug");
const fs = require("fs");
const path = require("path");
const pagination = require("../../common/pagination");
const BlogModel = require("../models/blog");

const home = async (req, res) => {
  const featured = await ProductModel.find({
    featured: true,
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(8);

  const latest = await ProductModel.find({
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(8);

  const rated = await ProductModel.find({
    rated: true,
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(3);
  const blogs = await BlogModel.find().sort({ _id: 1 }).limit(3);

  res.render("site/index", { featured, latest, rated, blogs });
};

const category = async (req, res) => {
  const id = req.params.id;
  const products = await ProductModel.find({ cat_id: id });
  const category = await CategoryModel.findById(id);
  const title = category.title;
  const total = products.length;

  res.render("site/category", { products, title, total });
};

const product = async (req, res) => {
  const id = req.params.id;
  const product = await ProductModel.findById(id);
  const comments = await CommentModel.find({ prd_id: id }).sort({ _id: -1 });
  const rated = await ProductModel.find({
    rated: true,
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(4);

  res.render("site/product", { product, comments, rated });
};

const comment = async (req, res) => {
  const id = req.params.id;
  const { full_name, email, body } = req.body;
  const comment = {
    prd_id: id,
    full_name,
    email,
    body,
  };
  await new CommentModel(comment).save();
  res.redirect(req.path);
};

const shop = async (req, res) => {
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

  const latest = await ProductModel.find({
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(6);

  const rated = await ProductModel.find({
    rated: true,
    is_stock: true,
  })
    .sort({ _id: -1 })
    .limit(3);

  const total = products.length;

  res.render("site/shop", {
    latest,
    rated,
    total,
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

const blog = async (req, res) => {
  const blogs = await BlogModel.find().sort({ _id: 1 }).limit(6);
  res.render("site/blog", { blogs });
};

const blogDetail = async (req, res) => {
  const id = req.params.id;
  const blog = await BlogModel.findById(id);
  const blogDisplay = await BlogModel.find().sort({ _id: -1 }).limit(3);
  res.render("site/blogdetail", { blog, blogDisplay });
};

const search = async (req, res) => {
  const keyword = req.query.keyword || "";
  const products = await ProductModel.find({
    $text: {
      $search: keyword,
    },
  });
  // console.log(products);
  res.render("site/search", { products, keyword });
};

const addToCart = async (req, res) => {
  const items = req.session.cart;
  const { id, qty } = req.body;
  let isProductExist = false;

  items.map((item) => {
    if (item.id === id) {
      item.qty += parseInt(qty);
      isProductExist = true;
    }
    return item;
  });
  if (!isProductExist) {
    const product = await ProductModel.findById(id);
    items.push({
      id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.price,
      qty: parseInt(qty),
    });
  }
  req.session.cart = items;
  res.redirect("/cart");
};

const cart = (req, res) => {
  const cart = req.session.cart;
  res.render("site/cart", { cart });
};

const updateCart = (req, res) => {
  const products = req.body.products;
  let items = req.session.cart;
  const newItems = items.map((item) => {
    item.qty = parseInt(products[item.id]["qty"]);
    return item;
  });
  req.session.cart = newItems;
  res.redirect("/cart");
};

const deleteCart = async (req, res) => {
  const { id } = req.params;
  let items = req.session.cart;
  const newItems = items.filter((item) => item.id != id);
  req.session.cart = newItems;

  res.redirect("/cart");
};

const success = (req, res) => {
  res.render("site/success");
};

const contact = (req, res) => {
  res.render("site/contact");
};

module.exports = {
  home,
  category,
  product,
  comment,
  shop,
  blog,
  blogDetail,
  search,
  addToCart,
  cart,
  updateCart,
  deleteCart,
  success,
  contact,
};
