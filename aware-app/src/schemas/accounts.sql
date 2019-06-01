CREATE TABLE user_accounts (
    user_id int PRIMARY KEY,
    username VARCHAR(32),
    user_password VARCHAR(128),
    date_created DATE
);

CREATE TABLE message (
    message_id int PRIMARY KEY,
    message_content VARCHAR(1024),
    time_stamp DATETIME
);

CREATE TABLE groups (
    group_id int PRIMARY KEY,
    name VARCHAR(32),
    user_id int,
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
);

CREATE TABLE messages (
    message_id int,
    group_id int,
    FOREIGN KEY (message_id) REFERENCES message(message_id),
    FOREIGN KEY (group_id) REFERENCES groups(group_id)
);