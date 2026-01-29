import { prisma } from "@/lib/prisma";
import { Menu } from "@generated/prisma/client";

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

export const menuService = {
  createMenu,
};
