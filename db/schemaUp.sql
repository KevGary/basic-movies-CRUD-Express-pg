DROP TABLE IF EXISTS movies cascade;
DROP TABLE IF EXISTS actors cascade;
DROP TABLE IF EXISTS directors cascade;
DROP TABLE IF EXISTS joinTables;


CREATE TABLE movies (
  id serial primary key,
  title varchar(40),
  genre varchar(40),
  year varchar(40)
);

CREATE TABLE actors (
  id serial primary key,
  name varchar(40),
  birthdate date
);

CREATE TABLE directors (
  id serial primary key,
  name varchar(40),
  birthdate date
);

CREATE TABLE joinTables  (
  id serial primary key,
  movie_id int references movies(id) on delete cascade,
  actor_id int references actors(id) on delete cascade,
  director_id int references directors(id) on delete cascade
);

