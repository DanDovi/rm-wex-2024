import { PrismaClient } from "@prisma/client";
import { formatISO } from "date-fns";
import createHttpError from "http-errors";
import { v4 } from "uuid";
import { z } from "zod";

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(64, "Username must be at most 64 characters"),
  createdBy: z.string(),
  topicId: z.string(),
  content: z
    .string()
    .min(8, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),
});

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
  static async createPost(data: unknown) {
    const validatedData = createPostSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }
    const { title, createdBy, topicId, content } = validatedData.data;

    const prisma = new PrismaClient();

    const isoDate = formatISO(new Date());

    const id = v4();

    const post = await prisma.post.create({
      data: {
        id,
        title,
        createdBy,
        createdAt: isoDate,
        updatedAt: isoDate,
        topicId,
        content,
      },
    });

    prisma.$disconnect();
    return post;
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
