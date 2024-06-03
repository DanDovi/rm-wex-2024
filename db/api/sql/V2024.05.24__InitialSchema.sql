BEGIN;    
    CREATE TABLE wex."user" (
                                    "id" uuid PRIMARY KEY,
                                    "email" varchar(255) NOT NULL,
                                    "passwordHash" varchar(255) NOT NULL
    );
COMMIT;