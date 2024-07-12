import { PrismaClient } from "@prisma/client";
import { formatISO } from "date-fns";
import createHttpError from "http-errors";
import { v4 } from "uuid";
import { z } from "zod";

const getPostByIdSchema = z.object({
  id: z.string().uuid(),
});

const updatePostVoteSchema = z.object({
  userId: z.string().uuid(),
  postId: z.string().uuid(),
  value: z.number(),
});

const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(64, "Username must be at most 64 characters"),
  createdBy: z.string(),
  topicId: z.string().uuid(),
  content: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),
});

const newCommentSchema = z.object({
  createdBy: z.string(),
  postId: z.string().uuid(),
  parentCommentId: z.string().uuid().nullable(),
  content: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),
});

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
        deletedAt: null,
      },
    });

    prisma.$disconnect();
    return post;
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
  static async newComment(data: unknown) {
    const validatedData = newCommentSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }
    const { createdBy, postId, parentCommentId, content } = validatedData.data;

    const prisma = new PrismaClient();

    const currentTime = formatISO(new Date());

    const post = await prisma.comment.create({
      data: {
        id: v4(),
        content,
        createdBy,
        createdAt: currentTime,
        updatedAt: currentTime,
        postId,
        parentCommentId,
        deletedAt: null,
      },
    });

    prisma.$disconnect();
    return post;
    return post;
  }

  static async updatePostVote(data: unknown) {
    const validatedData = updatePostVoteSchema.safeParse(data);

    console.log(data, null, 2);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { userId, postId, value } = validatedData.data;

    const prisma = new PrismaClient();
    const isoDate = formatISO(new Date());

    const existingVote = await prisma.vote.findFirst({
      where: {
        postId: postId,
        userId: userId,
      },
    });
    if (existingVote) {
      if (value === 0) {
        await prisma.vote.delete({
          where: {
            id: existingVote.id,
          },
        });
      } else {
        await prisma.vote.update({
          data: {
            vote: value,
            updatedAt: isoDate,
          },
          where: {
            id: existingVote.id,
          },
        });
      }
    } else {
      if (value === 0) {
        throw new createHttpError.BadRequest("Vote does not exist");
      } else {
        const id = v4();
        await prisma.vote.create({
          data: {
            id: id,
            postId: postId,
            vote: value,
            userId: userId,
            createdAt: isoDate,
            updatedAt: isoDate,
          },
        });
      }

      prisma.$disconnect();
    }
  }
}
export { postService };
