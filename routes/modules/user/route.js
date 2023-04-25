const addressController = require("../../../controllers/user/AddressController");
const messageController = require("../../../controllers/user/MessageController");
const notificationController = require("../../../controllers/user/NotificationController");
const permissionController = require("../../../controllers/user/PermissionController.js");
const photoController = require("../../../controllers/user/PhotoController.js");
const planController = require("../../../controllers/user/PlanController.js");
const roleController = require("../../../controllers/user/RoleController.js");
const rolePermissionController = require("../../../controllers/user/RolePermissionController.js");
const userController = require("../../../controllers/user/UserController.js");
const validateData = require("../../../middleware/validate/module/user/validate");
module.exports = function (express) {
  const route = express.Router();
  //address
  route.post("/address", validateData.address, addressController.save);
  route.get("/address/:id", addressController.get);
  route.get("/address", addressController.getAll);
  route.update("/address/:id", validateData.address, addressController.update);
  route.delete("/address/:id", addressController.delete);
  //message
  route.post("/message", validateData.message, messageController.save);
  route.get("/message/:id", messageController.get);
  route.get("/message", messageController.getAll);
  route.update("/message/:id", validateData.message, messageController.update);
  route.delete("/message/:id", messageController.delete);
  //notification
  route.post(
    "/notification",
    validateData.notification,
    notificationController.save
  );
  route.get("/notification/:id", notificationController.get);
  route.get("/notification", notificationController.getAll);
  route.update(
    "/notification/:id",
    validateData.notification,
    notificationController.update
  );
  route.delete("/notification/:id", notificationController.delete);
  route.delete("/notification/:id", notificationController.delete);
  //role
  route.post("/role", validateData.role, roleController.save);
  route.get("/role/:id", roleController.get);
  route.get("/role", roleController.getAll);
  route.update("/role/:id", validateData.role, roleController.update);
  route.delete("/role/:id", roleController.delete);
  //permission
  route.post("/permission", validateData.permission, permissionController.save);
  route.get("/permission/:id", permissionController.get);
  route.get("/permission", permissionController.getAll);
  route.update(
    "/permission/:id",
    validateData.permission,
    permissionController.update
  );
  route.delete("/permission/:id", permissionController.delete);
  //role permission
  route.post(
    "/role-permission",
    validateData.rolepermission,
    rolePermissionController.save
  );
  route.get("/role-permission/:id", rolePermissionController.get);
  route.get("/role-permission", rolePermissionController.getAll);
  route.update(
    "/role-permission/:id",
    validateData.rolepermission,
    rolePermissionController.update
  );
  route.delete("/role-permission/:id", rolePermissionController.delete);
  //photo
  route.post("/photo", validateData.photo, photoController.save);
  route.get("/photo/:id", photoController.get);
  route.get("/photo", photoController.getAll);
  route.update("/photo/:id", validateData.photo, photoController.update);
  route.delete("/photo/:id", photoController.delete);
  //plan
  route.post("/plan", validateData.plan, planController.save);
  route.get("/plan/:id", planController.get);
  route.get("/plan", planController.getAll);
  route.update("/plan/:id", validateData.plan, planController.update);
  route.delete("/plan/:id", planController.delete);
  //user
  route.post("/user", validateData.user, userController.save);
  route.get("/user/:id", userController.get);
  route.get("/user", userController.getAll);
  route.update("/user/:id", validateData.user, userController.update);
  route.delete("/user/:id", userController.delete);
  return route;
};
