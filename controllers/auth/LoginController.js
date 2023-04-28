const { user, photo, Sequelize } = require("../../models");
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

self.loginUser = async (request, response) => {
  const { email, password } = request.body;

  try {
    const userData = await user.findOne({
      where: {
        email: email,
      },
    });

    if (!userData) {
      return response.status(404).json({
        message: "User not found!",
      });
    }
    const [usrProfilePhoto, usrCompanyPhoto] = await Promise.all([
      photo.findOne({
        where: {
          user_id: userData.id,
          type: PROFILE_PHOTO_TYPE,
        },
      }),
      photo.findOne({
        where: {
          user_id: userData.id,
          type: COMPANY_PHOTO_TYPE,
        },
      }),
    ]);
    // return response.send({ usrProfilePhoto });
    let replyUser = {
      id: userData.id,
      full_name: userData.full_name,
      phone: userData.phone,
      gender: userData.gender,
      email: userData.email,
      user_photo: usrProfilePhoto ? usrProfilePhoto.url : "",
      company_photo: usrCompanyPhoto ? usrCompanyPhoto.url : "",
    };

    bcrypt.compare(password, userData.password, function (err, result) {
      if (result) {
        usrr = { id: userData.id };
        accessToken = jwt.sign(usrr, TOKEN_KEY, {
          expiresIn: "1000h",
        });
        refreshToken = jwt.sign(usrr, REFRESH_TOKEN_KEY, {
          expiresIn: "1000h",
        });
        // save user token
        //let replyUser = {first_name:usr.first_name,last_name:usr_last_name,}
        return response.status(200).json({
          userData: replyUser,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        return response.status(401).json({
          message: "The password is incorrect",
        });
      }
    });
  } catch (error) {
    console.log("The error is", error);

    return response.status(401).json({
      message: error.message,
    });
  }
};

module.exports = self;
