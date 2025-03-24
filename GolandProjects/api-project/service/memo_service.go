package service

import (
	"api-project/models"
	"api-project/repository"
)

type MemoService struct {
	Repo *repository.MemoRepository
}

func NewMemoService(repo *repository.MemoRepository) *MemoService {
	return &MemoService{Repo: repo}
}

// GetList 全メモを取得
func (s *MemoService) GetList() ([]models.Memo, error) {
	return s.Repo.FindAll()
}

// Create メモを新規作成
func (s *MemoService) Create(memo *models.Memo) error {
	return s.Repo.Create(memo)
}

// Update メモを更新
func (s *MemoService) Update(id uint, memo *models.Memo) error {
	return s.Repo.Update(id, memo)
}

// Delete メモを削除
func (s *MemoService) Delete(id uint) error {
	return s.Repo.Delete(id)
}

func (s *UserService) GetByEmail(email string) (*models.User, error) {
	return s.Repo.FindByEmail(email)
}
