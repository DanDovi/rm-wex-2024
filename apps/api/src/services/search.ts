import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { z } from "zod";

const searchPostsSchema = z.object({
  searchTerm: z.string(),
});

class searchService {
  static async searchPosts(data: unknown) {
    const prisma = new PrismaClient();
    const validatedData = searchPostsSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { searchTerm } = validatedData.data;

    const posts = await prisma.post.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            content: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    prisma.$disconnect();
    return posts;
  }
}

export { searchService };
