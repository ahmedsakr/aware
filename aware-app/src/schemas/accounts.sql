CREATE DATABASE aware;
\c aware;

CREATE TABLE user_accounts (
    user_id VARCHAR(36) PRIMARY KEY,
    username VARCHAR(32),
    user_password VARCHAR(128),
    date_created DATE
);

CREATE TABLE message (
    message_id VARCHAR(36) PRIMARY KEY,
    message_content VARCHAR(1024),
    time_stamp TIMESTAMP
);

CREATE TABLE user_groups (
    group_id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(32),
    user_id VARCHAR(36),
    FOREIGN KEY (user_id) REFERENCES user_accounts(user_id)
);

CREATE TABLE messages (
    message_id VARCHAR(36),
    group_id VARCHAR(36),
    FOREIGN KEY (message_id) REFERENCES message(message_id),
    FOREIGN KEY (group_id) REFERENCES user_groups(group_id)
);

INSERT INTO user_accounts (user_id, username, user_password) VALUES ('aabbcc', 'josh', 'password');
INSERT INTO user_accounts (user_id, username, user_password) VALUES ('ccbbaa', 'ahmed', 'password');