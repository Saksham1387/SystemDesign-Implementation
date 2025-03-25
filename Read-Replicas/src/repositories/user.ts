import { PrismaClient } from "@prisma/client";
import { User } from "../user.model";
import { BaseRepository } from "./base";
import { primaryPrisma, replicaPrismas } from "../config/db";

export class UserRepository extends BaseRepository<User> {
  private primaryClient: PrismaClient;

  constructor() {
    super(replicaPrismas);
    this.primaryClient = primaryPrisma;
  }

  async findById(id: number) {
    const readClient = this.getReadReplica();
    return await readClient.user.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findMany(take: number = 10, skip: number = 0): Promise<User[]> {
    const readClient = this.getReadReplica();
    return readClient.user.findMany({
      take,
      skip,
    });
  }

  async create(data: Omit<User, "id" | "createdAt">): Promise<User> {
    return this.primaryClient.user.create({
      data: {
        ...data,
        createdAt: new Date(),
      },
    });
  }

  async update(id: number, data: Partial<User>): Promise<User> {
    return this.primaryClient.user.update({
      where: { id },
      data,
    });
  }

  async delete(id: number): Promise<User> {
    return this.primaryClient.user.delete({
      where: { id },
    });
  }
}
