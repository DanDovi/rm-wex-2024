import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import createHttpError from "http-errors";
import { v4 } from "uuid";
import { z } from "zod";

import { signAccessToken } from "../utils/jwt";

const registerUserSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(64, "Username must be at most 64 characters"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password must be at most 100 characters"),
});

class authService {
  static async registerUser(data: unknown) {
    const validatedData = registerUserSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { username, password } = validatedData.data;

    const prisma = new PrismaClient();

    const userExists = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (userExists) {
      prisma.$disconnect();
      throw new Error("User already exists");
    }

    const id = v4();

    const user = await prisma.user.create({
      data: {
        id,
        username,
        passwordHash: await bcrypt.hash(password, 10),
      },
    });
    prisma.$disconnect();

    const userWithoutPassword = { ...user, passwordHash: undefined };

    return {
      accessToken: await signAccessToken({ ...userWithoutPassword }),
    };
  }

  static async loginUser(data: unknown) {
    const validatedData = registerUserSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { username, password } = validatedData.data;

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (!user) {
      prisma.$disconnect();
      throw new createHttpError.Unauthorized(
        "Username or password is incorrect",
      );
    }

    const passwordMatches = await bcrypt.compare(password, user.passwordHash);

    if (!passwordMatches) {
      prisma.$disconnect();

      throw new createHttpError.Unauthorized(
        "Username or password is incorrect",
      );
    }

    prisma.$disconnect();

    const userWithoutPassword = { ...user, passwordHash: undefined };

    return {
      accessToken: await signAccessToken({ ...userWithoutPassword }),
    };
  }

  static async allUsers() {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();
    prisma.$disconnect();
    return users.map((user) => ({ ...user, passwordHash: undefined }));
  }
}

export { authService };
