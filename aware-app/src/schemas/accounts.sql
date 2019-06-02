CREATE DATABASE aware;
\c aware;

CREATE TABLE user_accounts (
    PRIMARY KEY username VARCHAR(32),
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
    username VARCHAR(36),
    FOREIGN KEY (username) REFERENCES user_accounts(username)
);

CREATE TABLE messages (
    message_id VARCHAR(36),
    group_id VARCHAR(36),
    FOREIGN KEY (message_id) REFERENCES message(message_id),
    FOREIGN KEY (group_id) REFERENCES user_groups(group_id)
);

INSERT INTO user_accounts (username, user_password) VALUES ('josh', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('ahmed', 'password');

INSERT INTO user_groups (group_id, name, username) VALUES ('sysc2100', 'SYSC 2100', 'ahmed')
INSERT INTO user_groups (group_id, name, username) VALUES ('sysc2004', 'SYSC 2004', 'ahmed')
INSERT INTO user_groups (group_id, name, username) VALUES ('sysc3110', 'SYSC 3110', 'ahmed')
INSERT INTO user_groups (group_id, name, username) VALUES ('elec2501', 'ELEC 2501', 'ahmed')
INSERT INTO user_groups (group_id, name, username) VALUES ('math2004', 'MATH 2004', 'ahmed')

INSERT INTO user_groups (group_id, name, username) VALUES ('sysc2100', 'SYSC 2100', 'josh')
INSERT INTO user_groups (group_id, name, username) VALUES ('sysc2004', 'SYSC 2004', 'josh')
INSERT INTO user_groups (group_id, name, username) VALUES ('sysc3110', 'SYSC 3110', 'josh')
INSERT INTO user_groups (group_id, name, username) VALUES ('elec2501', 'ELEC 2501', 'josh')
INSERT INTO user_groups (group_id, name, username) VALUES ('math2004', 'MATH 2004', 'josh')