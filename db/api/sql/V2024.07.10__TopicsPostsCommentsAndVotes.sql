BEGIN;
    CREATE TABLE wex."topic" (
                                    "id" uuid PRIMARY KEY NOT NULL UNIQUE,
                                    "title" varchar(64) NOT NULL UNIQUE,
                                    "description" varchar(255) NOT NULL,
                                    "createdBy" uuid NOT NULL REFERENCES wex."user"("id"),
                                    "createdAt" timestamp NOT NULL,
                                    "updatedAt" timestamp NOT NULL
    );

    CREATE TABLE wex."post" (
                                    "id" uuid PRIMARY KEY NOT NULL UNIQUE,
                                    "title" varchar(255) NOT NULL,
                                    "content" text NOT NULL,
                                    "topicId" uuid NOT NULL REFERENCES wex."topic"("id"),
                                    "createdBy" uuid NOT NULL REFERENCES wex."user"("id"),
                                    "createdAt" timestamp NOT NULL,
                                    "updatedAt" timestamp NOT NULL,
                                    "deletedAt" timestamp                 
    );

    CREATE TABLE wex."comment" (
                                    "id" uuid PRIMARY KEY NOT NULL UNIQUE,
                                    "content" text NOT NULL,
                                    "postId" uuid NOT NULL REFERENCES wex."post"("id"),
                                    "parentCommentId" uuid REFERENCES wex."comment"("id"),
                                    "createdBy" uuid NOT NULL REFERENCES wex."user"("id"),  
                                    "createdAt" timestamp NOT NULL,
                                    "updatedAt" timestamp NOT NULL,
                                    "deletedAt" timestamp
    );

    CREATE TABLE wex."vote" (
                                    "id" uuid PRIMARY KEY NOT NULL UNIQUE,
                                    "postId" uuid NOT NULL REFERENCES wex."post"("id"),
                                    "commentId" uuid REFERENCES wex."comment"("id"),
                                    "userId" uuid NOT NULL REFERENCES wex."user"("id"),
                                    "vote" smallint NOT NULL,
                                    "createdAt" timestamp NOT NULL,
                                    "updatedAt" timestamp NOT NULL,
                                    "deletedAt" timestamp

    );
    ALTER TABLE wex."vote" ADD CONSTRAINT "vote_check" CHECK ("vote" = 1 OR "vote" = -1);
  COMMIT;