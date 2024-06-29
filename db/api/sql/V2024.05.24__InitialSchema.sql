BEGIN;    
    CREATE TABLE wex."user" (
                                    "id" uuid PRIMARY KEY NOT NULL UNIQUE,
                                    "username" varchar(255) NOT NULL UNIQUE,
                                    "passwordHash" varchar(255) NOT NULL
    );
COMMIT;