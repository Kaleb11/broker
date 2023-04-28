const { user, role, photo, Sequelize } = require("../../models");
const dotenv = require("dotenv");
dotenv.config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Socket } = require("../../utils/WebSocket.js");
let self = {};
let TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
let REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY;
let PROFILE_PHOTO_TYPE = process.env.USER_PHOTO;
let COMPANY_PHOTO_TYPE = process.env.USER_COMPANY_PHOTO;
let TOKEN_MAX_AGE = process.env.TOKEN_MAX_AGE;

self.signupUser = async (request, response) => {
  const body = request.body;
  const salt = await bcrypt.genSalt(10);
  const { full_name, phone, gender, email, password, role_id } = request.body;
  request.body.password = await bcrypt.hash(body.password, salt);
  try {
    const userData = await user.create(request.body);
    const rle = await role.findOne({
      where: {
        id: role_id,
      },
    });
    if (userData) {
      let replyUser = {
        id: userData.id,
        full_name: full_name,
        phone: phone,
        gender: gender,
        email: email,
        role: rle.name,
      };
      usrr = { id: userData.id };
      accessToken = jwt.sign(usrr, TOKEN_KEY, {
        expiresIn: "1000h",
      });
      refreshToken = jwt.sign(usrr, REFRESH_TOKEN_KEY, {
        expiresIn: "1000h",
      });
      return response.status(200).json({
        userData: replyUser,
        accessToken: accessToken,
        refreshToken: refreshToken,
      });
    }
  } catch (error) {
    console.log("The error is", error);

    return response.status(401).json({
      message: error.message,
    });
  }
};

module.exports = self;
