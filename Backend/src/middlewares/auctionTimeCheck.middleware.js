import mongoose from "mongoose";
import ErrorHandler from "../middlewares/error.middleware.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Auction } from "../models/auction.model.js";

export const checkAuctionTime = asyncHandler(async (req,resizeBy,next)=>{
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid auction ID", 400));
    }
    const auctionItem = await Auction.findById(id);
    if (!auctionItem) {
        return next(new ErrorHandler("Auction item not found", 404));
    }

    const currentTime = new Date();
    if (currentTime < new Date(auctionItem.startTime)) {
        return next(new ErrorHandler("Auction has not started yet", 400));
    }
    if (currentTime > new Date(auctionItem.endTime)) {
        return next(new ErrorHandler("Auction has already ended", 400));
    }
    next(); 
})