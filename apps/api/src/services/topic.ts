import { PrismaClient } from "@prisma/client";
import createHttpError from "http-errors";
import { z } from "zod";

const getTopicByIdRequestSchema = z.object({
  id: z.string().uuid(),
});

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

  static async postsBytopicId(data: unknown) {
    const prisma = new PrismaClient();
    const validatedData = getTopicByIdRequestSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { id } = validatedData.data;

    console.log(JSON.stringify(validatedData.data));

    const posts = await prisma.post.findMany({
      where: {
        id: {
          equals: id,
        },
      },
    });
    prisma.$disconnect();
    return posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}

export { topicService };
