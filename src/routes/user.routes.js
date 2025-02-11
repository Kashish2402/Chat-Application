import { Router } from "express";
import {
  changePassword,
  getUserProfile,
  login,
  logout,
  refreshAccessToken,
  register,
  updateAvatar,
  updateUserDetails,
} from "../controllers/user.controllers.js";
import { verifyJWT } from "../middlewares/authentication.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/signup").post(register);
router.route("/login").post(login);
router.route("/logout").post(verifyJWT, logout);

router.route("/change-password").post(verifyJWT, changePassword);

router
  .route("/update-avatar")
  .patch(verifyJWT, upload.single("profilepic"), updateAvatar);

router.route("/update-details").patch(verifyJWT, updateUserDetails);

router.route("/user").get(verifyJWT, getUserProfile);
router.route("/refresh-access-token").post(verifyJWT, refreshAccessToken);

export default router;
