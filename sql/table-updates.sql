-- EXAMPLE UPDATE USER NAME
UPDATE
  "user"
SET
  name = 'example'
WHERE
  id = 1;

-- EXAMPLE UPDATE USER PASSWORD
UPDATE
  "user"
SET
  password = 'example'
WHERE
  id = 1;

-- EXAMPLE UPDATE USER DESCRIPTION
UPDATE
  "user"
SET
  description = 'example'
WHERE
  id = 1;

-- EXAMPLE UPDATE POST CONTENT BY ID
UPDATE
  post
SET
  content = 'example'
WHERE
  id = 1;

-- EXAMPLE UPDATE POST CONTENT BY USER_ID
UPDATE
  post
SET
  content = 'example'
WHERE
  user_id = 1;

-- EXAMPLE UPDATE COMMENT CONTENT BY ID
UPDATE
  comment
SET
  content = 'example'
WHERE
  id = 1;

-- EXAMPLE UPDATE COMMENT CONTENT BY USER ID
UPDATE
  comment
SET
  content = 'example'
WHERE
  user_id = 1;

-- EXAMPLE UPDATE COMMENT CONTENT BY POST ID
UPDATE
  comment
SET
  content = 'example'
WHERE
  post_id = 1;

-- EXAMPLE UPDATE COMMENT CONTENT BY POST ID AND USER ID
UPDATE
  comment
SET
  content = 'example'
WHERE
  post_id = 1
  AND user_id = 1;