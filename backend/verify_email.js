require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log(`Attempting to connect with User: ${process.env.EMAIL_USER}`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        await transporter.verify();
        console.log("✅ Success! Your email credentials are valid.");
        console.log("You can now send emails.");
    } catch (error) {
        console.error("❌ Authentication Failed!");
        console.error("Error Code:", error.code);
        console.error("Response:", error.response);
        console.error("\nPlease check:");
        console.error("1. Did you generate the App Password for '" + process.env.EMAIL_USER + "'?");
        console.error("   (If you generated it for a different gmail account, update EMAIL_USER in .env)");
        console.error("2. Is the App Password copied correctly without extra spaces?");
    }
};

testEmail();
