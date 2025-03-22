package models

import "gorm.io/gorm"

type Memo struct {
	gorm.Model
	UserID uint   `gorm:"not null"` // 外部キー
	User   User   `gorm:"constraint:OnDelete:CASCADE"`
	Memo   string `gorm:"type:varchar(255);not null"`
}
