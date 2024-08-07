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
});

const createTopicSchema = z.object({
  title: z
    .string()
    .min(1, "Title must be at least 1 character")
    .max(64, "Title must be at most 64 characters"),
  createdBy: z.string().uuid(),
  description: z
    .string()
    .min(1, "Description must be at least 1 character")
    .max(255, "Description must be at most 255 characters"),
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
    prisma.$disconnect();

    return topics;
  }
  static async postsByTopicId(data: unknown) {
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
      include: {
        topic: true,
        user: true,
      },
      where: {
        topicId: {
          equals: topicId,
        },
      },
    });

    const postsWithVotes = await Promise.all(
      posts.map(async (post) => {
        const postVotes = await prisma.vote.aggregate({
          _sum: {
            vote: true,
          },
          where: {
            postId: post.id,
            commentId: null,
          },
        });
        const amountOfVotes = postVotes._sum;
        return { ...post, postVote: amountOfVotes };
      }),
    );

    if (posts.length === 0) {
      //If no posts found, send error
      throw new createHttpError.NotFound("No posts found for that topicId");
    }

    prisma.$disconnect();
    const postSorted = postsWithVotes.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
    return postSorted;
  }

  static async createTopic(data: unknown) {
    const validatedData = createTopicSchema.safeParse(data);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }
    const { title, createdBy, description } = validatedData.data;

    const prisma = new PrismaClient();
    const currentTime = formatISO(new Date());

    const topic = await prisma.topic.create({
      data: {
        id: v4(),
        title,
        description,
        createdBy,
        createdAt: currentTime,
        updatedAt: currentTime,
      },
    });

    prisma.$disconnect();
    return topic;
  }
}

export { topicService };
