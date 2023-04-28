const validateReply = require("../../../../utils/validateerror");

const signupValidate = async (req, res, next) => {
  const validationRule = {
    email: "required|email",
    password: "required|string|min:6",
    role_id: "required|string",
  };

  await validateReply.validateReply(req.body, validationRule, res, next);
};
const loginValidate = async (req, res, next) => {
  const validationRule = {
    email: "required|email",
    password: "required|string|min:6",
  };

  await validateReply.validateReply(req.body, validationRule, res, next);
};
module.exports = {
  signupValidate,
  loginValidate,
};
