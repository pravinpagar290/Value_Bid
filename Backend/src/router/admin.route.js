import express from "express";
import {isAuthenticated, isAuthorized} from "../middlewares/auth.middleware.js";

import {
    deleteActionItem,
    getAllAuctionItems,
    getAllPaymentProofs,
    getPaymentDetail,
    updatePaymentStatus,
    deletePaymentProof,
    fetchAllUsers,
    monthlyRevenue,
} from "../controllers/admin.controller.js";

const router = express.Router();

router.delete(
    "/auction_item/delete/:id",
    isAuthenticated,
    isAuthorized("admin"),
    deleteActionItem
);

router.get(
    "/payment_proofs/getall",
    isAuthenticated,
    isAuthorized("admin"),
    getAllPaymentProofs 
)

router.get(
    "/payment_proof/:id",
    isAuthenticated,
    isAuthorized("admin"),
    getPaymentDetail
)

router.put(
    "/payment_proof/status/update/:id",
    isAuthenticated,
    isAuthorized("admin"),
    updatePaymentStatus
)

router.delete(
    "/payment_proof/delete/:id",
    isAuthenticated,
    isAuthorized("admin"),
    deletePaymentProof
);

router.get(
    "/auction_items/getall",
    isAuthenticated,
    isAuthorized("admin"),
    getAllAuctionItems
);

router.get(
    "/users/getall",
    isAuthenticated,
    isAuthorized("admin"),
    fetchAllUsers
)

router.get(
    "/monthly_revenue",
    isAuthenticated,
    isAuthorized("admin"),
    monthlyRevenue
)