package main

import (
	"api-project/router"
	"fmt"
	"log"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	// DI で UserController を取得
	appControllers, err := InitializeApp()
	if err != nil {
		log.Fatalf("DI の初期化に失敗: %v", err)
	}

	// Gin のルーティング設定
	r := gin.Default()

	// CORS 設定
	r.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:5173"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type"},
		AllowCredentials: true,
	}))

	// ルーティング設定
	router.SetupRoutes(r, appControllers.UserController, appControllers.MemoController)

	// サーバー起動
	fmt.Println("Server is running on port 8080...")
	r.Run(":8080")
}
