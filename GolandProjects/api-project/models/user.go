package models

import "gorm.io/gorm"

type User struct {
	gorm.Model
	Name  string `gorm:"size:100;not null" json:"Name"`
	Email string `gorm:"size:100;unique;not null" json:"Email"`

	// 🔽 リレーション修正: UserID を使うよう明示
	Memos []Memo `gorm:"foreignKey:UserID"`
}
