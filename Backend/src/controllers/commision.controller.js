import { asyncHandler } from "../utils/asyncHandler";
import ErrorHandler from "../middlewares/error.js";
import { Auction } from "../models/auction.model.js";
import { Commission } from "../models/commissionSchema.model.js";
import { User } from "../models/user.model.js";

export const calculateCommission = async (auctionID) => {
  const auction = await Auction.findById(auctionID);
  if (!auction) {
    return next(new ErrorHandler("Auction item not found", 404));
  }
  const commissionRate = 0.05;
  const commission = auction.currentBid * commissionRate;
  return commission;
};

export const proofOfCommission = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("No files were uploaded", 400));
  }
  const { proof } = req.files;
  const { amount, comment } = req.body;
  const user = await User.findById(req.user._id);

  if (!amount || !comment) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }

  if (user.unpaidCommission == 0) {
    return res.status(200).json({
      success: true,
      message: "No unpaid commission to settle",
    });
  }

  if (amount > user.unpaidCommission) {
    return next(new ErrorHandler("Amount exceeds unpaid commission", 400));
  }

  const allowFormats = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowFormats.includes(proof.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file format. Only JPEG, PNG, and JPG are allowed.",
        400
      )
    );
  }

  const cloudinaryResponse = await cloudinary.uploader.upload(
    proof.tempFilePath,
    {
      folder: "commission_proofs",
    }
  );
  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary error:",
      cloudinaryResponse.error || "Unknown cloudinary error."
    );
    return next(new ErrorHandler("Failed to upload payment proof.", 500));
  }
  const commissionProof = await PaymentProof.create({
    userId: req.user._id,
    proof: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
    amount,
    comment,
  });
  res.status(201).json({
    success: true,
    message:
      "Your proof has been submitted successfully. We will review it and respond to you within 24 hours.",
    commissionProof,
  });
});
