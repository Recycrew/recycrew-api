import { PrismaClient } from "@prisma/client";

class PrismaService {
  constructor(private prismaClient: PrismaClient) {}

  handler() {
    return this.prismaClient;
  }
}

export const prismaService = new PrismaService(new PrismaClient());
