import { PrismaClient } from "@prisma/client";
import { PrismaClientRustPanicError } from "@prisma/client/runtime/library";
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
        prisma.vote.delete({
          where: existingVote,
        });
      } else {
        prisma.vote.update({
          data: {
            vote: value,
          },
          where: {
            id: existingVote.id,
            updatedAt: isoDate,
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
}

export { commentService };
