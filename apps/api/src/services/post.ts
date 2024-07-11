import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import createHttpError from "http-errors";
import { formatISO } from 'date-fns'
import { v4 } from "uuid";


const getPostByIdSchema = z.object({
  id: z.string().uuid(),
});

const createPostSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character").max(64, "Username must be at most 64 characters"),
  createdBy: z.string(),
  topicId: z.string().uuid(),
  content: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),})

class postService {
  static async allPosts() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
    prisma.$disconnect();
    posts.slice(0, 50);
    return posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
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
    
    const currentTime = formatISO(new Date());


    const post = await prisma.post.create({
      data: {
        id: v4(),
        title,
        createdBy,
        createdAt: currentTime,
        updatedAt: currentTime,
        topicId,
        content,
        deletedAt: null
      },
    });

    prisma.$disconnect();
    return post
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
