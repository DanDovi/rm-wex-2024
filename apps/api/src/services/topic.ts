import { PrismaClient } from "@prisma/client";
import { formatISO } from "date-fns";
import createHttpError from "http-errors";
import { v4 } from "uuid";
import { z } from "zod";



const getTopicByIdRequestSchema = z.object({
  id: z.string().uuid(),
});

const getPostsByTopicIdSchema = z.object({
  topicId: z.string().uuid(),
})

class topicService {
  static async allTopics() {
    const prisma = new PrismaClient();
    const topics = await prisma.topic.findMany();
    prisma.$disconnect();
    return topics;
  }

  static async topicById(data: unknown) {
    const prisma = new PrismaClient();
    const validatedData = getTopicByIdRequestSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { id } = validatedData.data;

    console.log(JSON.stringify(validatedData.data));

    const topics = await prisma.topic.findFirst({
      where: {
        id: {
          equals: id,
        },
      },
    });
    console.log(JSON.stringify(topics));
    prisma.$disconnect();

    return topics;
  }
  static async postsByTopicId(data: unknown) { //THIS IS THE ONE YOU'RE IN THE MIDDLE OF EDITING
    const prisma = new PrismaClient();
    const validatedData = getPostsByTopicIdSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { topicId } = validatedData.data;

    console.log(JSON.stringify(validatedData.data));

    const posts = await prisma.post.findMany({
      where: {
        topicId: {
          equals: topicId,
        },
      },
    });
    prisma.$disconnect();
    return posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export { topicService };
