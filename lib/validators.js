import { body, param, validationResult } from "express-validator";
import { ErrorHandler } from "../utils/utility.js";

const validateHandler = (req, res, next) => {
  const errors = validationResult(req);
  const errorMessages = errors
    .array()
    .map((error) => error.msg)
    .join(",");
  console.log(errorMessages);
  if (errors.isEmpty()) return next();
  else next(new ErrorHandler(errorMessages, 400));
};
const registerValidator = () => [
  body("name", "please Enter the Name").notEmpty(),
  body("username", "please Enter Username").notEmpty(),
  body("bio", "please Enter Bio").notEmpty(),
  body("password", "please Enter Password").notEmpty(),
 
];
const loginValidator = () => [
  body("username", "please Enter Username").notEmpty(),

  body("password", "please Enter Password").notEmpty(),
];
const newGroupValidator = () => [
  body("name", "Please Enter Name").notEmpty(),

  body("members") 
    .notEmpty()
    .withMessage("please Enter Members")
    .isArray({ min: 2, max: 100 })
    .withMessage("Members must be 2-100"),
];

const addMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),

  body("members")
    .notEmpty()
    .withMessage("please Enter Members")
    .isArray({ min: 1, max: 97 })
    .withMessage("Members must be 1-97"),
];

const removeMemberValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
  body("userId", "Please Enter User ID").notEmpty(),
];

const sendAttachmentsValidator = () => [
  body("chatId", "Please Enter Chat ID").notEmpty(),
 
];
const chatIdValidator = () => [param("id", "Please Enter Chat ID").notEmpty()];
const renameValidator = () => [
  param("id", "Please Enter Chat ID").notEmpty(),
  body("name", "Please Enter New Name").notEmpty(),
];
const sendRequestValidator = () => [
  body("userId", "Please Enter User ID").notEmpty(),
];
const acceptRequestValidator = () => [
  body("requestId", "Please Enter Request ID").notEmpty(),
  body("accept")
    .notEmpty().withMessage("Please Add Accept")
    .isBoolean()
    .withMessage("Accept must be a boolean"),
];
const adminLoginValidator = () => [
  body("secretKey", "Please Enter Secret Key").notEmpty(),
  
];


export {
  acceptRequestValidator, addMemberValidator, adminLoginValidator, chatIdValidator, loginValidator,
  newGroupValidator, registerValidator, removeMemberValidator, renameValidator, sendAttachmentsValidator, sendRequestValidator, validateHandler
};

