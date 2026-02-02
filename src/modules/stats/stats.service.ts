import { prisma } from "@/lib/prisma";
import { UserRole } from "@/types/user-role";

const getStats = async () => {
  return {
    totalUsers: await prisma.user.count(),
    totalProviders: await prisma.user.count({
      where: { role: UserRole.provider },
    }),
    totalCustomers: await prisma.user.count({
      where: { role: UserRole.customer },
    }),
    totalOrders: await prisma.order.count(),
    totalPendingOrders: await prisma.order.count({
      where: { status: "placed" },
    }),
    totalCompletedOrders: await prisma.order.count({
      where: { status: "delivered" },
    }),
    totalCancelledOrders: await prisma.order.count({
      where: { status: "cancelled" },
    }),
    totalDeliveredOrders: await prisma.order.count({
      where: { status: "delivered" },
    }),
    totalMenus: await prisma.menu.count(),
    totalCategories: await prisma.category.count(),
    totalReviews: await prisma.review.count(),
  };
};

const getStatsForProvider = async (providerId: string) => {
  return {
    totalOrders: await prisma.order.count({
      where: { providerId },
    }),
    totalPendingOrders: await prisma.order.count({
      where: { status: "placed", providerId },
    }),
    totalCompletedOrders: await prisma.order.count({
      where: { status: "delivered", providerId },
    }),
    totalCancelledOrders: await prisma.order.count({
      where: { status: "cancelled", providerId },
    }),
    totalDeliveredOrders: await prisma.order.count({
      where: { status: "delivered", providerId },
    }),
    totalMenus: await prisma.menu.count({
      where: { providerId },
    }),
  };
};

export const statsService = {
  getStats,
  getStatsForProvider,
};
