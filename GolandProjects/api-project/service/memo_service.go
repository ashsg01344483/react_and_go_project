package service

import (
	"api-project/repository"
)

type MemoService struct {
	Repo *repository.MemoRepository
}

func NewMemoService(repo *repository.MemoRepository) *MemoService {
	return &MemoService{Repo: repo}
}
