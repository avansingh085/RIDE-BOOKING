import nodemailer from 'nodemailer';
import { EMAIL_PASS, EMAIL_USER } from './server-config.js';

 const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});
export default transporter;

