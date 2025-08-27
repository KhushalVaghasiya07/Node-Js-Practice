const nodeMailer = require("nodemailer");

const sendEmail = async (data) => {
  const transporter = nodeMailer.createTransport({
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: "khushalvaghasiya0@gmail.com",
      pass: "nvdeewiixsnpoeyu",
    },
  });

  let response = await transporter.sendMail(data);
  if (response) {
    console.log("Email Response: ", response);
    return response;
  } else {
    console.log("Email is not Send");
  }
};

module.exports = sendEmail;