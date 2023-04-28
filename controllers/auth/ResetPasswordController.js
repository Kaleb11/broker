const { user, resetpassword, photo, Sequelize } = require("../../models");
const dotenv = require("dotenv");
dotenv.config();
//emailer
const uuid = require("uuid");
var nodemailer = require("nodemailer");
var smtpTransport = require("nodemailer-smtp-transport");
const bcrypt = require("bcrypt");
let self = {};
self.requestResetPassword = async (request, response) => {
  const body = request.body;
  const { email } = request.body;
  const usr = await user.findOne({
    where: {
      email: email,
    },
  });
  if (!usr) {
    return response.status(401).json({
      message: "User not found",
    });
  }
  const resetString = uuid.v4() + usr.id;
  await resetpassword.create({
    user_id: usr.id,
    token: resetString,
    expiresAt: Date.now() + 3600000,
    is_used: false,
  });
  //send
  //const redirectUrl = body.redirectUrl;
  const redirectUrl = "Web";
  const salt = await bcrypt.genSalt();
  const hashedResetString = await bcrypt.hash(resetString, salt);
  var mailOptions = {
    from: "kalebtilahun29@gmail.com",
    // from: process.env.AUTH_EMAIL,
    to: body.email,
    subject: "Setup Password",
    html: `
					<p>We have received your request to change your password.
, click on the link below to fillout your new password</p>
					<p><a href= ${redirectUrl}/${usr.id}/${hashedResetString.replace(
      /\//g,
      "slash"
    )}>${redirectUrl}/${usr.id}/${hashedResetString.replace(
      /\//g,
      "slash"
    )}</a></p>
					`,
  };

  var transporter = nodemailer.createTransport(
    smtpTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      secure: false,
      auth: {
        user: "kalebtilahun29@gmail.com",
        pass: "pkee hstk ukmn abmo",
      },
    })
  );

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      return response.status(412).json("error" + error);
    } else {
      return response.json({
        message: "Email sent successfully",
      });
    }
  });
};
self.resetPassword = async (req, res) => {
  try {
    let { user_id, resetString, password } = req.body;

    let existing = await resetpassword.findOne({
      order: [["createdAt", "DESC"]],
      where: {
        user_id: user_id,
      },
    });

    if (existing) {
      const expiredAt = existing.expiresAt;
      if (expiredAt < Date.now()) {
        return res.status(410).json({
          message: "Password reset link has expired.",
        });
      }
      if (existing.is_used === true) {
        return res.status(410).json({
          message: "Invalid reset code",
        });
      }
      const hashedResetString = existing.token;
      //FYI resetString is the hashed one from the sent letter
      let hashed = resetString.replace(/slash/g, "/");
      const valid = await bcrypt.compare(hashedResetString, hashed);
      if (valid) {
        const salt = await bcrypt.genSalt();
        const pass = await bcrypt.hash(password, salt);
        await user.update(
          { password: pass },
          {
            where: {
              id: user_id,
            },
          }
        );
        await resetpassword.update(
          { is_used: true },
          {
            where: {
              user_id: existing.user_id,
              is_used: false,
            },
          }
        );

        return res.status(200).json({
          message: "Password changed successfully",
        });
      } else {
        return res.json({
          message: "Invalid reset string",
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = self;
