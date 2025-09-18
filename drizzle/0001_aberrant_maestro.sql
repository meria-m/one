ALTER TABLE "post_user_likes" RENAME TO "likes";--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "post_user_likes_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "post_user_likes_post_id_posts_id_fk";
--> statement-breakpoint
ALTER TABLE "likes" DROP CONSTRAINT "post_user_likes_post_id_user_id_pk";--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_user_id_pk" PRIMARY KEY("post_id","user_id");--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "likes" ADD CONSTRAINT "likes_post_id_posts_id_fk" FOREIGN KEY ("post_id") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;