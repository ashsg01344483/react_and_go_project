package router

import (
	"api-project/controllers"

	"github.com/gin-gonic/gin"
)

// SetupRoutes ルーティング設定
func SetupRoutes(r *gin.Engine, userController *controllers.UserController) {
	api := r.Group("/users")
	{
		api.GET("", userController.GetList)
		api.POST("", userController.Create)
		api.PUT("/:id", userController.Update)
		api.DELETE("/:id", userController.Delete)
	}
}
