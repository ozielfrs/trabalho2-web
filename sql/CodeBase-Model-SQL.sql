-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-12-02 14:15:43.902
-- tables
-- Table: comment
CREATE TABLE comment (
  id serial NOT NULL,
  post_id int NOT NULL,
  user_id int NOT NULL,
  created timestamp NOT NULL,
  content varchar(256) NOT NULL,
  number_likes smallint NOT NULL DEFAULT 0,
  deleted boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT comment_pk PRIMARY KEY (id, post_id, user_id)
);

CREATE INDEX comment_idx_user on comment (user_id ASC);

CREATE INDEX comment_idx_post on comment (post_id ASC);

-- Table: post
CREATE TABLE post (
  id serial NOT NULL,
  user_id int NOT NULL,
  created timestamp NOT NULL,
  title varchar(32) NOT NULL,
  content text NOT NULL,
  number_likes smallint NOT NULL DEFAULT 0,
  number_comments smallint NOT NULL DEFAULT 0,
  deleted boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT post_pk PRIMARY KEY (id)
);

CREATE INDEX post_idx_user on post (user_id ASC);

-- Table: user
CREATE TABLE "user" (
  id serial NOT NULL,
  created timestamp NOT NULL,
  name varchar(16) NOT NULL,
  password varchar(256) NOT NULL,
  description text NULL,
  deleted boolean NOT NULL DEFAULT FALSE,
  CONSTRAINT username UNIQUE (name) NOT DEFERRABLE INITIALLY IMMEDIATE,
  CONSTRAINT user_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: comment_post (table: comment)
ALTER TABLE
  comment
ADD
  CONSTRAINT comment_post FOREIGN KEY (post_id) REFERENCES post (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: comment_user (table: comment)
ALTER TABLE
  comment
ADD
  CONSTRAINT comment_user FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- Reference: post_user (table: post)
ALTER TABLE
  post
ADD
  CONSTRAINT post_user FOREIGN KEY (user_id) REFERENCES "user" (id) NOT DEFERRABLE INITIALLY IMMEDIATE;

-- End of file.