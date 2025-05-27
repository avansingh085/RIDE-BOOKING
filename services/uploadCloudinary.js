import cloudinaryConfig from "../config/cloudinary-config.js";
import { Readable } from 'stream';
import fs from 'fs';
export const uploadCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinaryConfig.uploader.upload_stream((error, result) => {
      if (error) {
        console.log(error);
        return reject(error)};
      resolve(result);
    });

    const readable = new Readable();
    readable._read = () => {};
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
};
