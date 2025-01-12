import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { v2 as cloudinary} from "cloudinary";
import { getBase64, getSockets } from "../lib/helper.js";

const cookieOptions = {
  maxAge: 1000 * 60 * 15,
  httpOnly: true,
  sameSite: "none",
  secure: true, // Required for HTTPS
};


const connectDB = (uri) => {
  mongoose
    .connect(uri, { dbName: "SameersDatabase" })
    .then((data) =>
      console.log(`Database connected successfully : ${data.connection.host}`)
    )
    .catch((err) => {
      throw err;
    });
};

const sendToken = (res, user, code, message) => {
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY);

  return res.status(code).cookie("sameer-token", token, cookieOptions).json({
    success: true,
    user,
    message,
  });
};

const emitEvent = (req, event, users, data) => {
  const io= req.app.get("io");
  const usersSocket = getSockets((users));
  io.to(usersSocket).emit(event, data);
};

const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          resource_type: "auto",
          public_id: uuid(),
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        }
      );
    });
  });
    try{
      const results = await Promise.all(uploadPromises);
      const formattedResult = results.map((result)=> ({
        public_id: result.public_id,
        url:result.secure_url,
      }));
      return formattedResult;
    }catch(err){
      throw new Error("Error uploading files to cloudinary", err);
     }
   

};

const deleteFilesFromCloudinary = async (public_ids) => {
  //Delete files from cloudinary
};

export {
  connectDB,
  sendToken,
  cookieOptions,
  emitEvent,
  deleteFilesFromCloudinary,
  uploadFilesToCloudinary,
};
