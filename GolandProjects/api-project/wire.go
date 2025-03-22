//go:build wireinject
// +build wireinject

package main

import (
	"api-project/controllers"
	"api-project/database"
	"api-project/di"
	"api-project/repository"
	"api-project/service"

	"github.com/google/wire"
)

// InitializeApp は DI で AppControllers を生成する
func InitializeApp() (*di.AppControllers, error) {
	wire.Build(
		database.NewDatabase,

		// User関連
		repository.NewUserRepository,
		service.NewUserService,
		controllers.NewUserController,

		// Memo関連
		repository.NewMemoRepository,
		service.NewMemoService,
		controllers.NewMemoController,

		// まとめて返す
		wire.Struct(new(di.AppControllers), "*"),
	)
	return nil, nil
}
