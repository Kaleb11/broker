const authController = require("../../../controllers/auth/LoginController");
const refreshController = require("../../../controllers/auth/");
const logoutController = require("../../../controllers/Auth/LogoutController");
const UserController = require("../../../controllers/department/userController.js");
const validateData = require("../../../middleware/validate/module/auth/validate");
module.exports = function (express) {
  const route = express.Router();

  route.post("/login", validateData.loginValidate, authController.loginUser);
  route.get("/refresh/token", refreshController.refreshToken);
  route.post("/logout", logoutController.logout);

  route.post("/request-password-reset", UserController.requestPasswordReset);
  route.post("/password-reset", UserController.resetPassword);
  return route;
};
