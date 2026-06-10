CREATE TABLE `auctions` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`uid` text NOT NULL,
	`title` text NOT NULL,
	`img_url` text NOT NULL,
	`price` integer NOT NULL,
	`description` text,
	`is_promoted` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `auctions_uid_unique` ON `auctions` (`uid`);