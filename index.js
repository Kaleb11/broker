const express = require("express");

const productRoute = require("./routes/modules/product/route");
const userRoute = require("./routes/modules/user/route");
const authRoute = require("./routes/modules/auth/route");

const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

let app = express();
app.use(fileUpload());
app.use(cookieParser());
app.use(express.static("public"));
//app.use('/images', express.static('images'));
var corsOptions = {
  origin: "*",
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.set("view engine", "ejs");

//app.use("/api", userRoute(express), polymorphicRoute(express), authRoute(express), stakeCategory(express), productRoute(express));
app.use("/api/users", userRoute(express));
app.use("/api/accounts", authRoute(express));
app.use("/api/products", productRoute(express));

//app.use("/", route_view(express));

app.listen(8080, () => {
  console.log("Success running on  8080");
});

module.exports = app;
