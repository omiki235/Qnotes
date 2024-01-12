DROP DATABASE IF EXISTS Qnotes_data;

-- データベースの作成
CREATE DATABASE Qnotes_data;
-- データベースの切り替え
use Qnotes_data;

-- usersテーブルの作成
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE memos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) DEFAULT '',
    description TEXT,
    position INT,
    image_filename VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id)
);