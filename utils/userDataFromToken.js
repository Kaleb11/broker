const dotenv = require('dotenv');
dotenv.config();
const jwt = require("jsonwebtoken");
let ACCESS_TOKEN_KEY = process.env.ACCESS_TOKEN_KEY;
const userData = async(req, res, next) => {

    // try {

    const userTokenn = req.headers.authorization;
    let decodetoken
    decodetoken = jwt.verify(userTokenn, ACCESS_TOKEN_KEY)
    usrID = decodetoken.id

    console.log("This is user id", usrID)
    return { usrID };

    // } catch (error) {
    //     //console.log("Here is the error", error)
    //     return res.status(500).json({
    //         message: error.message
    //     })

    // }
};
module.exports = {
    userData
}