import { prisma } from "@/lib/prisma";
import { Menu } from "@generated/prisma/client";
import { MenuWhereInput } from "@generated/prisma/models";

//! create menu
const createMenu = async (
  data: Omit<Menu, "id" | "createdAt" | "updatedAt" | "providerId">,
  providerId: string,
) => {
  console.log(data);
  console.log(providerId);
  return prisma.menu.create({
    data: {
      ...data,
      providerId,
    },
  });
};

// ! get all menu

const getAllMenu = async ({
  search,
  categoryId,
  priceSort,
  page,
  limit,
  skip,
}: {
  search: string | undefined;
  categoryId: string | undefined;
  priceSort: string | undefined;
  page: number;
  limit: number;
  skip: number;
}) => {
  const andConditions: MenuWhereInput[] = [];

  if (search) {
    andConditions.push({
      name: {
        contains: search,
        mode: "insensitive",
      },
    });
  }

  if (categoryId) {
    andConditions.push({
      categoryId,
    });
  }

  let orderBy: any = { createdAt: "desc" };

  if (priceSort === "low_to_high") {
    orderBy = { price: "asc" };
  }

  if (priceSort === "high_to_low") {
    orderBy = { price: "desc" };
  }

  const data = await prisma.menu.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    orderBy,
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      cuisine: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
      provider: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              providerName: true,
            },
          },
        },
      },
    },
  });

  const totalData = await prisma.menu.count({
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

// ! get menu by provider (with pagination + search)
const getMenuByProvider = async ({
  providerId,
  search,
  page,
  limit,
  skip,
}: {
  providerId: string;
  search: string | undefined;
  page: number;
  limit: number;
  skip: number;
}) => {
  const andConditions: MenuWhereInput[] = [];

  andConditions.push({
    providerId,
  });

  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const data = await prisma.menu.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      image: true,
      cuisine: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      category: {
        select: {
          id: true,
          name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const totalData = await prisma.menu.count({
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

// ! update menu (only owner provider)
const updateMenu = async (
  data: Partial<Menu> & { id: string },
  providerId: string,
) => {
  const { id, providerId: _, createdAt, updatedAt, ...updateData } = data;

  const menu = await prisma.menu.findFirst({
    where: {
      id,
      providerId,
    },
  });

  if (!menu) {
    throw new Error("Menu not found or you are not authorized to update");
  }

  return prisma.menu.update({
    where: { id },
    data: updateData,
  });
};

// ! delete menu (only owner provider)
const deleteMenu = async (data: { id: string }, providerId: string) => {
  const { id } = data;

  const menu = await prisma.menu.findFirst({
    where: {
      id,
      providerId,
    },
  });

  if (!menu) {
    throw new Error("Menu not found or you are not authorized to delete");
  }

  return prisma.menu.delete({
    where: { id },
  });
};

export const menuService = {
  createMenu,
  getAllMenu,
  getMenuByProvider,
  updateMenu,
  deleteMenu,
};
