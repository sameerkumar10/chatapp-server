import jwt from "jsonwebtoken";
import { ErrorHandler } from "../utils/utility.js";
import { adminSecretKey } from "../app.js";
import { TryCatch } from "./error.js";
import { SAMEER_TOKEN } from "../constants/config.js";
import { User } from "../models/user.js";

const isAuthenticated = TryCatch((req, res, next) => {
  const token = req.cookies[SAMEER_TOKEN] || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return next(new ErrorHandler("Please login to access this route ", 401));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = decodedData._id;

  next();
});
const adminOnly = (req, res, next) => {
  const token = req.cookies["Sameer-admin-token"];

  if (!token) {
    return next(new ErrorHandler("Only Admin can access this route ", 401));
  }

  const secretKey = jwt.verify(token, process.env.JWT_SECRET_KEY);

  const isMatched = secretKey === adminSecretKey;

  if (!isMatched)
    return next(new ErrorHandler("Only Admin can access this route ", 401));

  const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY);
  req.user = decodedData._id;

  next();
};

const socketAuthenticator = async (err, socket, next) => {
  try {
    if (err) return next(err);
    
    const authToken = socket.request.cookies[SAMEER_TOKEN] || socket.handshake.auth.token;

    if(!authToken)
      return next(new ErrorHandler("Please login to access this route", 401));

    const decodedData = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decodedData._id);

    if(!user)
      return next(new ErrorHandler("Please login to access this route", 401));

    socket.user = user;

   
    return next();

  } catch (error) {
    console.log(error);
    return next(new ErrorHandler("Please login to access this route ", 401));
  }
};

export { isAuthenticated, adminOnly, socketAuthenticator };
