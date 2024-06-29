import { PrismaClient } from "@prisma/client";
import {
  adjectives,
  animals,
  Config,
  uniqueNamesGenerator
} from "unique-names-generator";
import {v4 as uuidv4} from "uuid";

const hashForPassword = '$2a$10$UXUui/8whUqHjj08SMbt/eVwWOpBtdSZqVVs6dzgUQv8u6arVKFZm';

const createUserIfNotExists = async (prisma: PrismaClient, username: string, passwordHash: string) => {
  const existingUser = await prisma.user.findFirst({
    where: {
      username,
    },
  });

  if(!existingUser) {
    await prisma.user.create({
      data: {
        id: uuidv4(),
        username,
        passwordHash,
      },
    });
  }
}

const main = async () => {
  const config: Config = {
    dictionaries: [adjectives, animals],
    separator: '-'
  };

  const usernames = ['testUser', ...Array.from({length: 20}, () => {
    return uniqueNamesGenerator(config);
  })];

  const prisma = new PrismaClient();

  await usernames.forEach(async (username) => {
    await createUserIfNotExists(prisma, username, hashForPassword);
  });

  console.log("seed-db");
};

main();
