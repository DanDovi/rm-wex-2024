import { PrismaClient } from "@prisma/client";
import { formatISO } from "date-fns";

const hashForPassword =
  "$2a$10$UXUui/8whUqHjj08SMbt/eVwWOpBtdSZqVVs6dzgUQv8u6arVKFZm";

interface IUser {
  id: string;
  username: string;
  passwordHash: string;
}

interface ITopic {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface IPost {
  id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  topicId: string;
}

interface IComment {
  id: string;
  content: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
  postId: string;
  parentCommentId?: string;
}

const createUserIfNotExists = async (prisma: PrismaClient, user: IUser) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username: user.username,
    },
  });

  if (!existingUser) {
    await prisma.user.create({
      data: user,
    });
  }
};

const createTopicIfNotExists = async (prisma: PrismaClient, topic: ITopic) => {
  const existingTopic = await prisma.topic.findFirst({
    where: {
      id: topic.id,
      OR: [
        {
          title: topic.title,
        },
      ],
    },
  });

  if (!existingTopic) {
    await prisma.topic.create({
      data: topic,
    });
  }
};

const createPostIfNotExists = async (prisma: PrismaClient, post: IPost) => {
  const existingPost = await prisma.post.findFirst({
    where: {
      id: post.id,
    },
  });

  if (!existingPost) {
    await prisma.post.create({
      data: post,
    });
  }
};

const createCommentIfNotExists = async (
  prisma: PrismaClient,
  comment: IComment
) => {
  const existingComment = await prisma.comment.findFirst({
    where: {
      id: comment.id,
    },
  });

  if (!existingComment) {
    await prisma.comment.create({
      data: comment,
    });
  }
};

const main = async () => {
  const prisma = new PrismaClient();

  const testUser: IUser = {
    id: "1a2a4afe-87bb-4719-a430-cbf7b5529328",
    username: "testUser",
    passwordHash: hashForPassword,
  };

  const testUser2: IUser = {
    id: "538fa2f7-1bb5-46b3-97e0-fa82601d2de1",
    username: "testUser2",
    passwordHash: hashForPassword,
  };

  const testUser3: IUser = {
    id: "617f9697-806e-45b7-95bc-a7f7bed7238d",
    username: "testUser3",
    passwordHash: hashForPassword,
  };

  const testUser4: IUser = {
    id: "e7d5338f-4e11-46db-9a01-f9501e26ea93",
    username: "testUser4",
    passwordHash: hashForPassword,
  };

  console.log("Inserting users...");
  for (const user of [testUser, testUser2, testUser3, testUser4]) {
    await createUserIfNotExists(prisma, user);
  }

  const currentDate = formatISO(new Date());

  const topic1: ITopic = {
    id: "bd526e65-768b-469d-9b15-855f3ad6988d",
    title: "First topic",
    createdBy: testUser.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    description: "This is the first topic",
  };

  const topic2: ITopic = {
    id: "9b4301c9-e0a7-42df-ae7a-e4740f461378",
    title: "Second topic",
    createdBy: testUser2.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    description: "This is the second topic",
  };

  console.log("Inserting topics...");
  for (const topic of [topic1, topic2]) {
    await createTopicIfNotExists(prisma, topic);
  }

  const post1: IPost = {
    id: "7f994fa5-811a-49af-94d7-95f995d708ed",
    title: "First post",
    content: "This is the first post",
    createdBy: testUser.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    topicId: topic1.id,
  };

  const post2: IPost = {
    id: "839bf9b2-3d5f-411f-944b-6544cf297c91",
    title: "Second post",
    content: "This is the second post",
    createdBy: testUser2.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    topicId: topic1.id,
  };

  const post3: IPost = {
    id: "c3f3e1f2-2e5e-4c8e-9e1a-8a1c6d8b4d4c",
    title: "Third post",
    content: "This is the third post",
    createdBy: testUser3.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    topicId: topic2.id,
  };

  console.log("Inserting posts...");
  for (const post of [post1, post2, post3]) {
    await createPostIfNotExists(prisma, post);
  }

  const comment1 = {
    id: "eab3756d-05d8-4075-ba37-949ef4257534",
    content: "This is the first comment",
    createdBy: testUser.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    postId: post1.id,
  };

  const comment2 = {
    id: "4ae76c87-9aae-4bc5-82cd-941f1b3288ae",
    content: "This is the second comment",
    createdBy: testUser2.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    postId: post1.id,
  };

  const comment3 = {
    id: "f4e0932f-f624-42d1-93f2-4685505780c8",
    content: "This is the third comment",
    createdBy: testUser3.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    postId: post1.id,
    parentCommentId: comment1.id,
  };

  const comment4 = {
    id: "8890fb5e-e052-4bda-86d8-fe278d2bf482",
    content: "This is the fourth comment",
    createdBy: testUser4.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    postId: post2.id,
  };

  const comment5 = {
    id: "0d7b5934-0d3a-4248-8400-01ee5a504a11",
    content: "This is the fifth comment",
    createdBy: testUser.id,
    createdAt: currentDate,
    updatedAt: currentDate,
    postId: post2.id,
    parentCommentId: comment4.id,
  };

  console.log("Inserting comments...");
  for (const comment of [comment1, comment2, comment3, comment4, comment5]) {
    await createCommentIfNotExists(prisma, comment);
  }

  await prisma.$disconnect();

  console.log("Finished seeding db");
};

main();
