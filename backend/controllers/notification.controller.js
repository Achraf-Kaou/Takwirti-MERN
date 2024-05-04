const { NotifModel } =require('../models/notification.model');


const GetAllNotifUser  = async (req, res) => {
    console.log("GET ALL NOTI HERE")
    try {
        const { id } = req.params; 

        const notifications = await NotifModel.find({ receiver: id }).populate({
            path: 'sender',
            select: 'nom prenom image'
        }).sort({ createdAt: -1 }); // tri bel latest , populate bech tjibli el nom wel prenom mel id mtaa el sender
        
        res.status(200).json({
            message: "Notifications fetched successfully",
            notifications: notifications
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to fetch notifications",
            error: error.message
        });
    }
};
/* const SendNotif  = async (req, res) => {
    console.log("send noti here")
    try {
        const { sender, receiver, message } = req.body;

        const notification = await NotifModel.create({
            sender: sender,
            receiver: receiver,
            message: message
        });

        res.status(200).json({
            message: "Notification sent successfully",
            notification: notification
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to send notification",
            error: error.message
        });
    }
};   old controller */ 

const SendNotif = async (req, res) => {
    try {
        const { sender, receivers, message } = req.body;
        console.log(receivers);
        const notifications = await Promise.all(receivers.map(async receiverId => {
            // Check if a notification already exists for this sender, receiver, and message
            const existingNotification = await NotifModel.findOne({
                sender: sender,
                receiver: receiverId,
                message: message
            });

            if (!existingNotification) {
                // Create a new notification if it doesn't exist
                const notification = await NotifModel.create({
                    sender: sender,
                    receiver: receiverId,
                    message: message
                });
                return notification;
            } else {
                // Return null for existing notifications
                return null;
            }
        }));

        // Filter out null values (existing notifications) from the notifications array
        const newNotifications = notifications.filter(notification => notification !== null);

        res.status(200).json({
            message: "Notifications sent successfully",
            notifications: newNotifications
        });
    } catch (error) {
        res.status(400).json({
            message: "Failed to send notifications",
            error: error.message
        });
    }
};




module.exports.notifController = {
    GetAllNotifUser,
    SendNotif 
};
