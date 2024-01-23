const express = require("express");
const { route } = require("../apps/app");

const router = express.Router();
// Admin Controller
const AuthController = require("../apps/controllers/auth");
const AdminController = require("../apps/controllers/admin");
const ProductController = require("../apps/controllers/product");

// Site Controller
const SiteController = require("../apps/controllers/site");

//  Middleware
const AuthMiddleware = require("../apps/middlewares/auth");
const UploadMiddleware = require("../apps/middlewares/upload");

// Test
const TestController = require("../apps/controllers/test");
router.get("/test", TestController.test);
router.get("/testform", TestController.testForm);
router.post("/testform", TestController.actionForm);

// Router Admin

router.get("/admin/login", AuthMiddleware.checkLogin, AuthController.getLogin);
router.post(
  "/admin/login",
  AuthMiddleware.checkLogin,
  AuthController.postLogin
);
router.get("/admin/logout", AuthMiddleware.checkAdmin, AuthController.logout);

router.get(
  "/admin/dashboard",
  AuthMiddleware.checkAdmin,
  AdminController.index
);
router.get(
  "/admin/products",
  AuthMiddleware.checkAdmin,
  ProductController.index
);
router.get(
  "/admin/products/create",
  AuthMiddleware.checkAdmin,
  ProductController.create
);
router.post(
  "/admin/products/store",
  UploadMiddleware.single("thumbnail"),
  AuthMiddleware.checkAdmin,
  ProductController.store
);
router.get(
  "/admin/products/edit/:id",
  AuthMiddleware.checkAdmin,
  ProductController.edit
);
router.post(
  "/admin/products/update/:id",
  UploadMiddleware.single("thumbnail"),
  AuthMiddleware.checkAdmin,
  ProductController.update
);
router.get(
  "/admin/products/delete/:id",
  AuthMiddleware.checkAdmin,
  ProductController.del
);

// Router Category
const CategoryController = require("../apps/controllers/category");

router.get("admin/category", CategoryController.index);

// Router Site
router.get("/", SiteController.home);
router.get("/category-:slug.:id", SiteController.category);
router.get("/product-:slug.:id", SiteController.product);
router.post("/product-:slug.:id", SiteController.comment);

router.get("/blog", SiteController.blog);
router.get("/blog-:slug.:id", SiteController.blogDetail);
router.get("/shop", SiteController.shop);
router.get("/search", SiteController.search);

router.get("/cart", SiteController.cart);
router.post("/add-to-cart", SiteController.addToCart);
router.post("/update-cart", SiteController.updateCart);
router.get("/delete-cart-:id", SiteController.deleteCart);

router.get("/success", SiteController.success);
router.get("/contact", SiteController.contact);

module.exports = router;
