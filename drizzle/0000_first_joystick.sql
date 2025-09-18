CREATE TABLE "post_user_likes" (
	"user_id" varchar(24),
	"post_id" varchar(24),
	"active" boolean DEFAULT true NOT NULL,
	CONSTRAINT "post_user_likes_post_id_user_id_pk" PRIMARY KEY("post_id","user_id")
);
--> statement-breakpoint
CREATE TABLE "posts" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"content" varchar NOT NULL,
	"user_id" varchar(24),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "posts_content_unique" UNIQUE("content")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" varchar(24) PRIMARY KEY NOT NULL,
	"username" varchar(255) NOT NULL,
	"passwordHash" varchar NOT NULL,
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
ALTER TABLE "post_user_likes" ADD CONSTRAINT "post_user_likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "post_user_likes" ADD CONSTRAINT "post_user_likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "posts" ADD CONSTRAINT "posts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;