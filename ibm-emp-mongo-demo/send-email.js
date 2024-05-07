import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    service: 'gmail',
    auth: {
        user: '', 
        pass: '' 
    }
});


const sendEmail = (eTo,eSubject,eText)=>{
    const mailOptions = {
        from: 'fiqbal997@gmail.com',
        to: eTo,
        subject: eSubject,
        text: eText
    };
    
    return new Promise((resolve,reject)=>{
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        })
    });
}


export{sendEmail}
