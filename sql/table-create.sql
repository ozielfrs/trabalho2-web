-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2022-12-19 16:29:19.715

-- tables
-- Table: comment
CREATE TABLE comment (
    id serial  NOT NULL,
    content text  NOT NULL,
    created timestamp  NOT NULL,
    edited timestamp  NULL,
    post_id int  NOT NULL,
    usuario_id int  NOT NULL,
    CONSTRAINT comment_pk PRIMARY KEY (id)
);

CREATE INDEX comment_idx_1 on comment (post_id ASC);

CREATE INDEX comment_idx_2 on comment (usuario_id ASC);

-- Table: post
CREATE TABLE post (
    id serial  NOT NULL,
    title varchar(64)  NOT NULL,
    content text  NOT NULL,
    created timestamp  NOT NULL,
    edited timestamp  NULL,
    usuario_id int  NOT NULL,
    noflikes int  NULL,
    CONSTRAINT post_pk PRIMARY KEY (id)
);

CREATE INDEX post_idx_1 on post (usuario_id ASC);

-- Table: usuario
CREATE TABLE usuario (
    id serial  NOT NULL,
    first_name varchar(32)  NOT NULL,
    last_name varchar(32)  NOT NULL,
    username varchar(16)  NOT NULL,
    email varchar(64)  NOT NULL,
    password varchar(32)  NOT NULL,
    CONSTRAINT usuario_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: comment_post (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_post
    FOREIGN KEY (post_id)
    REFERENCES post (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: comment_usuario (table: comment)
ALTER TABLE comment ADD CONSTRAINT comment_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: post_usuario (table: post)
ALTER TABLE post ADD CONSTRAINT post_usuario
    FOREIGN KEY (usuario_id)
    REFERENCES usuario (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

