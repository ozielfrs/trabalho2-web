-- SELECTS USED FOR EXAMPLES
-- GET ALL USERS IN THE DATABASE
SELECT
  u.id,
  u.name,
  u.description
FROM
  "user" u;

-- GET ALL POSTS IN THE DATABASE
SELECT
  p.id,
  p.title,
  p.content
FROM
  post p;

-- GET ALL COMMENTS IN THE DATABASE
SELECT
  c.id,
  c.content
FROM
  comment c;

-- GET ALL POSTS FROM ALL USERS IN THE DATABASE
SELECT
  p.id "postID",
  p.title,
  p.content "post",
  u.id "userID",
  u.name,
  u.description
FROM
  "user" u
  INNER JOIN post p ON u.id = p.user_id;

-- GET ALL POSTS FROM A SINGLE USER IN THE DATABASE
SELECT
  p.id "postID",
  p.title,
  p.content "post",
  u.id "userID",
  u.name,
  u.description
FROM
  "user" u
  INNER JOIN post p ON u.id = p.user_id
WHERE
  u.id = 10;

-- GET ALL COMMENTS FROM ALL USERS IN THE DATABASE
SELECT
  c.id "commentID",
  c.content "comment",
  u.id "userID",
  u.name,
  u.description
FROM
  comment c
  INNER JOIN "user" u ON c.user_id = u.id;

-- GET ALL COMMENTS FROM A SINGLE USER IN THE DATABASE
SELECT
  c.id "commentID",
  c.content "comment",
  u.id "userID",
  u.name,
  u.description
FROM
  comment c
  INNER JOIN "user" u ON c.user_id = u.id
WHERE
  u.id = 10;

-- GET ALL COMMENTS FROM ALL POSTS IN THE DATABASE
SELECT
  c.id "commentID",
  c.content "comment",
  p.id "postID",
  p.title,
  p.content "post"
FROM
  comment c
  INNER JOIN post p ON c.post_id = p.id;

-- GET ALL COMMENTS FROM A SINGLE POST IN THE DATABASE 
SELECT
  c.id "commentID",
  c.content "comment",
  p.id "postID",
  p.title,
  p.content "post"
FROM
  comment c
  INNER JOIN post p ON c.post_id = p.id
WHERE
  p.id = 10;

-- GET ALL COMMENTS FROM ALL POSTS FROM ALL USERS IN THE DATABASE
SELECT
  c.id "commentID",
  c.content "comment",
  p.id "postID",
  p.title,
  p.content "post",
  u.id "userID",
  u.name,
  u.description
FROM
  comment c
  INNER JOIN post p ON c.post_id = p.id
  INNER JOIN "user" u ON c.user_id = u.id;

-- GET ALL COMMENTS FROM A SINGLE POST FROM ALL USERS IN THE DATABASE
SELECT
  c.id "commentID",
  c.content "comment",
  p.id "postID",
  p.title,
  p.content "post",
  u.id "userID",
  u.name,
  u.description
FROM
  comment c
  INNER JOIN post p ON c.post_id = p.id
  INNER JOIN "user" u ON c.user_id = u.id
WHERE
  p.id = 10;

-- GET ALL POSTS FROM ALL USERS IN THE DATABASE ORDERED BY POST TIMESTAMP DECREASING
SELECT
  p.id "postID",
  p.created,
  p.title,
  p.content "post",
  u.id "userID",
  u.name,
  u.description
FROM
  "user" u
  INNER JOIN post p ON u.id = p.user_id
ORDER BY
  p.created DESC;

-- GET ALL POSTS FROM A SINGLE USER IN THE DATABASE ORDERED BY POST TIMESTAMP DECREASING
SELECT
  p.id "postID",
  p.created,
  p.title,
  p.content "post",
  u.id "userID",
  u.name,
  u.description
FROM
  "user" u
  INNER JOIN post p ON u.id = p.user_id
WHERE
  u.id = 10
ORDER BY
  p.created DESC;

-- GET ALL COMMENTS FROM A SINGLE USER IN THE DATABASE ORDERED BY COMMENT TIMESTAMP DECREASING
SELECT
  c.post_id,
  c.id "commentID",
  c.created,
  c.content "comment",
  u.id "userID",
  u.name,
  u.description
FROM
  comment c
  INNER JOIN "user" u ON c.user_id = u.id
ORDER BY
  c.created DESC;

-- GET ALL COMMENTS FROM A SINGLE USER IN THE DATABASE ORDERED BY COMMENT TIMESTAMP DECREASING
SELECT
  c.post_id,
  c.id "commentID",
  c.created,
  c.content "comment",
  u.id "userID",
  u.name,
  u.description
FROM
  comment c
  INNER JOIN "user" u ON c.user_id = u.id
WHERE
  u.id = 10
ORDER BY
  c.created DESC;