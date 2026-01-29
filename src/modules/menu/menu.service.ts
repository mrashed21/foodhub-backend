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
  page,
  limit,
  skip,
}: {
  search: string | undefined;
  page: number;
  limit: number;
  skip: number;
}) => {
  const andConditions: MenuWhereInput[] = [];
  // search string
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search!,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const result = await prisma.menu.findMany({
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

  // totalData
  const totaData = await prisma.menu.count({
    where: {
      AND: andConditions,
    },
  });

  return {
    data: result,
    pagination: {
      totaData,
      page,
      limit,
      totalPage: Math.ceil(totaData / limit),
    },
  };
};

export const menuService = {
  createMenu,
  getAllMenu,
};
