import { PrismaClient } from "@prisma/client";

class postService {
  static async allPosts() {
    const prisma = new PrismaClient();
    const posts = await prisma.post.findMany();
    prisma.$disconnect();
    posts.slice(0, 50);
    return posts.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
  }
}
export { postService };
