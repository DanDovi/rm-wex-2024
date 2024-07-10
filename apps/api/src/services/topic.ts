import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import createHttpError from "http-errors";
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { v4 } from "uuid";

const createPostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(64, "Username must be at most 64 characters"),
  createdBy: z.string(),
  topicId: z.string(),
  content: z
    .string()
    .min(8, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),
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

    // const date = new Date().getDate();
    const { createdAt } = require("date-fns")
    const { updatedAt } = require("date-fns")

    const id = v4();

    const post = await prisma.post.create({
      data: {
        id,
        title,
        createdBy,
        createdAt,
        updatedAt,
        topicId,
        content,
      },
    });

    prisma.$disconnect();
    return post
}
}

export { topicService };
