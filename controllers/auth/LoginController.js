const {
    user,
    Sequelize
} = require("../../models");
const dotenv = require('dotenv');
dotenv.config();

const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

const { Socket } = require("../../utils/WebSocket.js")
let self = {};
let TOKEN_KEY = process.env.ACCESS_TOKEN_KEY
let REFRESH_TOKEN_KEY = process.env.REFRESH_TOKEN_KEY
let TOKEN_MAX_AGE = process.env.TOKEN_MAX_AGE

self.loginUser = async(request, response) => {

    const { email, password } = request.body;

    try {
        const userData = await user.findOne({
            where: {
                email: email,
                is_primary: true
            }
        });

        if (!userData) {
            return response.status(404).json({
                message: "User not found!"
            });
        }

        let replyUser = {
            id: userData.id,
            full_name: userData.full_name,
            phone: usPhone.phone,
            gender: userData.gender,
            email: userData.email
        }


        bcrypt.compare(password, userData.password, function(err, result) {  
            if (result) { 
                usrr = { id: userData.id }
                accessToken = jwt.sign(usrr,
                    TOKEN_KEY, {
                        expiresIn: "100h",
                    }
                );
                refreshToken = jwt.sign(usrr, REFRESH_TOKEN_KEY, { expiresIn: "100h" })
                    // save user token  
                    //let replyUser = {first_name:usr.first_name,last_name:usr_last_name,}
                return response.status(200).json({
                    userData: replyUser,
                    accessToken: accessToken,
                    refreshToken: refreshToken
                })

            } else {
                return response.status(401).json({
                    message: "The password is incorrect"
                })
            }
        })
    } catch (error) {
        console.log("The error is", error)

        return response.status(401).json({
            message: error.message
        })
    }

}


module.exports = self;