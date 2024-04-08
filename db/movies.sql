drop database if exists moviesdb;
CREATE DATABASE moviesdb;
USE moviesdb;

CREATE TABLE movie(
id BINARY(16) primary key default(UUID_TO_BIN(UUID())),
title varchar(200) not null,
year int not  null,
director varchar(200) not null,
duration int  not null,
poster text,
rate decimal(2,1) not null
);

create table genre (
id int auto_increment primary key,
name varchar (200) not null unique
);

create table movie_genre(
movie_id binary(16) references movie(id),
genre_id int references genre(id),
primary key (movie_id,genre_id)
);

insert into genre (name) values 
('Drama'),
('Comedia'),
('Terror'),
('Romance'),
('Acción'),
('Ciencia ficción'),
('Misterio'),
('Fantasía'),
('Aventura'),
('Suspense'),
('Sci-Fi');

INSERT INTO movie (title, year, director, duration, poster, rate) 
VALUES 
    ('The Shawshank Redemption', 1994, 'Frank Darabont', 142, 'shawshank_redemption_poster.jpg', 9.3),
    ('The Godfather', 1972, 'Francis Ford Coppola', 175, 'godfather_poster.jpg', 9.2),
    ('The Dark Knight', 2008, 'Christopher Nolan', 152, 'dark_knight_poster.jpg', 9.0),
    ('Schindler''s List', 1993, 'Steven Spielberg', 195, 'schindlers_list_poster.jpg', 8.9),
    ('Pulp Fiction', 1994, 'Quentin Tarantino', 154, 'pulp_fiction_poster.jpg', 8.9);



SELECT title, year, director, duration, poster, rate
FROM movie 
INNER JOIN movie_genre  ON movie.id = movie_genre.movie_id
INNER JOIN genre ON movie_genre.genre_id = 1;
