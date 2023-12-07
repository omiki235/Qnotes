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

-- usersテーブルにデータを挿入
INSERT INTO users (username, password) VALUES ('testuser1', 'password1');

-- usersテーブルのデータを表示
SELECT * FROM users;

-- テーブルの各カラムの情報を表示します。
DESC users;

-- EXIT または \qでMySQLを終了