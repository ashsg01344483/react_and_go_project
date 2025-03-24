package repository

import (
	"api-project/models"
	"gorm.io/gorm"
)

type MemoRepository struct {
	DB *gorm.DB
}

func NewMemoRepository(db *gorm.DB) *MemoRepository {
	return &MemoRepository{DB: db}
}

// FindAll 全メモを取得
func (r *MemoRepository) FindAll() ([]models.Memo, error) {
	var memos []models.Memo
	// userとのリレーション
	err := r.DB.Preload("User").Find(&memos).Error
	return memos, err
}

// Create メモを作成
func (r *MemoRepository) Create(memo *models.Memo) error {
	return r.DB.Create(memo).Error
}

// Update メモを更新
func (r *MemoRepository) Update(id uint, memo *models.Memo) error {
	// IDで既存のメモを検索
	var existing models.Memo
	if err := r.DB.First(&existing, id).Error; err != nil {
		return err
	}
	existing.Memo = memo.Memo
	return r.DB.Save(&existing).Error
}

// Delete メモを削除
func (r *MemoRepository) Delete(id uint) error {
	return r.DB.Delete(&models.Memo{}, id).Error
}
