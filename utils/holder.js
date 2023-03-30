const {
    actionstate,
    department,
    stakeholder,
    Sequelize
} = require("../models");
const Op = Sequelize.Op;

const filteredData = async(res, id, model) => {

    // let other = await eval(model).findAll({
    //     order: [['createdAt', 'DESC']],
    //     where: {
    //         department_id: {
    //             [Op.in]: exist
    //         }
    //     },

    // })

    let mine = await eval(model).findAll({
        where: {
            department_id: id
        }
    })
    return res.json(mine)

    let otherArr = []
    for (let da of other) {
        let action = await actionstate.findOne({
            where: {
                model_id: da.id,
                action: "APPROVE"
            }
        })
        if (action) {
            otherArr.push(da)
        }
    }

    let data = [...mine, ...otherArr]
    return data;
}

module.exports = {
    filteredData
}