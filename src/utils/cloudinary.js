import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config({path:'./.env'});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnCloudinary = async (localFilePath) => {
  try {
    // CHECKING FILE PATH
    if (!localFilePath) throw new Error("Couldn't find File");

    // UPLOAD ON CLOUDINARY
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    console.log("FILE SUCCESSFULLY UPLOADED ON CLOUDINARY !!");
    console.log(response);

    // DELETING FILE FROM TEMP FOLDER
    fs.unlinkSync(localFilePath);
    return response
  } catch (error) {
    fs.existsSync(localFilePath) && fs.unlink(localFilePath);

    return null;
  }
};
