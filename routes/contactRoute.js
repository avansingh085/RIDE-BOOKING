import express from "express";
import {
  addNewMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} from "../controllers/contactController.js";
import { verifyAdmin } from "../middilewares/auth/verifyAdmin.js";
import verifyToken from "../middilewares/auth/verifyToken.js";

const router = express.Router();

router.route("/contact")
  .post(verifyToken,addNewMessage)     // POST /api/contact  - add new message
  .get(verifyToken,verifyAdmin,getAllMessages);    // GET  /api/contact  - get all messages

router.route("/contact/:id")
  .get(verifyToken,verifyAdmin,getMessageById)     // GET    /api/contact/:id - get message by id
  .delete(verifyToken,verifyAdmin,deleteMessage);  // DELETE /api/contact/:id  - delete message by id

export default router;
