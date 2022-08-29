-- Create table posts
CREATE TABLE posts (
	id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    author VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
-- Insert posts
INSERT INTO `posts` (`id`, `author`, `body`, `createdAt`) VALUES 
(NULL, 'James Bond', 'Post of James bond about 007', current_timestamp()), 
(NULL, 'Jill Crown', 'post of Jill about Hill', current_timestamp()), 
(NULL, 'Serbentautas Bordiuras', 'All about serbentai', current_timestamp());

--  postu exportas
INSERT INTO `posts` (`author`, `body`, `category`, `createdAt`, `id`) VALUES ('James Bond', 'Post of James bond about 007', 'movies', '2022-08-29 08:29:42', 1);
INSERT INTO `posts` (`author`, `body`, `category`, `createdAt`, `id`) VALUES ('Jill Crown', 'post of Jill about Hill', 'books', '2022-08-29 08:29:49', 2);
INSERT INTO `posts` (`author`, `body`, `category`, `createdAt`, `id`) VALUES ('Serbentautas Bordiuras', 'All about serbentai', 'comedy', '2022-08-29 08:29:56', 3);
INSERT INTO `posts` (`author`, `body`, `category`, `createdAt`, `id`) VALUES ('James Bond ', '008 is the next movie', 'movies', '2022-08-29 08:32:11', 4);
INSERT INTO `posts` (`author`, `body`, `category`, `createdAt`, `id`) VALUES ('Serbentautas Bordiuras', 'Arbuzu kainu suolis i vasaros pabaiga. ', 'comedy', '2022-08-29 08:32:30', 5);

insert into `users` (`name`, `age`, `hasCar`, `town`, `createdAt`) values ('James Bond', '30', 'true', 'Kaunas', '2022-08-29 08:29:42');