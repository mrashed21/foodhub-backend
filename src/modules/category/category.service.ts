import { prisma } from "@/lib/prisma";
import { Category } from "@generated/prisma/client";
import { CategoryWhereInput } from "@generated/prisma/models";

// ! create category service
const createCategory = async (
  data: Omit<Category, "id" | "createdAt" | "updatedAt" | "published_by">,
  published_by: string,
) => {
  const existing = await prisma.category.findUnique({
    where: { name: data.name },
  });

  if (existing) {
    throw new Error("Category name already exists");
  }

  return prisma.category.create({
    data: {
      ...data,
      published_by,
    },
  });
};

// ! get all categories
const getAllCategories = async ({
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
  const andConditions: CategoryWhereInput[] = [];
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

        {
          slug: {
            contains: search!,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const result = await prisma.category.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
    },
  });

  // totalData
  const totaData = await prisma.category.count({
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

export const categoryService = {
  createCategory,
  getAllCategories,
};
