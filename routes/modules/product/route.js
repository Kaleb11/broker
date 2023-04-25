const brandController = require("../../../controllers/product/BrandController");
const categoryController = require("../../../controllers/product/CategoryController");
const productController = require("../../../controllers/product/ProductController");
const productImageController = require("../../../controllers/product/ProductImageController.js");
const validateData = require("../../../middleware/validate/module/product/validate");
module.exports = function (express) {
  const route = express.Router();
  //brand
  route.post("/brand", validateData.brandValidate, brandController.save);
  route.get("/brand/:id", brandController.get);
  route.get("/brand", brandController.getAll);
  route.update("/brand/:id", validateData.brandValidate,brandController.update);
  route.delete("/brand/:id", brandController.delete);
  //category
  route.post("/category", validateData.categoryValidate, categoryController.save);
  route.get("/category/:id", categoryController.get);
  route.get("/category", categoryController.getAll);
  route.update("/category/:id", validateData.categoryValidate,categoryController.update);
  route.delete("/category/:id", categoryController.delete);
   //product
   route.post("/product", validateData.productValidate, productController.save);
   route.get("/product/:id", productController.get);
   route.get("/product", productController.getAll);
   route.update("/product/:id", validateData.productValidate,productController.update);
   route.delete("/product/:id", productController.delete);
    //product image
  route.post("/product/image", validateData.productImageValidate, productImageController.save);
  route.get("/product/image/:id", productImageController.get);
  route.get("/product/image", productImageController.getAll);
  route.update("/product/image/:id",validateData.productImageValidate, productImageController.update);
  route.delete("/product/image/:id", productImageController.delete);
  return route;
};
