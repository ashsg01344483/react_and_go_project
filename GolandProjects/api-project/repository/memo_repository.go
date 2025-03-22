package repository

import (
	"gorm.io/gorm"
)

type MemoRepository struct {
	DB *gorm.DB
}

func NewMemoRepository(db *gorm.DB) *MemoRepository {
	return &MemoRepository{DB: db}
}
