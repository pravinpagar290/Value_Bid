import { Auction } from "../models/auction.model.js";
import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { Bid } from "../models/bid.model.js";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import { calculateCommission } from "./commission.controller.js";

export const addNewAuctionItem = asyncHandler(async (req, res, next) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(new ErrorHandler("Please provide auction item image", 400));
  }

  const { image } = req.files;

  const allowedFormats = ["image/jpeg", "image/png", "image/jpg"];
  if (!allowedFormats.includes(image.mimetype)) {
    return next(
      new ErrorHandler(
        "Invalid file format. Only JPEG, PNG, and JPG are allowed.",
        400
      )
    );
  }
  const {
    title,
    description,
    category,
    condition,
    startingBid,
    startTime,
    endTime,
  } = req.body;
  if (
    !title ||
    !description ||
    !category ||
    !condition ||
    !startingBid ||
    !startTime ||
    !endTime
  ) {
    return next(new ErrorHandler("Please provide all required fields", 400));
  }
  const start = new Date(startTime);
  const end = new Date(endTime);
  if (isNaN(start) || isNaN(end)) {
    return next(new ErrorHandler("Invalid start or end time", 400));
  }
  if (end <= start || end <= new Date()) {
    return next(
      new ErrorHandler("Auction end time must be in the future", 400)
    );
  }
  // const alreadyOneAuctionActive = await Auction.findOne({
  //   createdBy: req.user._id,
  //   endTime: { $gt: new Date() },
  // });
  // if (alreadyOneAuctionActive) {
  //   return next(
  //     new ErrorHandler(
  //       "You can have only one active auction at a time. Please wait for the current auction to end before creating a new one.",
  //       400
  //     )
  //   );
  // }
  try {
    const cloudinaryResponse = await cloudinary.uploader.upload(
      image.tempFilePath,
      {
        folder: "auction_items",
      }
    );
    if (!cloudinaryResponse || cloudinaryResponse.error) {
      console.error(
        "Cloudinary error:",
        cloudinaryResponse.error || "Unknown cloudinary error."
      );
      return next(
        new ErrorHandler("Failed to upload image. Please try again later.", 500)
      );
    }
    const auctionItem = await Auction.create({
      title,
      description,
      category,
      condition: condition.toLowerCase(),
      startingBid,
      startTime: start,
      endTime: end,
      image: {
        public_id: cloudinaryResponse.public_id,
        url: cloudinaryResponse.secure_url,
      },
      createdBy: req.user._id,
    });
    res.status(201).json({
      success: true,
      message: "Auction item created successfully",
      auctionItem,
    });
  } catch (error) {
    console.error("Auction creation error:", error);
    return next(
      new ErrorHandler(error.message || "Failed to create auction item", 500)
    );
  }
});

export const getAllItems = asyncHandler(async (req, res, next) => {
  let items = await Auction.find();
  res.status(200).json({ success: true, items });
});

export const getAuctionDetails = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format.", 400));
  }
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found.", 404));
  }
  const bidders = (auctionItem.bids || [])
    .slice()
    .sort((a, b) => b.amount - a.amount);
  res.status(200).json({
    success: true,
    auctionItem,
    bidders,
  });
});

export const getMyAuctionItems = asyncHandler(async (req, res, next) => {
  const items = await Auction.find({ createdBy: req.user._id });
  res.status(200).json({ success: true, items });
});

export const removeFromAuction = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format.", 400));
  }
  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found.", 404));
  }
  await auctionItem.deleteOne();
  res.status(200).json({
    success: true,
    message: "Auction item deleted successfully.",
  });
});

export const republishItem = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid Id format.", 400));
  }
  let auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction not found.", 404));
  }
  if (!req.body.startTime || !req.body.endTime) {
    return next(
      new ErrorHandler("Starttime and Endtime for republish is mandatory.")
    );
  }
  if (new Date(auctionItem.endTime) > new Date()) {
    return next(
      new ErrorHandler("Auction is already active, cannot republish", 400)
    );
  }
  let data = {
    startTime: new Date(req.body.startTime),
    endTime: new Date(req.body.endTime),
  };
  if (data.startTime <= new Date()) {
    return next(
      new ErrorHandler(
        "Auction starting time must be greater than present time",
        400
      )
    );
  }
  if (data.startTime >= data.endTime) {
    return next(
      new ErrorHandler(
        "Auction starting time must be less than ending time.",
        400
      )
    );
  }

  if (auctionItem.highestBidder) {
    const highestBidder = await User.findById(auctionItem.highestBidder);
    highestBidder.moneySpent -= auctionItem.currentBid;
    highestBidder.auctionsWon -= 1;
    await highestBidder.save();
  }

  data.bids = [];
  data.commissionCalculated = false;
  data.currentBid = 0;
  data.highestBidder = null;
  auctionItem = await Auction.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  if (auctionItem.commissionCalculated) {
    const commission = await calculateCommission(id);
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { unpaidCommission: -commission },
    });
  }
  await Bid.deleteMany({ auctionItem: auctionItem._id });
  const createdBy = await User.findById(req.user._id);
  res.status(200).json({
    success: true,
    auctionItem,
    message: `Auction republished and will be active on ${req.body.startTime}`,
    createdBy,
  });
});
