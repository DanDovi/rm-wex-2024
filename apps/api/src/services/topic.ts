import { PrismaClient } from "@prisma/client";

class topicService {
  static async allTopics() {
    const prisma = new PrismaClient();
    const topics = await prisma.topic.findMany();
    prisma.$disconnect();
    return topics;
  }
}

export { topicService };
