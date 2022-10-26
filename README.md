DELETE FROM users WHERE uid; // del users table all users with uid
mysql column too long ：alter table users modify column username varchar(30);

CREATE TABLE IF NOT EXISTS `users`(
`u_id` INT UNSIGNED AUTO_INCREMENT,
`id` VARCHAR(100) NOT NULL,
`username` VARCHAR(40) NOT NULL,
`password` DATE,
PRIMARY KEY ( `u_id` )
)ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO users SET

UPDATE project_users SET pin = true where id=1
