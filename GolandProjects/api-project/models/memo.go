package models

import "gorm.io/gorm"

type Memo struct {
	gorm.Model
	UserID uint   `gorm:"not null" json:"UserID"`
	User   User   `gorm:"constraint:OnDelete:CASCADE"`
	Memo   string `gorm:"type:varchar(255);not null" json:"Memo"`
}
