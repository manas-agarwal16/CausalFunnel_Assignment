import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.NODEMAILER_EMAIL,
    pass: process.env.NODEMAILER_PASSWORD,
  },
});

transporter.on("sent", (info) => {
  if (info.rejected.length > 0) {
    console.log("Some recipients were rejected:", info.rejected);
    return false;
  }
});

const sendOTPThroughEmail = async (userEmail, score) => {
  let mailOptions = {
    from: "manas.agarwal1604@gmail.com",
    to: userEmail,
    subject: "Quiz Result",
    text: `
        Hi,

        Thank you for participating in the quiz!
        Your result is: ${score} / 15

        We appreciate your time and effort.
        Best of luck for your future challenges!

        Warm regards,
        The Quiz Team
      `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    return true; // Email sent successfully
  } catch (error) {
    console.error("Error occurred:", error);
    console.log("Error message:", error.message);
    return false;
  }
};
export { sendOTPThroughEmail };
