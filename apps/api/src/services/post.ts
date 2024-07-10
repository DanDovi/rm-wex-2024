import { PrismaClient } from "@prisma/client";

class postService {
  static async allPosts() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
    prisma.$disconnect();
    return posts;
  }
}
export { postService };
