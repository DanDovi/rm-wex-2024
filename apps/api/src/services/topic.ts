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
