//go:build wireinject
// +build wireinject

package main

import (
	"api-project/controllers"
	"api-project/database"
	"api-project/repository"
	"api-project/service"

	"github.com/googl	e/wire"
)

// InitializeApp は DI で UserController を生成する
func InitializeApp() (*controllers.UserController, error) {
	wire.Build(
		database.NewDatabase, // 修正: database.ConnectDB → database.NewDatabase
		repository.NewUserRepository,
		service.NewUserService,
		controllers.NewUserController,
	)
	return nil, nil
}
