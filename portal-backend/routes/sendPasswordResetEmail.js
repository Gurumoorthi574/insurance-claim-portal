const nodemailer = require('nodemailer');
const UserModel = require('../models/users');


// It's a good practice to configure the transporter using environment variables.
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: process.env.EMAIL_PORT === '465', // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app password
    }
});
async function sendPasswordResetEmail(user, resetUrl) {
    const mailOptions = {
        from: `"Insurance Claim Portal" <${process.env.EMAIL_USER}>`,
        to: user.emailId,
        subject: 'Password Reset Request',
        html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2>Password Reset Request</h2>
        <p>Hello ${user.firstName},</p>
        <p>You requested a password reset. Please click the link below to create a new password:</p>
        <p><a href="${resetUrl}" style="padding: 10px 15px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
        <p>This link is valid for a limited time.</p>
        <p>If you did not request a password reset, please ignore this email.</p>
      </div>
    `,
    text: `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`
    };

    try {
        
        console.log(`Sending password reset email to ${user.emailId}...`);
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.response);
        await UserModel.updateOne(
      { emailId: user.emailId },
      { $set: { reseted_status: 1 } }
    );

        return info;
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw error;
    }
}

module.exports = { sendPasswordResetEmail };
