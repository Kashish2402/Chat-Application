import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { User } from "../models/users.models.js";
import { Message } from "../models/messages.models.js";

const getUserList = asyncHandler(async (req, res) => {
  const loggedInUser = req.user?._id;

  if (!loggedInUser) throw new ApiError(400, "User not logged In");

  const remainingUsers = await User.find({
    _id: { $ne: loggedInUser },
  }).select("-password -refreshToken");

  if (!remainingUsers) throw new ApiError(400, "Unable to Fetch Users");

  return res
    .status(200)
    .json(
      new ApiResponse(200, remainingUsers, "User List Fetched Successfully!!")
    );
});

const getMessages = asyncHandler(async (req, res) => {
  const { id: userToChat } = req.params;
  const loggedInUserId = req.user?._id;

  if (!(userToChat || loggedInUserId))
    throw new ApiError(400, "User doesn't exist");

  const messageList = await Message.find({
    $or: [
      { senderId: loggedInUserId, recieverId: userToChat },
      { senderId: userToChat, recieverId: loggedInUserId },
    ],
  });

  if (!messageList) throw new ApiError(400, "Unable to Fetch Messages");

  return res
    .status(200)
    .json(new ApiResponse(200, messageList, "User Fetched Successfully!!"));
});

const sendMessage = asyncHandler(async (req, res) => {
  const { content } = req.body;
  const localMediaPath = req.file?.path;
  const { id: recieverId } = req.params;
  const senderId = req.user?._id;

  if (!(content || localMediaPath)) throw new ApiError(400, "Message Empty");

  let media;
  if (localMediaPath) {
    media = await uploadOnCloudinary(localMediaPath);
  }

  const message = await Message.create({
    senderId,
    recieverId,
    content,
    media: media?.url || null,
  });

  if (!message) throw new ApiError(400, "Unable to create Message");

  return res
    .status(201)
    .json(new ApiResponse(201, message, "Message Sent Successfully!!"));
});

export { getUserList, getMessages, sendMessage };
