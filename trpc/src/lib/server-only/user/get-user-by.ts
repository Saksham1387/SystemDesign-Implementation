import { prisma } from "@/db/db";

export interface GetUserByIdOptions {
  id: string;
}

export const getUseById = async ({ id }: GetUserByIdOptions) => {
  return await prisma.user.findFirst({
    where: {
      id,
    },
  });
};
