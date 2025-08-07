const cron = require('node-cron');
const nodemailer = require('nodemailer');
const Subscription = require('../models/Subscription');
const User = require('../models/User');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

function start() {
  cron.schedule('0 9 * * *', async () => {
    const now = new Date();
    const soon = new Date();
    soon.setDate(now.getDate() + 3);

    const subs = await Subscription.find({
      dueDate: { $gte: now, $lte: soon }
    });

    for (const sub of subs) {
      const user = await User.findById(sub.userId);
      if (user) {
        transporter.sendMail({
          to: user.email,
          subject: `Reminder: ${sub.name} bill due soon`,
          text: `Your ${sub.name} bill of ₹${sub.cost} is due on ${sub.dueDate.toDateString()}.`
        });
      }
    }
  });
}

module.exports = { start };
