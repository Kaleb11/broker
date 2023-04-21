const express = require("express");
const polymorphicRoute = require("./routes/module/polymorphic/route");

const project = require("./routes/module/project/route");
const constructionresource = require("./routes/module/construction resource/route");

const projectRoute = require("./routes/module/project/route");
const userRoute = require("./routes/module/user/route");
const departmentRoute = require("./routes/module/user/route");
const loginRoute = require("./routes/module/auth/route");
const stakeholderRoute = require("./routes/module/stakeholder/route");

const resourceRoute = require("./routes/module/construction resource/route");
const documentRoute = require("./routes/module/document/route");
const analyticRoute = require("./routes/module/analytic/route");

const route_view = require("./routes/route_view");
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

app.use(
  "/api",
  userRoute(express),
  polymorphicRoute(express),
  loginRoute(express),
  stakeholderRoute(express),
  project(express),
  constructionresource(express)
);

//app.use("/api", userRoute(express), polymorphicRoute(express), loginRoute(express), stakeCategory(express), ProjectRoute(express));
app.use("/api/departments", departmentRoute(express));
app.use("/api/accounts", loginRoute(express));
app.use("/api/projects", projectRoute(express));
app.use("/api/stakeholders", stakeholderRoute(express));
app.use("/api/resources", resourceRoute(express));
app.use("/api/documents", documentRoute(express));
app.use("/api/generics", polymorphicRoute(express));
app.use("/api/analytics", analyticRoute(express));

app.use("/", route_view(express));

app.listen(7500, () => {
  console.log("Success running on  7500");
});

module.exports = app;
