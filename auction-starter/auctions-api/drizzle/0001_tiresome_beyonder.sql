CREATE TABLE `advices` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`title` text NOT NULL,
	`posted_article` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `advices_uid_unique` ON `advices` (`uid`);