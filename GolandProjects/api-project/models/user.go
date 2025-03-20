package models

import "gorm.io/gorm"

type User struct {
	gorm.Model        // これが ID, CreatedAt, UpdatedAt, DeletedAt を自動で追加
	Name       string `gorm:"type:varchar(100);not null" json:"Name"`
	Email      string `gorm:"type:varchar(100);uniqueIndex;not null" json:"Email"`
}
