import cron from "node-cron";
import {Auction} from "../models/auction.model.js"
import {Bid} from "../models/bid.model.js";
import {User} from "../models/user.model.js";
import {calculateCommission} from "../controllers/commission.controller.js";
import {sendEmail} from "../utils/sendEmail.js";
export const endedAuctionCron = () => {
  cron.schedule("*/1 * * * *", async () => {
    const now = new Date();
    console.log("Cron for ended auction running...");
    const endedAuctions = await Auction.find({
      endTime: { $lt: now },
      commissionCalculated: false,
    });
    for (const auction of endedAuctions) {
      try {
        const commissionAmount = await calculateCommission(auction._id);
        auction.commissionCalculated = true;
        const highestBidder = await Bid.findOne({
          auctionItem: auction._id,
          amount: auction.currentBid,
        });
        const auctioneer = await User.findById(auction.createdBy);
        if (highestBidder) {
          auction.highestBidder = highestBidder.bidder.id;
          await auction.save();
          const bidder = await User.findById(highestBidder.bidder.id);
          await User.findByIdAndUpdate(
            bidder._id,
            {
              $inc: {
                moneySpent: highestBidder.amount,
                auctionsWon: 1,
              },
            },
            { new: true }
          );
          await User.findByIdAndUpdate(
            auctioneer._id,
            {
              $inc: {
                unpaidCommission: commissionAmount,
              },
            },
            { new: true }
          );
          const subject = `Congratulations! You won the auction for ${auction.title}`;
          const message = `Dear ${bidder.username}, \n\nCongratulations! You have won the auction for ${auction.title}. \n\nBefore proceeding for payment contact your auctioneer via your auctioneer email:${auctioneer?.email || "N/A"} \n\nPlease complete your payment using one of the following methods:\n\n1. Bank Transfer: \n- Account Name: ${auctioneer?.paymentMethods?.bankTransfer?.bankAccountName || "N/A"} \n- Account Number: ${auctioneer?.paymentMethods?.bankTransfer?.bankAccountNumber || "N/A"} \n- Bank: ${auctioneer?.paymentMethods?.bankTransfer?.bankName || "N/A"}\n\n2. Easypaisa: ${auctioneer?.paymentMethods?.easypaisa?.easypaisaAccountNumber || "N/A"}\n\n3. PayPal: ${auctioneer?.paymentMethods?.paypal?.paypalEmail || "N/A"}\n\n4. Cash on Delivery (COD):\n- If you prefer COD, you must pay 20% of the total amount upfront before delivery.\n\nPlease ensure your payment is completed by [Payment Due Date]. Once we confirm the payment, the item will be shipped to you.\n\nBest regards,\nZeeshu Auction Team`;
          console.log("SENDING EMAIL TO HIGHEST BIDDER");
          await sendEmail({ email: bidder.email, subject, message });
          console.log("SUCCESSFULLY EMAIL SEND TO HIGHEST BIDDER");
        } else {
          await auction.save();
        }
      } catch (error) {
        console.error(error || "Some error in ended auction cron");
        // continue processing other auctions
      }
    }
  });
};
