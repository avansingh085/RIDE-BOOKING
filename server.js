import express from 'express';
import http from 'http';
import app from './app.js';
import connectDB from './config/db-config.js';
import client from './config/redis-config.js'
connectDB();
 
const server=http.createServer(app);
server.listen(3001,()=>{
    console.log(" server is running.....",)
})