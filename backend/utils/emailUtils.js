const sendMail = require('./sendMail');

// Generate random 6-digit verification code
const generateVerificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send verification email
const sendVerificationEmail = async (email, code) => {
    try {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
                    <h1>Email Verification</h1>
                </div>
                <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
                    <p style="color: #333; font-size: 16px;">Hi,</p>
                    <p style="color: #333; font-size: 16px;">Your verification code is:</p>
                    <div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                        <h2 style="color: #667eea; font-size: 32px; letter-spacing: 2px; margin: 0;">${code}</h2>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 30 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't request this code, please ignore this email.</p>
                </div>
            </div>
        `;

        await sendMail(email, 'Email Verification Code', htmlContent);
        console.log(`📧 Verification email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Failed to send verification email:', error);
        return false;
    }
};

// Send password reset email
const sendPasswordResetEmail = async (email, code) => {
    try {
        const htmlContent = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; color: white; border-radius: 8px 8px 0 0;">
                    <h1>Password Reset</h1>
                </div>
                <div style="background: #f5f5f5; padding: 30px; border-radius: 0 0 8px 8px;">
                    <p style="color: #333; font-size: 16px;">Hi,</p>
                    <p style="color: #333; font-size: 16px;">Your password reset code is:</p>
                    <div style="background: white; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0;">
                        <h2 style="color: #667eea; font-size: 32px; letter-spacing: 2px; margin: 0;">${code}</h2>
                    </div>
                    <p style="color: #666; font-size: 14px;">This code will expire in 30 minutes.</p>
                    <p style="color: #666; font-size: 14px;">If you didn't request a password reset, please ignore this email.</p>
                </div>
            </div>
        `;

        await sendMail(email, 'Password Reset Code', htmlContent);
        console.log(`📧 Password reset email sent to ${email}`);
        return true;
    } catch (error) {
        console.error('❌ Failed to send password reset email:', error);
        return false;
    }
};

module.exports = {
    generateVerificationCode,
    sendVerificationEmail,
    sendPasswordResetEmail
};
