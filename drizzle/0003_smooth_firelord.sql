CREATE TABLE "auth" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"passwordHash" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "passwordHash";