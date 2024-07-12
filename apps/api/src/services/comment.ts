import { PrismaClient } from "@prisma/client";
import { formatISO } from "date-fns";
import createHttpError from "http-errors";
import { v4 } from "uuid";
import { z } from "zod";

const updateCommentVoteSchema = z.object({
  userId: z.string().uuid(),
  commentId: z.string().uuid(),
  postId: z.string().uuid(),
  value: z.number(),
});

const getCommentById = z.object({
  id: z.string().uuid(),
});

class commentService {
  static async updateCommentVote(data: unknown) {
    const validatedData = updateCommentVoteSchema.safeParse(data);

    console.log(data, null, 2);

    if (!validatedData.success) {
      throw new createHttpError.BadRequest(
        validatedData.error.errors[0].message,
      );
    }

    const { commentId, userId, postId, value } = validatedData.data;

    const prisma = new PrismaClient();
    const isoDate = formatISO(new Date());

    const existingVote = await prisma.vote.findFirst({
      where: {
        commentId: commentId,
        userId: userId,
        postId: postId,
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
            commentId: commentId,
            userId: userId,
            createdAt: isoDate,
            updatedAt: isoDate,
          },
        });
      }

      prisma.$disconnect();
    }
  }

  static async allComments() {
    const prisma = new PrismaClient();
    const comments = await prisma.comment.findMany();
    prisma.$disconnect();
    comments.slice(0, 50);
    return comments.sort(
      (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
    );
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
