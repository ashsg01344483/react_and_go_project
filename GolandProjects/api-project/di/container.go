package di

import "api-project/controllers"

type AppControllers struct {
	UserController *controllers.UserController
	MemoController *controllers.MemoController
}
