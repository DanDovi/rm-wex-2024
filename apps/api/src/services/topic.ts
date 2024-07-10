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
    console.log("p 1");

    if (!validatedData.success) {
      console.log("error 1");
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }
    console.log("p 2");
    const { id } = validatedData.data;

    console.log(JSON.stringify(validatedData.data));

    const topics = await prisma.topic.findMany({
      where: {
        id: {
          equals: id,
        },
      },
    });
    console.log(JSON.stringify(topics));
    prisma.$disconnect();
    console.log("p 3");
    return topics;
  }
}

export { topicService };
