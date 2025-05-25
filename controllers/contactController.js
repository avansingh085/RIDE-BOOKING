import asyncError from '../middilewares/errorHand/asyncHandler.js';
import Message from "../models/Message.js";


// @route  POST /api/messages
export const addNewMessage = asyncError(async (req, res) => {
  const newMessage = await Message.create(req.body);
  res.status(201).json({
    success: true,
    message: "Message successfully sent",
    data: newMessage,
  });
});

// @route  GET /api/message
export const getAllMessages = asyncError(async (req, res) => {
  const messages = await Message.find();
  res.status(200).json({
    success: true,
    count: messages.length,
    messages,
  });
});


// @route  GET /api/messages/:id
export const getMessageById = asyncError(async (req, res) => {
  const message = await Message.findById(req.params.id);
  if (!message) {
    return res.status(404).json({ success: false, message: "Message not found" });
  }
  res.status(200).json({ success: true, message });
});


// @route  DELETE /api/messages/:id
export const deleteMessage = asyncError(async (req, res) => {
  const message = await Message.findByIdAndDelete(req.params.id);
  if (!message) {
    return res.status(404).json({ success: false, message: "Message not found" });
  }
  res.status(200).json({ success: true, message: "Message deleted successfully" });
});
