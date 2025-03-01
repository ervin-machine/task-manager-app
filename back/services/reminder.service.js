const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const cron = require("node-cron");
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, EMAIL_FROM } = require("../config/dotenv");
const { Task, User } = require("../models");

const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    auth: {
        user: SMTP_USER,
        pass: SMTP_PASS
    },
});

const sendMail = async (to, subject, text) => {
    try {
        const msg = { from: EMAIL_FROM, to, subject, text };
        await transport.sendMail(msg);
    } catch (error) {
        console.error("Error sending email:", error);
    }
};

const sendReminderEmail = async () => {
    try {
        const currentDate = new Date();
        const thresholdDate = new Date();
        thresholdDate.setDate(currentDate.getDate() + 3); // Tasks due in the next 3 days

        const tasks = await Task.find({
            dueDate: { $lte: thresholdDate, $gte: currentDate }
        }).exec();

        for (const task of tasks) {
            const user = await User.findOne({ _id: new mongoose.Types.ObjectId(task.createdBy) });

            if (user && user.email) {
                const text = `Your task "${task?.title}" is due on ${task?.dueDate}. Please complete it on time.`;
                await sendMail(user.email, subject, text);
            }
        }
    } catch (error) {
        console.error("Error in sendReminderEmail:", error);
    }
};

// Run at 8 PM daily
const startReminderJob = () => {
    cron.schedule("0 09 * * *", async () => {
        console.log("Running reminder email check at 9 AM...");
        await sendReminderEmail();
    });
};

module.exports = { startReminderJob }
