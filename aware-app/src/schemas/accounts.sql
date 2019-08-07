CREATE DATABASE aware;
\c aware;

CREATE TABLE user_accounts (
    username VARCHAR(32) PRIMARY KEY,
    user_password VARCHAR(128),
    date_created VARCHAR(32)
);

CREATE TABLE messenger_group (
    group_id VARCHAR(36) PRIMARY KEY,
    group_name VARCHAR(32),
    group_icon VARCHAR(128)
);

CREATE TABLE user_chats (
    group_id VARCHAR(36),
    username VARCHAR(36),
    FOREIGN KEY (group_id) REFERENCES messenger_group(group_id),
    FOREIGN KEY (username) REFERENCES user_accounts(username),
    PRIMARY KEY (group_id, username)
);

CREATE TABLE messages (
    message_id VARCHAR(36) PRIMARY KEY,
    message_content VARCHAR(1024),
    time_stamp VARCHAR(32),
    group_id VARCHAR(36),
    username VARCHAR(36),
    FOREIGN KEY (group_id, username) REFERENCES user_chats(group_id, username)
);

INSERT INTO user_accounts (username, user_password) VALUES ('josh', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('ahmed', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('louis', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('bill', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('mia', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('megan', 'password');

INSERT INTO messenger_group (group_id, group_name, group_icon) VALUES ('sysc2100', 'SYSC 2100', 'sysc.png');
INSERT INTO messenger_group (group_id, group_name, group_icon) VALUES ('sysc2004', 'SYSC 2004', 'sysc.png');
INSERT INTO messenger_group (group_id, group_name, group_icon) VALUES ('sysc3110', 'SYSC 3110', 'sysc.png');
INSERT INTO messenger_group (group_id, group_name, group_icon) VALUES ('math2004', 'MATH 2004', 'math.png');
INSERT INTO messenger_group (group_id, group_name, group_icon) VALUES ('elec2501', 'ELEC 2501', 'elec.png');

INSERT INTO user_chats (group_id, username) VALUES ('sysc2100', 'ahmed');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2100', 'josh');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2100', 'louis');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2100', 'bill');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2100', 'mia');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2100', 'megan');

INSERT INTO user_chats (group_id, username) VALUES ('sysc2004', 'ahmed');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2004', 'josh');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2004', 'bill');
INSERT INTO user_chats (group_id, username) VALUES ('sysc2004', 'mia');

INSERT INTO user_chats (group_id, username) VALUES ('sysc3110', 'ahmed');
INSERT INTO user_chats (group_id, username) VALUES ('sysc3110', 'josh');
INSERT INTO user_chats (group_id, username) VALUES ('sysc3110', 'louis');
INSERT INTO user_chats (group_id, username) VALUES ('sysc3110', 'megan');

INSERT INTO user_chats (group_id, username) VALUES ('math2004', 'ahmed');
INSERT INTO user_chats (group_id, username) VALUES ('math2004', 'josh');
INSERT INTO user_chats (group_id, username) VALUES ('math2004', 'mia');
INSERT INTO user_chats (group_id, username) VALUES ('math2004', 'megan');

INSERT INTO user_chats (group_id, username) VALUES ('elec2501', 'ahmed');
INSERT INTO user_chats (group_id, username) VALUES ('elec2501', 'josh');
INSERT INTO user_chats (group_id, username) VALUES ('elec2501', 'bill');
