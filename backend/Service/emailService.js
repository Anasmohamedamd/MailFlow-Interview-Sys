const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const emailService = async(to,subject,html) => {
    try {
        if(!to){
        throw new error("Recipient email(s) required");
    }

    let recipients = [];
    if(typeof to === "string"){
        recipients = [{email:to}];
    }else if(Array.isArray(to)){
        recipients = to.map(item => {
            if(typeof item === "string") return {email:item};
            if(item.email) return item;
            return null;
        }).filter(Boolean);
    } else if(to.email) {
        recipients =[to];
    }

    recipients = recipients.filter(r => r.email && r.email.includes("@"));
    if(recipients.length === 0){
        throw new error("No validation recipient emails found");
    }

    const msg = {
        to:recipients,
        from:{
            email:process.env.SENDGRID_FROM,
            name:"MailFlow"
        },
        subject,
        html
    }

    const response = await sgMail.send(msg);
    console.log("Email Sent:",response[0].statusCode);
    return response;

    } catch (error) {
        console.error("Error sending email:", error.response?.body || error.message);
        throw new Error("Email sending failed");
    }
    
}
module.exports = emailService;