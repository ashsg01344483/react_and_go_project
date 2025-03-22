package router

import (
	"api-project/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes ルーティング設定
func SetupRoutes(
	r *gin.Engine,
	userController *controllers.UserController,
	memoController *controllers.MemoController,
) {
	user := r.Group("/users")
	{
		user.GET("", userController.GetList)
		user.POST("", userController.Create)
		user.PUT("/:id", userController.Update)
		user.DELETE("/:id", userController.Delete)
	}

	memo := r.Group("/memos")
	{
		memo.GET("", memoController.GetList)
		memo.POST("", memoController.Create)
		memo.PUT("/:id", memoController.Update)
		memo.DELETE("/:id", memoController.Delete)
	}
}
