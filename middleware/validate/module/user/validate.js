const validator = require('../../../../utils/validator');
const validateReply = require('../../../../utils/validateerror');

const user = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "full_name": "required|string",
        "email": "required|email",
        "phone": "required|string",
        "password": "string|min:6",
        "address_id": "string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const address = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "country": "required|string",
        "city": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const role = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "name": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const permission = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "name": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const rolepermission = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "role_id": "required|string",
        "permission_id": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const message = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "sender_id": "required|string",
        "recipent_id": "required|string",
        "message_text": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const notification = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "notification_text": "required|string"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
const plan = async(req, res, next) => {
    let param = await validateReply.checkParam(req, res, next)
    if (param == "failed") {
        return res.status(400).json({
            message: "Invalid id"
        })
    }
    const validationRule = {
        "start_date": "required|date",
        "expiration_date": "required|date"
    };

    await validateReply.validateReply(req.body, validationRule, res, next)
}
module.exports = {
    user,
    address,
    message,
    notification,
    role,
    permission,
    rolepermission,
    plan
};