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
    ADMIN_EMAIL,
    REDIS_PORT,
    REDIS_ENDPOINT,
    REDIS_PASS,
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = process.env;