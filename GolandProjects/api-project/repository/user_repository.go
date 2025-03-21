package repository

import (
	"api-project/models"
	"gorm.io/gorm"
)

type UserRepository struct {
	DB *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{DB: db}
}

// GetList 全ユーザー取得
func (r *UserRepository) GetList() ([]models.User, error) {
	var users []models.User
	result := r.DB.Find(&users)
	return users, result.Error
}

// Create ユーザー作成
func (r *UserRepository) Create(user *models.User) error {
	return r.DB.Create(user).Error
}

// FindByID ユーザー取得
func (r *UserRepository) FindByID(id uint) (*models.User, error) {
	var user models.User
	result := r.DB.First(&user, id)
	if result.Error != nil {
		return nil, result.Error
	}
	return &user, nil
}

// Update ユーザー更新
func (r *UserRepository) Update(user *models.User) error {
	return r.DB.Save(user).Error
}

// Delete ユーザー削除
func (r *UserRepository) Delete(id uint) error {
	return r.DB.Delete(&models.User{}, id).Error
}
