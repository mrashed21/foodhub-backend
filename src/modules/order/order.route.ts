import authMiddleWare from "@/middleware/auth-middleware";
import { UserRole } from "@/types/user-role";
import { Router } from "express";
import { orderController } from "./order.controller";

const router = Router();

//! Create order (customer)

router.post(
  "/",
  authMiddleWare(UserRole.customer),
  orderController.createOrder,
);


//!Get logged-in user's orders

router.get("/", authMiddleWare(UserRole.customer), orderController.getMyOrders);

//! Get single order details (customer/provider/admin)

router.get(
  "/:id",
  authMiddleWare(UserRole.customer, UserRole.provider, UserRole.admin),
  orderController.getOrderDetails,
);
//! get all order for admin
router.get('/admin', authMiddleWare(UserRole.admin), orderController.getAllOrdersForAdmin); 

//! Provider orders list (+ search)
router.get(
  "/provider",
  authMiddleWare(UserRole.provider),
  orderController.getOrdersForProvider,
);

//! Update order status / cancel
router.patch(
  "/:id/status",
  authMiddleWare(UserRole.customer, UserRole.provider),
  orderController.updateOrderStatus,
);

export const orderRouter = router;
