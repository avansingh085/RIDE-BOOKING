import express from "express";
import {
  addNewMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/contact")
  .post(addNewMessage)     // POST /api/contact  - add new message
  .get(getAllMessages);    // GET  /api/contact  - get all messages

router.route("/contact/:id")
  .get(getMessageById)     // GET    /api/contact/:id - get message by id
  .delete(deleteMessage);  // DELETE /api/contact/:id  - delete message by id

export default router;
