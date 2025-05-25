import express from "express";
import {
  addNewMessage,
  getAllMessages,
  getMessageById,
  deleteMessage,
} from "../controllers/contactController.js";

const router = express.Router();

router.route("/")
  .post(addNewMessage)     // POST /api/messages  - add new message
  .get(getAllMessages);    // GET  /api/messages  - get all messages

router.route("/:id")
  .get(getMessageById)     // GET    /api/messages/:id  - get message by id
  .delete(deleteMessage);  // DELETE /api/messages/:id  - delete message by id

export default router;
