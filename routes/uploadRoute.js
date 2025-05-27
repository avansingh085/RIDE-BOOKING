import { upload } from "../middilewares/multer/upload.js";
import { uploadImage } from "../controllers/uploadController.js";
import express from 'express';
import verifyToken from "../middilewares/auth/verifyToken.js";
import { verifyAdmin } from "../middilewares/auth/verifyAdmin.js";
const router = express.Router();
router.post('/image', upload.single('image'), uploadImage);
export default router;