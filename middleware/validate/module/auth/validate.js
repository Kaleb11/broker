const validateReply = require('../../../../utils/validateerror');

const loginValidate = async(req, res, next) => {
    const validationRule = {
        "email": "required|email",
        "password": "required|string|min:6"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)


}
module.exports = {
    loginValidate
};