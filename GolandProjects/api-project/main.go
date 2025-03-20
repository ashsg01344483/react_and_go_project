package main

import (
	"api-project/controllers"
	"api-project/database"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// データベース接続
	database.ConnectDB()

	// Gin のルーティング設定
	r := gin.Default()

	// CORS 設定を追加
	// CORS 設定を追加
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"}, // React の URL を許可
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	r.GET("/users", controllers.GetList)
	r.POST("/users", controllers.Create)
	r.PUT("/users/:id", controllers.Update)
	r.DELETE("/users/:id", controllers.Delete)

	// サーバー起動
	r.Run(":8080")
}
