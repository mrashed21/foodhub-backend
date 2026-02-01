import { prisma } from "@/lib/prisma";

const getProviderForHome = async () => {
  return prisma.provider.findMany({
    select: {
      id: true,
      createdAt: true,
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          providerName: true,
        },
      },
      _count: {
        select: {
          menus: true,
        },
      },
    },
  });
};

const getSingleProvider = async (id: string) => {
  return prisma.provider.findUnique({
    where: {
      id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
          providerName: true,
        },
      },
      menus: true,
    },
  });
};

export const providerService = {
  getProviderForHome,
  getSingleProvider,
};
