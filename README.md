# 環境構築

1. package.json ファイルを作成
   `npm init -y`

2. node.js のフレームワークをインストールする
   `npm i express`

3. mysql と接続するパッケージをインストールする
   `npm install mysql2`

4. cors のパッケージをインストールする
   `npm i cors`

5. nodemon をインストールする
   `npm install -g nodemon`

- nodemon.json を作成して、index.js を監視するファイルを作成する

```
{
  "watch": ["index.js"],
  "ext": "js",
  "ignore": ["node_modules"],
  "exec": "node index.js"
}
```

6. MySQL にデータベースとテーブルを作成する

```
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
```

7. node.js を起動

```
nodemon
```
