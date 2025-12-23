import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { v2 as cloudinary } from "cloudinary";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwtToken.js";

export const registerUser = asyncHandler(async (req, res, next) => {
  const {
    username,
    email,
    password,
    role,
    bankAccountNumber,
    bankName,
    accountHolderName,
    easypaisaAccountNumber,
    paypalEmail,
  } = req.body;

  if (!username || !email || !password || !role) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  if (role === "seller") {
    if (!bankAccountNumber || !bankName || !accountHolderName) {
      {
        return next(
          new ErrorHandler(
            "Please provide all bank transfer details for seller role",
            400
          )
        );
      }
    }
    if (!easypaisaAccountNumber) {
      return next(
        new ErrorHandler(
          "Please provide easypaisa account number for seller role",
          400
        )
      );
    }
    if (!paypalEmail) {
      return next(
        new ErrorHandler("Please provide paypal email for seller role", 400)
      );
    }
  }

  const isRegistered = await User.findOne({ email });
  if (isRegistered) {
    return next(
      new ErrorHandler("User already registered with this email", 400)
    );
  }
  const files = req.files || {};
  // support multiple possible keys and fallback to first provided file
  const profileImage =
    files.avatar || files.profileImage || files.file || Object.values(files)[0];
  if (!profileImage) {
    return next(
      new ErrorHandler(
        "Please upload a file (key 'avatar' or 'profileImage' or 'file')",
        400
      )
    );
  }

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedFormats.includes(profileImage.mimetype)) {
    return next(
      new ErrorHandler("Only jpg, jpeg, and png formats are allowed", 400)
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    profileImage.tempFilePath,
    {
      folder: "MERN_AUCTION_PLATFORM_USERS",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error :",
      cloudinaryResponse?.error || "Unknown Cloudinary error."
    );
    return next(
      new ErrorHandler("Failed to upload image. Please try again later.", 500)
    );
  }
  const user = await User.create({
    username,
    password,
    email,
    role,
    profileImage: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    paymentMethods: {
      bankTransfer: {
        bankAccountNumber,
        bankName,
        accountHolderName,
      },
      easypaisa: {
        easypaisaAccountNumber,
      },
      paypal: {
        paypalEmail,
      },
    },
  });
  generateToken(user, "User registered successfully", 201, res);
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new ErrorHandler("Please provide email and password", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }
  generateToken(user, "Logged in successfully", 200, res);
});

export const logoutUser = asyncHandler(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    })
    .json({
      success: true,
      message: "Logged out successfully",
    });
});

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
});

export const fetchLeaderboard = asyncHandler(async (req, res, next) => {
  const users = await User.find({ moneySpent: { $gt: 0 } });
  const leaderboard = users.sort((a, b) => b.moneySpent - a.moneySpent);
  res.status(200).json({
    success: true,
    leaderboard,
  });
});
