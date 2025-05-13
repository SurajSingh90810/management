const nodemailer = require("nodemailer");



// sending Emai and Password To Email

const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "singhsuraj90810@gmail.com",
    pass: "jebriamuxckpnzaz", 
  },
});

const sendEmployeeEmailPassword = async (receiverEmail, EmployeeEmail, password) => {
  await transporter.sendMail({
    from: "singhsuraj90810@gmail.com",
    to: receiverEmail,
    subject: "Your Manager Account Details",
    html: `
      <h2>Welcome!</h2>
      <p>Your manager account has been created.</p>
      <p><strong>Company Email:</strong> ${EmployeeEmail}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p>Please keep this information secure.</p>
    `,
  });
};



const transporterEmployee = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false,
  auth: {
    user: "singhsuraj90810@gmail.com",
    pass: "dkunyshmyebjdsea",
  },
});

const employeeSendOTPEmail = async (receiverEmail, OTP) => {
  await transporterEmployee.sendMail({
    from: "singhsuraj90810@gmail.com",
    to: receiverEmail,
    subject: "Reset Password",
    html: `<h2>Hello Admin,</h2><p>Your OTP is: <strong>${OTP}</strong></p>`,
  });
};





module.exports={sendEmployeeEmailPassword,employeeSendOTPEmail}