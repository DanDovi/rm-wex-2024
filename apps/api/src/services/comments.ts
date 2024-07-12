import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { z } from "zod";

const getCommentById = z.object({
  id: z.string().uuid(),
});

class commentService {
  static async allComments() {
    const prisma = new PrismaClient();
    const comments = await prisma.comment.findMany();
    prisma.$disconnect();
    comments.slice(0, 50);
    return comments.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }

  static async commentById(data: unknown) {
    const prisma = new PrismaClient();
    const validatedData = getCommentById.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { id } = validatedData.data;

    console.log(JSON.stringify(validatedData.data));

    const comments = await prisma.comment.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    prisma.$disconnect();

    return comments;
  }
}
export { commentService };
