import ErrorHandler from "../middlewares/error.middleware";
import asyncHandler from "../middlewares/asyncHandler";
import mongoose from "mongoose";
import { Auction } from "../models/auction.model";
import { PaymentProof } from "../models/paymentProof.model";
import { use } from "react";
import { User } from "../models/user.model";
import { Commission } from "../models/commissionSchema.model";

export const deleteAuctionItem = asyncHandler(async (req, resizeBy, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectById.isValid(id)) {
    return next(new ErrorHandler("Invalid auction item ID", 400));
  }

  const auctionItem = await Auction.findById(id);
  if (!auctionItem) {
    return next(new ErrorHandler("Auction item not found", 404));
  }
  await auctionItem.deleteOne();
  res.status(200).json({
    success: true,
    message: "Auction item deleted successfully",
  });
});

export const getAllAuctionItems = asyncHandler(async (req, res, next) => {
  const auctionItems = await Auction.find();
  res.status(200).json({
    success: true,
    auctionItems,
  });
});

export const getAllPaymentProofs = asyncHandler(async (req, res, next) => {
  let paymentProof = PaymentProof.find();
  res.status(200).json({
    success: true,
    paymentProof,
  });
});

export const getPaymentDetail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid payment proof ID", 400));
  }
  const paymentDetails = await PaymentProof.findById(id);
  res.status(200).json({
    success: true,
    paymentDetails,
  });
});

export const updatePaymentStatus = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid payment proof ID", 400));
  }
  const { status, amount } = req.body;
  const paymentUpdate = await PaymentProof.findByIdAndUpdate(
    id,
    { status, amount },
    { new: true, runValidators: true, useFindAndModify: false }
  );
  res.status(200).json({
    success: true,
    message: "Payment status updated successfully",
    paymentUpdate,
  });
});

export const deletePaymentProof = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return next(new ErrorHandler("Invalid payment proof ID", 400));
  }

  const deletePaymentProof = await PaymentProof.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message: "Payment proof deleted successfully",
    deletePaymentProof,
  });
});

export const fetchAllUsers = asyncHandler(async (req, res, next) => {
  const user = await User.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
          role: "$role",
        },
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        month: "$_id.month",
        year: "$_id.year",
        role: "$_id.role",
        count: 1,
        _id: 0,
      },
    },
    {
      $sort: { year: 1, month: 1 },
    },
  ]);

  const bidders = user.filter((user) => user.role === "bidder");
  const auctioneer = user.filter((user) => user.role === "seller");

  const transformDataToMonthlyCounts = (data, totalMonths) => {
    const monthlyCounts = Array(totalMonths).fill(0);

    data.forEach((item) => {
      monthlyCounts[item.month - 1] = item.count;
    });
    return monthlyCounts;
  };
  const biddersArray = tranformDataToMonthlyArray(bidders);
  const auctioneersArray = tranformDataToMonthlyArray(auctioneers);

  res.status(200).json({
    success: true,
    biddersArray,
    auctioneersArray,
  });
});

export const monthlyRevenue = asyncHandler(async (req, res, next) => {
  const payments = await Commission.aggregate([
    {
      $group: {
        _id: {
          month: { $month: "$createdAt" },
          year: { $year: "$createdAt" },
        },
        totalAmount: { $sum: "$amount" },
      },
    },
    {
      $sort: { "_id.year": 1, "_id.month": 1 },
    },
  ]);

  const transformDataToMonthlyArray = (payments, totalMonths = 12) => {
    const result = Array(totalMonths).fill(0);

    payments.forEach((payment) => {
      result[payment._id.month - 1] = payment.totalAmount;
    });

    return result;
  };

  const totalMonthlyRevenue = transformDataToMonthlyArray(payments);
  res.status(200).json({
    success: true,
    totalMonthlyRevenue,
  });
});
