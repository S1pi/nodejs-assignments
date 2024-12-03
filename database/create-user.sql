-- User creation examle, replace name and password with your own
-- real credentials are stored in a "secure" location (.env file)
CREATE USER 'user'@'localhost' IDENTIFIED BY 'pw';
GRANT ALL PRIVILEGES ON `MediaSharingApp`.* TO 'user'@'localhost';
FLUSH PRIVILEGES;