-- User creation examle, replace name and password with your own
-- real credentials are stored in a "secure" location (.env file)
CREATE USER 'user'@'localhost' IDENTIFIED BY 'pw';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;


CREATE USER 'sipi2'@'localhost' IDENTIFIED BY 'salis';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'sipi2'@'localhost';
FLUSH PRIVILEGES;