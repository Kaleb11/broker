const {
    notification,
	Sequelize
} = require("../models");

const {Socket} = require("../utils/WebSocket")
const  notify = async (type, subject, notifiable_type, notifiable_id, content, description=null) => {
    try {
        // Added, Checked, Approved, Authorized, Rejected, Assigned, Check, Approve, Authorize
        let notifier = await notification.create({
            type: type,
            subject: subject,
            notifiable_type: notifiable_type,
            notifiable_id: notifiable_id,
            data: JSON.stringify(content),
            description: description ? description : "description"
        })
        Socket.emit("newNotification", notifier.dataValues);
    } catch (error) {
        return {
            message: error.message
        }
    }
    
}

module.exports = {
    notify
}