const express = require("express");
const { check, body } = require("express-validator");

const authController = require("../controllers/auth");
const User = require("../models/user");

const router = express.Router();

router.get("/login", authController.getLogin);

router.get("/signup", authController.getSignup);

router.post(
  "/login",
  [
    check("email").isEmail().withMessage("Please enter a valid email!"),
    check(
      "password",
      "Please enter a password with atleast 6 characters with only characters and numbers"
    )
      .isLength({ min: 6 })
      .isAlphanumeric(),
  ],
  authController.postLogin
);

router.post(
  "/signup",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a valid email!")
      .custom((value, { req }) => {
        // Custom validation
        // if (value === "test@test.com") {
        //   throw new Error("This email address is forbidden!");
        // }
        // return true;
        return User.findOne({ email: value }).then((userDoc) => {
          // Async validation
          if (userDoc) {
            return Promise.reject("E-mail Exists! Choose another one."); // Reject the promise with this error
          }
        });
      }),

    body(
      "password",
      "Please enter a password with only numbers and text with atleast 5 characters"
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),

    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords have to match!");
      }
      return true;
    }),
  ],
  authController.postSignup
);

router.post("/logout", authController.postLogout);

router.get("/reset", authController.getReset);

router.post("/reset", authController.postReset);

router.get("/reset/:token", authController.getNewPassword);

router.post("/new-password", authController.postNewPassword);

module.exports = router;
