import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { z } from "zod";

const getPostByIdSchema = z.object({
  id: z.string().uuid(),
});

class postService {
  static async allPosts() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
    prisma.$disconnect();
    posts.slice(0, 50);
    return posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  static async postById(data: unknown) {
    const prisma = new PrismaClient();
    const validatedData = getPostByIdSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { id } = validatedData.data;

    console.log(JSON.stringify(validatedData.data));

    const posts = await prisma.post.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    prisma.$disconnect();

    return posts;
  }
}
export { postService };
