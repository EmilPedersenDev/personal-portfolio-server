const { body } = require("express-validator");

const personalInformation = () => {
  return [
    body("name")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Name cannot be empty.")
      .bail()
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("Name must be alphabetic.")
      .bail(),
    body("message")
      .not()
      .isEmpty()
      .trim()
      .withMessage("Message cannot be empty.")
      .bail()
      .isLength({ min: 10 })
      .withMessage("Message must be at least 10 characters.")
      .bail()
      .isLength({ max: 1000 })
      .withMessage("Message cannot be longer than 1000 characters.")
      .bail(),
    body("email").isEmail().bail(),
  ];
};

module.exports = {
  personalInformation,
};
