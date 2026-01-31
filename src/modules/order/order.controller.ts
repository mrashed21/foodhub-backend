import paginationFuction from "@/helper/pagination-function";
import { NextFunction, Request, Response } from "express";
import { orderService } from "./order.service";

//! create order

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const { phone, address, items } = req.body;

  if (!phone || !address) {
    return res.status(400).json({
      success: false,
      message: "Phone and address are required",
    });
  }

  if (!items?.length) {
    return res.status(400).json({
      success: false,
      message: "Order items are required",
    });
  }

  try {
    const result = await orderService.createOrder(user.id, req.body);

    res.status(201).json({
      success: true,
      message: "Order placed successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//! customer orders

const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user;

  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const { search } = req.query;
    const searchTerm = typeof search === "string" ? search : undefined;

    const { page, limit, skip } = paginationFuction(req.query);

    const params = {
      page,
      limit,
      skip,
      ...(searchTerm ? { search: searchTerm } : {}),
    };

    const result = await orderService.getMyOrders(req.user!.id, params);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//! order details

const getOrderDetails = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await orderService.getOrderDetails(
      req.params.id as string,
      req.user!,
    );

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * provider order list
 */

const getOrdersForProvider = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const { search, status } = req.query;

    const searchTerm = typeof search === "string" ? search : undefined;

    const statusTerm = typeof status === "string" ? status : undefined;

    const { page, limit, skip } = paginationFuction(req.query);

    const params: {
      page: number;
      limit: number;
      skip: number;
      search?: string;
      status?: string;
    } = {
      page,
      limit,
      skip,
    };

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (statusTerm) {
      params.status = statusTerm;
    }

    const result = await orderService.getOrdersForProvider(user, params);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

//! update / cancel order

const updateOrderStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user;
  if (!user) {
    return res.status(500).json({
      success: false,
      message: "Unauthorized",
    });
  }
  try {
    const result = await orderService.updateOrderStatus(req.body, user!);

    res.status(200).json({
      success: true,
      message: "Order updated",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// ! get all order for admin
const getAllOrdersForAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = await orderService.getAllOrdersForAdmin();
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const orderController = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getOrdersForProvider,
  updateOrderStatus,
  getAllOrdersForAdmin,
};
