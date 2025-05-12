const nodemailer = require("nodemailer");



// sending Emai and Password To Manager

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "singhsuraj90810@gmail.com",
    pass: "jebriamuxckpnzaz", 
  },
});

const sendManagerEmailPassword = async (receiverEmail, companyEmail, password) => {
  await transporter.sendMail({
    from: "singhsuraj90810@gmail.com",
    to: receiverEmail,
    subject: "Your Manager Account Details",
    html: `
      <h2>Welcome!</h2>
      <p>Your manager account has been created.</p>
      <p><strong>Company Email:</strong> ${companyEmail}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please keep this information secure.</p>
    `,
  });
};



//  Manager Forgot Password




const transporterManager = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "singhsuraj90810@gmail.com",
    pass: "evuyomfrzxjpbdxq",
  },
});

const ManagerSendOTPEmail = async (receiverEmail, OTP) => {
  await transporterManager.sendMail({
    from: "singhsuraj90810@gmail.com",
    to: receiverEmail,
    subject: "Reset Password",
    html: `<h2>Hello Admin,</h2><p>Your OTP is: <strong>${OTP}</strong></p>`,
  });
};



module.exports = sendManagerEmailPassword,ManagerSendOTPEmail;
