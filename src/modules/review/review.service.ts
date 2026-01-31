import { prisma } from "@/lib/prisma";

//! create review
const createReview = async (
  data: {
    orderId: string;
    menuId: string;
    rating: number;
    comment?: string;
  },
  userId: string,
) => {
  const { orderId, menuId, rating, comment } = data;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        select: { menuId: true },
      },
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (order.userId !== userId) {
    throw new Error("Unauthorized order access");
  }

  if (order.status !== "delivered") {
    throw new Error("Order is not delivered yet");
  }

  const isMenuInOrder = order.orderItems.some((item) => item.menuId === menuId);

  if (!isMenuInOrder) {
    throw new Error("Menu does not belong to this order");
  }

  const alreadyReviewed = await prisma.review.findFirst({
    where: {
      userId,
      menuId,
      orderId,
    },
  });

  if (alreadyReviewed) {
    throw new Error("Review already exists");
  }

  return prisma.review.create({
    data: {
      userId,
      menuId,
      orderId,
      rating,
      ...(comment !== undefined && { comment }),
    },
  });
};

// ! get review for home
const getReviewForHome = async () => {
  return prisma.review.findMany({
    where: {
      rating: {
        gte: 4,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      menu: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};

// ! get all review for admin
const getAllReviewsForAdmin = async () => {
  return prisma.review.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      menu: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};

// ! get review for user
const getReviewForUser = async (userId: string) => {
  return prisma.review.findMany({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      menu: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};

// ! get review for provider
const getReviewForProvider = async (providerId: string) => {
  return prisma.review.findMany({
    where: {
      menu: {
        providerId,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      menu: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
};
export const reviewService = {
  createReview,
  getReviewForHome,
  getAllReviewsForAdmin,
  getReviewForUser,
  getReviewForProvider,
};
