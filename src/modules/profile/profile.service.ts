import { prisma } from "@/lib/prisma";
import { UserRole } from "@generated/prisma/enums";

const updateMyProfile = async (
  userId: string,
  role: UserRole,
  data: {
    name?: string;
    phone?: string;
    providerName?: string;
    image?: string;
  },
) => {
  const updateData: any = {
    name: data.name,
    phone: data.phone,
    image: data.image,
  };

  if (role === "provider") {
    updateData.providerName = data.providerName;
  }

  return prisma.user.update({
    where: { id: userId },
    data: updateData,
  });
};

export const profileService = { updateMyProfile };
