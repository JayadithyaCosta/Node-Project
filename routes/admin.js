const path = require("path");
const { check, body } = require("express-validator");

const express = require("express");

const adminController = require("../controllers/admin");
const isAuth = require("../middleware/is-auth");

const router = express.Router();

// /admin/add-product => GET
router.get("/add-product", isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get("/products", isAuth, adminController.getProducts);

// // /admin/add-product => POST
router.post(
  "/add-product",
  [
    body("title", "Title has to be atleast 3 letter and no special characters")
      .isString()
      .isLength({ min: 3 })
      .notEmpty()
      .trim(),
    body("price", "Add Price!").isFloat().notEmpty().trim(),
    body("description", "Enter description with atleast 5 letters!")
      .isAlpha()
      .isLength({ min: 5, max: 400 })
      .trim()
      .notEmpty(),
  ],
  isAuth,
  adminController.postAddProduct
);

router.get("/edit-product/:productId", isAuth, adminController.getEditProduct);

router.post(
  "/edit-product",
  [
    body("title", "Title has to be atleast 3 letter and no special characters")
      .isString()
      .isLength({ min: 3 })
      .notEmpty()
      .trim(),
    body("price", "Enter price!").isFloat().notEmpty().trim(),
    body("description", "Enter Description with atlease 5 letters!")
      .isAlpha()
      .isLength({ min: 5, max: 400 })
      .trim()
      .notEmpty(),
  ],
  isAuth,
  adminController.postEditProduct
);

router.post("/delete-product", isAuth, adminController.postDeleteProduct);

module.exports = router;
