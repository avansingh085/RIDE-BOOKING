import dotenv from "dotenv";
dotenv.config();
export const {
    PORT,
    MONGO_URI,
    JWT_SECRET,
    EMAIL_USER,
    EMAIL_PASS,
    API_SECRET_CLOUDINARY,
    API_KEY_CLOUDINARY,
    CLOUD_NAME,
    FRONTEND_URL,
    ADMIN_EMAIL
} = process.env;