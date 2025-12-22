import { User } from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import ErrorHandler from "../middlewares/error.js";

export const trackCommissionStatus = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (user.unpaidCommission > 0) {
    return next(
      new ErrorHandler(
        "You have unpaid commissions. Please pay them before posting a new auction.",
        403
      )
    );
  }
  next();
});
