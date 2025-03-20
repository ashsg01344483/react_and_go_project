package repository

import (
	"api-project/database"
	"api-project/models"
	"errors"
	"fmt"
	"gorm.io/gorm"
	"log"
)

// GetList ユーザーを取得
func GetList() ([]models.User, error) {
	var users []models.User

	// 🔍 `database.DB` の状態を確認
	if database.DB == nil {
		fmt.Println("❌ GetList: database.DB が nil です")
		return nil, errors.New("データベース接続がありません")
	}

	fmt.Println("🔍 database.DB の状態:", database.DB)

	// `database.DB` を使ってデータを取得
	result := database.DB.Find(&users)

	// 🔍 エラーチェック
	if result.Error != nil {
		fmt.Println("❌ GetList データベースエラー:", result.Error)
		return nil, result.Error
	}

	fmt.Println("✅ GetList データ取得成功:", users)
	return users, nil
}

// Create ユーザーを作成
func Create(user *models.User) error {
	if database.DB == nil {
		fmt.Println("❌ Create: database.DB が nil です")
		return errors.New("データベース接続がありません")
	}

	fmt.Println("✅ 登録するデータ:", user)

	result := database.DB.Create(user)

	if result.Error != nil {
		log.Println("❌ Database Insert Error:", result.Error) // ← ここでエラーログを出力
		return result.Error
	}

	fmt.Println("✅ ユーザーが正常に作成されました")
	return nil
}

// FindById IDを元にユーザーを取得
func FindById(id int) (*models.User, error) {
	var user models.User
	if err := database.DB.First(&user, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("ユーザーが見つかりません")
		}
		return nil, err
	}
	return &user, nil
}

// Update ユーザーを編集
func Update(user *models.User) error {
	if err := database.DB.Save(user).Error; err != nil {
		return errors.New("ユーザーの更新に失敗しました")
	}
	return nil
}

// Delete ユーザーを削除
func Delete(id int) error {
	if err := database.DB.Delete(&models.User{}, id).Error; err != nil {
		return errors.New("ユーザーの削除に失敗しました")
	}
	return nil
}
