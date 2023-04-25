const validateReply = require('../../../../utils/validateerror');

const brandValidate = async(req, res, next) => {
    const validationRule = {
        "country": "required|string",
        "city": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)


}
const categoryValidate = async(req, res, next) => {
    const validationRule = {
        "name": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)


}
const productValidate = async(req, res, next) => {
    const validationRule = {
        "name": "required|string",
        "category_id": "required|string",
        "brand_id": "required|string",
        "user_id": "required|string",
        "price": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)


}
const productImageValidate = async(req, res, next) => {
    if(!req.files){
        return res.status(412).json({
            message:"No files selected"
        })
    }
    const validationRule = {
        "item_id": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)


}
module.exports = {
    brandValidate,
    categoryValidate,
    productValidate,
    productImageValidate
};