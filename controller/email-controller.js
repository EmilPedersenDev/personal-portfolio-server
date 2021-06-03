const sendEmail = require("../service/mail-service.js");
const validator = require("../middleware/validations/validator.js");
const { personalInformation } = require("../middleware/validations/rules.js");

module.exports = async (app) => {
  app.post("/mail", personalInformation(), validator, (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      res.status(403).json({
        message: "Did not provide required contact feilds.",
      });
    }

    sendEmail(res, req.body);

    res.sendStatus(200);
  });
};
