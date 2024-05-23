// lib/data.ts
import { prisma } from "@/lib/prisma";

export const createUser = async (data: { name: string; phone: string; email: string; password: string }) => {
  return prisma.user.create({
    data,
  });
};
