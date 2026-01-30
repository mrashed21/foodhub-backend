import { prisma } from "@/lib/prisma";
import { OrderStatus, UserRole } from "@generated/prisma/client";

type OrderPayloadItem = {
  menuId: string;
  providerId: string;
  quantity: number;
  price: number;
};

const generateInvoice = () => {
  const date = new Date().toISOString().slice(0, 10).replace(/-/g, "");

  const random = Math.random().toString(36).substring(2, 8).toUpperCase();

  return `ORD-${date}-${random}`;
};

//! CREATE ORDER (CUSTOMER)
const createOrder = async (
  userId: string,
  payload: {
    phone: string;
    address: string;
    items: OrderPayloadItem[];
  },
) => {
  const { items, phone, address } = payload;

  if (!items?.length) {
    throw new Error("Order items are required");
  }
  const menus = await prisma.menu.findMany({
    where: {
      id: { in: items.map((i) => i.menuId) },
    },
    select: {
      id: true,
      providerId: true,
    },
  });

  if (menus.length !== items.length) {
    throw new Error("Invalid menu detected");
  }

  const menuProviderMap = new Map(menus.map((m) => [m.id, m.providerId]));

  const providerMap = new Map<
    string,
    (OrderPayloadItem & { providerId: string })[]
  >();

  for (const item of items) {
    const providerId = menuProviderMap.get(item.menuId);
    if (!providerId) {
      throw new Error(`Provider not found for menuId: ${item.menuId}`);
    }

    if (!providerMap.has(providerId)) {
      providerMap.set(providerId, []);
    }

    providerMap.get(providerId)!.push({ ...item, providerId });
  }

  const createdOrders = [];

  for (const [providerId, providerItems] of providerMap.entries()) {
    const totalAmount = providerItems.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0,
    );

    const order = await prisma.order.create({
      data: {
        invoice: generateInvoice(),
        phone,
        address,
        totalAmount,
        status: OrderStatus.placed,

        user: {
          connect: { id: userId },
        },

        provider: {
          connect: { id: providerId },
        },

        orderItems: {
          create: providerItems.map((item) => ({
            menuId: item.menuId,
            quantity: item.quantity,
            price: item.price,
          })),
        },
      },
      include: {
        orderItems: true,
      },
    });

    createdOrders.push(order);
  }

  return createdOrders;
};

//!  CUSTOMER ORDERS
const getMyOrders = async (
  userId: string,
  {
    search,
    page,
    limit,
    skip,
  }: {
    search?: string;
    page: number;
    limit: number;
    skip: number;
  },
) => {
  const andConditions: any[] = [{ userId }];

  if (search) {
    andConditions.push({
      OR: [
        { phone: { contains: search, mode: "insensitive" } },
        { address: { contains: search, mode: "insensitive" } },
        { invoice: { contains: search, mode: "insensitive" } },
      ],
    });
  }

  const data = await prisma.order.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      phone: true,
      address: true,
      invoice: true,
      totalAmount: true,
      status: true,
      createdAt: true,

      provider: {
        select: {
          id: true,
          user: {
            select: {
              providerName: true,
            },
          },
        },
      },

      orderItems: {
        select: {
          id: true,
          quantity: true,
          price: true,
          menu: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
        },
      },
    },
  });

  const totalData = await prisma.order.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data,
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit),
    },
  };
};

//!ORDER DETAILS (ALL ROLES)

const getOrderDetails = async (orderId: string, user: any) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      orderItems: {
        include: { menu: true },
      },
      provider: {
        include: { user: true },
      },
      user: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (user.role === UserRole.customer && order.userId !== user.id) {
    throw new Error("Unauthorized access");
  }

  if (user.role === UserRole.provider && order.providerId !== user.providerId) {
    throw new Error("Unauthorized access");
  }

  return order;
};

/* =========================
   PROVIDER ORDERS + SEARCH
========================= */

const getOrdersForProvider = async (user: any, query: any) => {
  const provider = await prisma.provider.findUnique({
    where: { userId: user.id },
  });

  if (!provider) {
    throw new Error("Provider not found");
  }

  const { search } = query;

  return prisma.order.findMany({
    where: {
      providerId: provider.id,
      ...(search && {
        OR: [
          { id: { contains: search } },
          { status: search as OrderStatus },
          {
            user: {
              name: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
          {
            user: {
              email: {
                contains: search,
                mode: "insensitive",
              },
            },
          },
        ],
      }),
    },
    include: {
      user: true,
      orderItems: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

/* =========================
   UPDATE / CANCEL ORDER
========================= */

const updateOrderStatus = async (
  orderId: string,
  status: OrderStatus,
  user: any,
) => {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // customer cancel rule
  if (user.role === UserRole.customer) {
    if (order.userId !== user.id) {
      throw new Error("Unauthorized");
    }

    if (order.status !== OrderStatus.placed) {
      throw new Error("Order can no longer be cancelled");
    }

    if (status !== OrderStatus.cancelled) {
      throw new Error("Invalid action");
    }
  }

  // provider rule
  if (user.role === UserRole.provider) {
    if (order.providerId !== user.providerId) {
      throw new Error("Unauthorized");
    }
  }

  return prisma.order.update({
    where: { id: orderId },
    data: { status },
  });
};

// get all order dfor admin
const getAllOrdersForAdmin = async () => {
  return prisma.order.findMany({
    include: {
      orderItems: {
        include: { menu: true },
      },
      provider: {
        include: { user: true },
      },
      user: true,
    },
    orderBy: { createdAt: "desc" },
  });
};

export const orderService = {
  createOrder,
  getMyOrders,
  getOrderDetails,
  getOrdersForProvider,
  getAllOrdersForAdmin,
  updateOrderStatus,
};
