package service

import (
	"api-project/models"
	"api-project/repository"
)

type UserService struct {
	Repo *repository.UserRepository
}

func NewUserService(repo *repository.UserRepository) *UserService {
	return &UserService{Repo: repo}
}

// GetList 全ユーザー取得
func (s *UserService) GetList() ([]models.User, error) {
	return s.Repo.GetList()
}

// Create ユーザー作成
func (s *UserService) Create(user *models.User) error {
	return s.Repo.Create(user)
}

// Update ユーザー更新
func (s *UserService) Update(id uint, name string, email string) error {
	user, err := s.Repo.FindByID(id)
	if err != nil {
		return err
	}
	user.Name = name
	user.Email = email
	return s.Repo.Update(user)
}

// Delete ユーザー削除
func (s *UserService) Delete(id uint) error {
	return s.Repo.Delete(id)
}
