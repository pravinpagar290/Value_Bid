import { asyncHandler } from "../utils/asyncHandler";
import ErrorHandler from "../middlewares/error.middleware.js";

import { Auction } from "../models/auction.model";
import { User } from "../models/user.model.js";
import { Bid } from "../models/bid.model.js";

export const placeBid = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction item not found", 404));
  }

  // Extract and validate numeric bid amount
  const amount = Number(req.body.amount);
  if (!amount || isNaN(amount)) {
    return next(
      new ErrorHandler("Please provide a valid numeric bid amount", 400)
    );
  }
  if (amount <= auctionItem.currentBid) {
    return next(
      new ErrorHandler("Bid amount must be higher than current bid", 400)
    );
  }
  if (amount < auctionItem.startingBid) {
    return next(
      new ErrorHandler("Bid amount must be higher than starting bid", 400)
    );
  }

  try {
    const existingBid = await Bid.findOne({
      "bidder.id": req.user._id,
      auctionItem: auctionItem._id,
    });
    const existingBidInAuction = auctionItem.bids.find(
      (bid) => bid.userId.toString() === req.user._id.toString()
    );
    if (existingBid && existingBidInAuction) {
      // update subdocument and external Bid document then save parent auction
      existingBidInAuction.amount = amount;
      existingBid.amount = amount;
      await existingBid.save();
      auctionItem.currentBid = amount;
    } else {
      const bidderDetails = await User.findById(req.user._id);
      const bid = await Bid.create({
        amount,
        bidder: {
          id: bidderDetails._id,
          userName: bidderDetails.username,
          profileImage: bidderDetails.profileImage,
        },
        auctionItem: auctionItem._id,
      });
      auctionItem.bids.push({
        userId: req.user._id,
        userName: bidderDetails.username,
        profileImage: bidderDetails.profileImage,
        amount,
      });
      auctionItem.currentBid = amount;
    }
    await auctionItem.save();

    res.status(200).json({
      success: true,
      message: "Bid placed successfully",
      currentBid: auctionItem.currentBid,
    });
  } catch (error) {
    return next(
      new ErrorHandler(error.message || "Error checking existing bid", 500)
    );
  }
});
