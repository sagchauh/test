import  twilio  from "twilio";
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilionumber = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

const sendOtpSms = async (number, otp) => {
    try {
        const message = await client.messages.create({
            body: `Your otp is ${otp}`,
            from: twilionumber,
            to: number,
        })

        console.log("otp sent successfully", message.sid);
        return message.sid
    } catch (error) {
        console.error("Error sending OTP via Twilio:", error.message);
        throw new Error("Error sending OTP via Twilio");
    }
}

export default sendOtpSms




