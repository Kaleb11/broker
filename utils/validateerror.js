const validator = require('./validator');
// const {
//     user
// } = require("../models");
const checkParam = async(req, res, next) => {
    let id = req.params.id
    if (id) {
        const regexExp = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

        // String with valid UUID separated by dash
        const str = id;

        let tester = regexExp.test(str);
        if (!tester) {
            return "failed"
        } else { return "success" }
    }
}
const validateReply = async(body, validationRule, res, next) => {


    await validator(body, validationRule, {}, (err, status) => {
        if (!status) {
            res.status(412)
                .send({
                    success: false,
                    message: 'Validation failed',
                    error: err.errors,
                });

            console.log("The error", err)
        } else {
            next();
        }
    }).catch(err => console.log(err))
}
const validateArrayReply = async(body, validationRule, res, next) => {
    let bodyArr = body
    let errarr = []
    for (i = 0; i < bodyArr.length; i++) {
        //console.log(i, bodyArr[i])
        await validator(bodyArr[i], validationRule, {}, (err, status) => {
            if (!status) {

                errarr.push({ row: i, ...err.errors })



            }
        })

    }
    if (errarr.length) {
        res.status(412)
            .send({
                success: false,
                message: 'Missing fields',
                error: errarr,
            });
    } else {
        next()
    }

}
module.exports = {
    validateReply,
    checkParam,
    validateArrayReply
}