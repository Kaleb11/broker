const signupController = require("../../../controllers/auth/SignUpController");
const loginController = require("../../../controllers/auth/LoginController");
const resetPasswordController = require("../../../controllers/auth/ResetPasswordController");
//const refreshController = require("../../../controllers/auth");
//const logoutController = require("../../../controllers/auth/LogoutController");
//const UserController = require("../../../controllers/department/userController.js");
const validateData = require("../../../middleware/validate/module/auth/validate");
module.exports = function (express) {
  const route = express.Router();
  route.post(
    "/signup",
    validateData.signupValidate,
    signupController.signupUser
  );
  route.post("/login", validateData.loginValidate, loginController.loginUser);
  // route.get("/refresh/token", refreshController.refreshToken);

  route.post(
    "/request-password-reset",
    resetPasswordController.requestResetPassword
  );
  route.post("/password-reset", resetPasswordController.resetPassword);
  return route;
};
