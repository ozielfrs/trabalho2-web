-- EXAMPLE INSERT INTO USER
insert into
        "user" (created, name, password, description)
values
        (
                '2022-12-06 17:59:23',
                'cadanet0',
                'EmbaAHHzXXy',
                'lacus at velit vivamus vel nulla eget eros elementum pellentesque quisque porta volutpat erat quisque'
        );

-- EXAMPLE INSERT INTO POST
insert into
        post (user_id, created, title, content)
values
        (
                44,
                '2022-12-05 01:00:51',
                'convallis',
                'feugiat non pretium quis lectus suspendisse potenti in eleifend quam a odio in hac habitasse platea dictumst'
        );

-- EXAMPLE INSERT INTO COMMENT
insert into
        comment (post_id, user_id, created, content)
values
        (
                7,
                8,
                '2022-12-05 11:59:16',
                'quisque arcu libero rutrum ac lobortis'
        );