CREATE DATABASE aware;
\c aware;

CREATE TABLE user_accounts (
    username VARCHAR(32) PRIMARY KEY,
    user_password VARCHAR(128),
    date_created VARCHAR(32)
);

CREATE TABLE courses (
    course_id VARCHAR(36) PRIMARY KEY,
    course_name VARCHAR(32),
    course_icon VARCHAR(128)
);

CREATE TABLE user_courses (
    course_id VARCHAR(36),
    username VARCHAR(36),
    FOREIGN KEY (course_id) REFERENCES courses(course_id),
    FOREIGN KEY (username) REFERENCES user_accounts(username),
    PRIMARY KEY (course_id, username)
);

CREATE TABLE user_direct_messages (
    direct_message_id VARCHAR(36) PRIMARY KEY,
    user_initiator VARCHAR(36),
    user_target VARCHAR(36),
    FOREIGN KEY (user_initiator) REFERENCES user_accounts(username),
    FOREIGN KEY (user_target) REFERENCES user_accounts(username)
);

CREATE TABLE course_messages (
    message_id VARCHAR(36) PRIMARY KEY,
    message_content VARCHAR(1024),
    time_stamp VARCHAR(32),
    course_id VARCHAR(36),
    username VARCHAR(36),
    FOREIGN KEY (course_id, username) REFERENCES user_courses(course_id, username)
);

CREATE TABLE direct_messages (
    message_id VARCHAR(36) PRIMARY KEY,
    message_content VARCHAR(1024),
    time_stamp VARCHAR(32),
    direct_message_id VARCHAR(36),
    username VARCHAR(36),
    FOREIGN KEY (direct_message_id) REFERENCES user_direct_messages(direct_message_id)
);

INSERT INTO user_accounts (username, user_password) VALUES ('josh', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('ahmed', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('louis', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('bill', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('mia', 'password');
INSERT INTO user_accounts (username, user_password) VALUES ('megan', 'password');

INSERT INTO courses (course_id, course_name, course_icon) VALUES ('sysc2100', 'SYSC 2100', '/messenger-icons/sysc.png');
INSERT INTO courses (course_id, course_name, course_icon) VALUES ('sysc2004', 'SYSC 2004', '/messenger-icons/sysc.png');
INSERT INTO courses (course_id, course_name, course_icon) VALUES ('sysc3110', 'SYSC 3110', '/messenger-icons/sysc.png');
INSERT INTO courses (course_id, course_name, course_icon) VALUES ('math2004', 'MATH 2004', '/messenger-icons/math.png');
INSERT INTO courses (course_id, course_name, course_icon) VALUES ('elec2501', 'ELEC 2501', '/messenger-icons/elec.png');

INSERT INTO user_courses (course_id, username) VALUES ('sysc2100', 'ahmed');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2100', 'josh');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2100', 'louis');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2100', 'bill');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2100', 'mia');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2100', 'megan');

INSERT INTO user_courses (course_id, username) VALUES ('sysc2004', 'ahmed');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2004', 'josh');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2004', 'bill');
INSERT INTO user_courses (course_id, username) VALUES ('sysc2004', 'mia');

INSERT INTO user_courses (course_id, username) VALUES ('sysc3110', 'ahmed');
INSERT INTO user_courses (course_id, username) VALUES ('sysc3110', 'josh');
INSERT INTO user_courses (course_id, username) VALUES ('sysc3110', 'louis');
INSERT INTO user_courses (course_id, username) VALUES ('sysc3110', 'megan');

INSERT INTO user_courses (course_id, username) VALUES ('math2004', 'ahmed');
INSERT INTO user_courses (course_id, username) VALUES ('math2004', 'josh');
INSERT INTO user_courses (course_id, username) VALUES ('math2004', 'mia');
INSERT INTO user_courses (course_id, username) VALUES ('math2004', 'megan');

INSERT INTO user_courses (course_id, username) VALUES ('elec2501', 'ahmed');
INSERT INTO user_courses (course_id, username) VALUES ('elec2501', 'josh');
INSERT INTO user_courses (course_id, username) VALUES ('elec2501', 'bill');