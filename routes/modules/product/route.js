const brandController = require("../../../controllers/product/BrandController");
const categoryController = require("../../../controllers/product/CategoryController");
const productController = require("../../../controllers/product/ProductController");
const productImageController = require("../../../controllers/product/ProductImageController.js");
const validateData = require("../../../middleware/validate/module/auth/validate");
module.exports = function (express) {
  const route = express.Router();

  route.post("/brand", validateData.loginValidate, brandController.save);
  route.get("/brand/:id", brandController.get);
  route.get("/brand", brandController.getAll);
  route.update("/brand/:id", brandController.update);
  route.delete("/brand/:id", brandController.delete);
  return route;
};
