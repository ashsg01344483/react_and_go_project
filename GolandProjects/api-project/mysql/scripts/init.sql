-- データベースの文字コード設定（必要であれば）
SET NAMES utf8mb4;
SET character_set_client = utf8mb4;
SET character_set_connection = utf8mb4;
SET character_set_results = utf8mb4;

-- users テーブル
CREATE TABLE IF NOT EXISTS users
(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100)    NOT NULL,
    email      VARCHAR(100)    NOT NULL UNIQUE,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;

-- memos テーブル（users に外部キーを持つ）
CREATE TABLE IF NOT EXISTS memos
(
    id         BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id    BIGINT UNSIGNED NOT NULL,
    memo       VARCHAR(255)    NOT NULL,
    created_at DATETIME,
    updated_at DATETIME,
    deleted_at DATETIME,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
) ENGINE = InnoDB
  DEFAULT CHARSET = utf8mb4;
