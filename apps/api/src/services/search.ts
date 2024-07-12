import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import createHttpError from "http-errors";
import { formatISO } from 'date-fns'
import { v4 } from "uuid";

const searchPostsSchema = z.object({
    searchTerm: z.string()
});


class searchService{
    static async searchPosts(data: unknown) {
        const prisma = new PrismaClient();
        const validatedData = searchPostsSchema.safeParse(data);
    
        if (!validatedData.success) {
          throw new createHttpError.BadRequest(
            validatedData.error.errors[0].message,
          );
        }
    
        const { searchTerm } = validatedData.data;
        
        
        const posts = await prisma.post.findMany({
            where: {
                OR: [
                    {
                        title: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    },
                    {
                        content: {
                            contains: searchTerm,
                            mode: 'insensitive'
                        }
                    }]
            }
            })
        prisma.$disconnect();
        return posts
    } 
      
}

export { searchService };