import express from 'express';
import http from 'http';
import app from './app.js';
import connectDB from './config/db-config.js';
connectDB();
const server=http.createServer(app);import mongoose from 'mongoose';




server.listen(3001,()=>{
    console.log("hellow server is running port",)
})