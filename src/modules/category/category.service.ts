import { prisma } from "@/lib/prisma";
import { Category } from "@generated/prisma/client";

// ! create category service
const createCategory = async (
  data: Omit<Category, "id" | "createdAt" | "updatedAt" | "published_by">,
  published_by: string,
) => {
  const result = await prisma.category.create({
    data: {
      ...data,
      published_by,
    },
  });
  return result;
};

export const categoryService = {
  createCategory,
};
