INSERT IGNORE INTO `twn`.`users`
    (`usersid`, `creationdate`, `dateofbirth`, `email`, `firstname`, `enabled`, `lastaccessdate`, `location`, `middlename`, `password`, `phone`, `preferredlanguage`, `status`, `surname`, `title`, `updatedat`, `username`)
VALUES
    (1, null, null, null, null, 1, null, null, null, '$2a$10$iAcukVL4Ok6ucGfv.blS7uo5lwWX9QTSCXIa3pS/cUTlGhRXvAZI6', null, null, null, null, null, null, 'admin'),
    (2, null, null, null, null, 1, null, null, null, '$2a$12$ERLyPs9iYR1RbG7EFU3L.Ob4HP1nuNNNIMTMZBmUCZSm9vMQl8ira', null, null, null, null, null, null, 'caseworker'),
    (3, null, null, null, null, 1, null, null, null, '$2a$12$ddJro0Z4lGp60A2dMERVnO6/1d909y2LdzloBk243g/CAJ0W5Yqfq', null, null, null, null, null, null, 'supervisor');

INSERT IGNORE INTO `twn`.`roles`
    (`rolesid`, `name`, `status`)
VALUES
    (1, 'admin', null),
    (2, 'caseworker', null),
    (3, 'supervisor', null);

INSERT IGNORE INTO `twn`.`usersroles`
    (`usersid`, `rolesid`)
VALUES
    (1, 1),
    (2, 2),
    (3, 3);
