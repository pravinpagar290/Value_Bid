import express from "express";
import {
    createAuction,
    getAllAuctionItems,
    getAuctionItem,
    updateAuctionItem,
    deleteAuctionItem
} from "../controllers/auction.controller.js";

import { isAuthenticated, isAuthorized } from "../middlewares/auth.middleware.js";
import { trackCommissionStatus } from "../middlewares/trackCommission.middleware.js";

const router = express.Router();

rou