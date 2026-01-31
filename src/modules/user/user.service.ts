import { prisma } from "@/lib/prisma";
import { UserStatus } from "@/types/user-role";
import { UserRole } from "@generated/prisma/enums";
import { UserWhereInput } from "@generated/prisma/models";

// ! get all users (role dynamic) + providerId for providers
const getAllUsers = async ({
  search,
  page,
  limit,
  skip,
  role,
}: {
  search?: string;
  page: number;
  limit: number;
  skip: number;
  role: UserRole;
}) => {
  const andConditions: UserWhereInput[] = [];

  //  search
  if (search) {
    andConditions.push({
      OR: [
        {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: search,
            mode: "insensitive",
          },
        },
      ],
    });
  }

  const users = await prisma.user.findMany({
    take: limit,
    skip,
    where: {
      AND: andConditions,
      role,
    },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      status: true,
      providerName: true,
      role: true,
      createdAt: true,
      updatedAt: true,

      provider: {
        select: {
          id: true,
        },
      },
    },
  });

  const totalData = await prisma.user.count({
    where: {
      role,
      AND: andConditions,
    },
  });

  return {
    data: users.map((user) => ({
      ...user,
      providerId: user.provider?.id ?? null,
      provider: undefined,
    })),
    pagination: {
      totalData,
      page,
      limit,
      totalPage: Math.ceil(totalData / limit),
    },
  };
};

// ! update user status service
const updateUserStatus = async (id: string, data: { status: UserStatus }) => {
  return prisma.user.update({
    where: { id },
    data: {
      status: data.status,
    },
  });
};

export const userService = {
  getAllUsers,
  updateUserStatus,
};
