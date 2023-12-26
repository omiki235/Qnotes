DROP DATABASE IF EXISTS nortion_data;

-- データベースの作成
CREATE DATABASE nortion_data;
-- データベースの切り替え
use nortion_data;

-- usersテーブルの作成
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE memos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    icon VARCHAR(255) DEFAULT '',
    title VARCHAR(255) DEFAULT '',
    description TEXT,
    position INT,
    emoji_data TEXT,
    image_data LONGBLOB,
    FOREIGN KEY (user_id) REFERENCES users(id)
);