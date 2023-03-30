let self = {};
let permission

function middle(req, res, next, permission) {
    if (permission == "pass") {
        next();
    } else {
        res.status(401).json({
            message: "Unauthorized action"
        })
    }

}
// self.middler(permission, async(req, res) => {
//     if (permission == "pass") {
//         next();
//     } else {
//         res.status(401).json({
//             message: "Unauthorized action"
//         })
//     }
// });
function ms() {
    return permission;
};

module.exports = {
    ms
}